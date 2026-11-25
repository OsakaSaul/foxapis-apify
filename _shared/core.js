// Shared run logic for every Actor in this repo (copied into each folder by generate.cjs; edit it here).
// Money rules, in order:
//   1. A user on the free platform plan gets the bundled sample and the data service is never called (their events pay nothing, the call would cost real money).
//   2. Nothing is called unless the run's spending limit covers the event.
//   3. An event is charged only when the service says it delivered something it billed.
//   4. The service key is read from the environment, sent only to the service, and never logged.
//   5. The service's own error text is not passed on to the user.

const SERVICE = 'https://api.foxapis.com';

export function clean(value) {
    if (typeof value === 'string') {
        return value
            .replace(/https?:\/\/[^\s"'<>)\]]*(foxapis|mentionfox)\.com[^\s"'<>)\]]*/gi, '')
            .replace(/\b(a|an) (FoxAPIs|MentionFox) account\b/gi, 'an API account')
            .replace(/\b(FoxAPIs|MentionFox)(\.com)?\b/gi, 'the data service');
    }
    if (Array.isArray(value)) return value.map(clean);
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, clean(v)]));
    return value;
}

export function buildRequest(config, input) {
    const fields = {};
    for (const name of config.fields) {
        const v = input?.[name];
        if (v !== undefined && v !== null && String(v).trim() !== '') fields[name] = typeof v === 'string' ? v.trim() : v;
    }
    for (const name of config.required || []) if (fields[name] === undefined) throw new UserError(`Please fill in "${name}".`);
    if (config.oneOf && !config.oneOf.some((n) => fields[n] !== undefined)) throw new UserError(`Please fill in at least one of: ${config.oneOf.join(', ')}.`);
    if (config.exactlyOne && config.exactlyOne.filter((n) => fields[n] !== undefined).length !== 1) throw new UserError(`Please fill in exactly one of: ${config.exactlyOne.join(', ')}.`);
    return fields;
}

export function eventName(config, fields) {
    return config.eventByMode ? config.eventByMode[fields.mode || config.defaultMode] : config.event;
}

export function delivered(config, result) {
    if (result === null || result === undefined) return false;
    if (Array.isArray(result)) return result.length > 0;
    for (const [key, bad] of Object.entries(config.notDelivered || {})) if (result[key] === bad) return false;
    return Object.keys(result).length > 0;
}

export class UserError extends Error {}

function failureText(status) {
    if (status === 422 || status === 400) return 'The input was not accepted. Check the fields and try again. You were not charged.';
    if (status === 404) return 'Nothing was found for this input. You were not charged.';
    if (status === 429) return 'Too many requests just now. Wait a minute and run it again. You were not charged.';
    return 'The data service is not available just now. You were not charged. Please try again later.';
}

export async function run(config, { actor, env, fetchFn, sample, sleep, now = Date.now }) {
    const input = (await actor.getInput()) || {};
    const fields = buildRequest(config, input);
    const event = eventName(config, fields);
    if (!event) throw new UserError('That mode is not offered.');

    if (env.APIFY_IS_AT_HOME && env.APIFY_USER_IS_PAYING !== '1' && env.ALLOW_FREE_RUNS !== '1') {
        await actor.pushData({ sample: true, note: 'SAMPLE OUTPUT, not a result for your input. Live results need a paid Apify plan.', result: sample });
        return { outcome: 'sample', message: 'Sample output only: live results need a paid Apify plan. Nothing was charged.' };
    }

    const key = env.FOXAPIS_API_KEY;
    if (!key) throw new Error('This Actor is not configured yet. You were not charged.');
    if ((await actor.chargeableCount(event)) < 1) return { outcome: 'limit', message: 'The spending limit set for this run is lower than the price of one result. Raise it and run again. Nothing was charged.' };

    // the base address can be changed only off the platform, for local tests
    const base = !env.APIFY_IS_AT_HOME && env.SERVICE_BASE ? env.SERVICE_BASE : SERVICE;
    const headers = { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', 'User-Agent': 'apify-actor' };
    const url = new URL(base + config.path);
    const options = { method: config.method, headers };
    if (config.method === 'GET') for (const [k, v] of Object.entries(fields)) url.searchParams.set(k, String(v));
    else options.body = JSON.stringify(fields);

    const response = await fetchFn(url.toString(), options);
    let body = await response.json().catch(() => null);
    if (response.status >= 400 || body === null) throw new Error(failureText(response.status));
    let charged = response.headers.get('x-credits-charged');

    if (response.status === 202) {
        const jobId = body.job_id || body.id;
        if (!jobId) throw new Error(failureText(502));
        const deadline = now() + (config.jobMinutes || 25) * 60000;
        for (;;) {
            if (now() > deadline) throw new Error('The result took too long. You were not charged. Please try again later.');
            await sleep(10000);
            const poll = await fetchFn(`${base}/v1/jobs/${encodeURIComponent(jobId)}`, { method: 'GET', headers });
            const job = await poll.json().catch(() => null);
            if (poll.status >= 500 || job === null) continue;
            if (poll.status >= 400) throw new Error(failureText(poll.status));
            if (job.status === 'error' || job.status === 'failed') throw new Error('The result could not be produced. You were not charged.');
            if (job.status === 'done') { body = job.result; charged = job.credits_used === undefined ? null : String(job.credits_used); break; }
        }
    }

    const billable = delivered(config, body) && charged !== '0';
    await actor.pushData(clean(Array.isArray(body) ? body : [body]));
    if (!billable) return { outcome: 'free', message: 'No billable result for this input. Nothing was charged.' };
    await actor.charge(event);
    return { outcome: 'charged', event, message: 'Done.' };
}
