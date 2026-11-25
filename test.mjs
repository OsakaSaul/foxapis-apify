// node test.mjs : offline checks of the money rules, with a stand-in platform and a stand-in service.
import { readFileSync } from 'node:fs';
import { run, clean, delivered } from './_shared/core.js';

const { actors } = JSON.parse(readFileSync(new URL('./actors.json', import.meta.url), 'utf8'));
const byName = Object.fromEntries(actors.map((a) => [a.name, a]));
let failed = 0, passed = 0;
const ok = (name, cond) => { if (cond) passed++; else { failed++; console.log('FAIL', name); } };

function world(input, { replies = [], env = {}, room = 5 } = {}) {
    const calls = [], pushed = [], charges = [];
    const deps = {
        actor: { getInput: async () => input, pushData: async (d) => pushed.push(d), chargeableCount: async () => room, charge: async (e) => charges.push(e) },
        env: { APIFY_IS_AT_HOME: '1', APIFY_USER_IS_PAYING: '1', FOXAPIS_API_KEY: 'test-key-not-real', ...env },
        fetchFn: async (url, options) => {
            calls.push({ url, options });
            const r = replies[Math.min(calls.length - 1, replies.length - 1)];
            return { status: r.status || 200, headers: { get: (h) => (h === 'x-credits-charged' ? r.charged ?? null : null) }, json: async () => r.body };
        },
        sample: { demo: true },
        sleep: async () => {},
    };
    return { deps, calls, pushed, charges };
}
const email = byName['work-email-finder'].config;
const go = async (config, w) => { try { return await run(config, w.deps); } catch (e) { return { error: e.message }; } };

let w = world({ website: 'example.com' }, { env: { APIFY_USER_IS_PAYING: '0' } });
let r = await go(email, w);
ok('free plan: no service call, no charge, marked sample', r.outcome === 'sample' && w.calls.length === 0 && w.charges.length === 0 && w.pushed[0].sample === true);
w = world({ website: 'example.com' }, { room: 0 });
r = await go(email, w);
ok('spending limit too low: no call', r.outcome === 'limit' && w.calls.length === 0);
w = world({ website: 'example.com' }, { replies: [{ body: { success: true, email: 'a@example.com' }, charged: '10' }] });
r = await go(email, w);
ok('delivered: one charge', r.outcome === 'charged' && w.charges.join() === 'email-found');
ok('key goes in the header to the service only', w.calls[0].url.startsWith('https://api.foxapis.com/v1/find_email') && w.calls[0].options.headers.Authorization === 'Bearer test-key-not-real');
ok('key never in the dataset or the message', !JSON.stringify([w.pushed, r]).includes('test-key-not-real'));
w = world({ website: 'example.com' }, { replies: [{ body: { success: false }, charged: '0' }] });
r = await go(email, w);
ok('nothing found: no charge', r.outcome === 'free' && w.charges.length === 0);
w = world({ website: 'example.com' }, { replies: [{ status: 402, body: { detail: 'Top up at https://foxapis.com/pricing' } }] });
r = await go(email, w);
ok('service error: no charge, its text not passed on', !!r.error && !/foxapis|top up/i.test(r.error) && w.charges.length === 0);
w = world({}, {});
r = await go(email, w);
ok('missing input: no call', !!r.error && w.calls.length === 0);
w = world({ website: 'example.com' }, { env: { FOXAPIS_API_KEY: '' } });
r = await go(email, w);
ok('no key: no call, no charge', !!r.error && w.calls.length === 0);
w = world({ website: 'example.com' }, { env: { SERVICE_BASE: 'http://elsewhere.invalid' }, replies: [{ body: { success: true, email: 'a@b.c' } }] });
await go(email, w);
ok('on the platform the service address cannot be changed', w.calls[0].url.startsWith('https://api.foxapis.com/'));

const gov = byName['us-federal-contractor-check'].config;
w = world({ company: 'x', mode: 'full' }, { replies: [{ body: { found: true }, charged: '2000' }] });
r = await go(gov, w);
ok('full mode charges the full event', w.charges.join() === 'contractor-full');
w = world({ company: 'x' }, { replies: [{ body: { found: true }, charged: '300' }] });
await go(gov, w);
ok('default mode charges the snapshot event', w.charges.join() === 'contractor-snapshot');

const report = byName['company-due-diligence-report'].config;
w = world({ name: 'x' }, { replies: [{ status: 202, body: { job_id: 'j1' } }, { body: { status: 'running' } }, { status: 503, body: null }, { body: { status: 'done', credits_used: 5000, result: { status: 'complete', note: 'A FoxAPIs account does not have this' } } }] });
r = await go(report, w);
ok('async: waits through running and a server blip, charges once', r.outcome === 'charged' && w.charges.length === 1 && w.calls.length === 4);
ok('service brand removed from output', !/foxapis/i.test(JSON.stringify(w.pushed)));
w = world({ name: 'x' }, { replies: [{ status: 202, body: { job_id: 'j1' } }, { body: { status: 'error', error: 'x' } }] });
r = await go(report, w);
ok('async failure: no charge', !!r.error && w.charges.length === 0);

const uk = byName['uk-company-search'].config;
w = world({ q: 'Tesco' }, { replies: [{ body: [], charged: '0' }] });
r = await go(uk, w);
ok('empty search: no charge', w.charges.length === 0);
ok('search uses the query string', w.calls[0].url.endsWith('/v1/companies/search?q=Tesco') && !w.calls[0].options.body);
ok('clean drops service links', clean('see https://foxapis.com/x now') === 'see  now');
ok('delivered: untracked product is not billable', !delivered(byName['product-changelog-lookup'].config, { tracked: false }));

for (const a of actors) {
    const readme = readFileSync(new URL(`./${a.name}/README.md`, import.meta.url), 'utf8');
    ok(`${a.name}: README links to and promotes no outside product`, !/foxapis|mentionfox/i.test(readme));
    // price rule: 80% of the price must be at least the credits used, valued at the dearest plan rate ($49 for 50,000)
    for (const e of a.events) ok(`${a.name} ${e.name}: 80% of $${e.usd} covers ${e.credits} credits`, 0.8 * e.usd > e.credits * (49 / 50000));
}
console.log(`${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
