// Connects core.js to the Apify platform (copied into each Actor folder by generate.cjs; edit it here).
import { readFile } from 'node:fs/promises';
import { Actor, log } from 'apify';
import { run, UserError } from './core.js';

const read = async (name) => JSON.parse(await readFile(new URL(`../${name}`, import.meta.url), 'utf8'));

await Actor.init();
try {
    const result = await run(await read('config.json'), {
        actor: {
            getInput: () => Actor.getInput(),
            pushData: (data) => Actor.pushData(data),
            // outside pay-per-event pricing (local runs, before monetization is set up) nothing limits the run
            chargeableCount: async (event) => {
                const manager = Actor.getChargingManager();
                if (!manager.getPricingInfo().isPayPerEvent) return 1;
                return manager.calculateMaxEventChargeCountWithinLimit(event);
            },
            charge: (event) => Actor.charge({ eventName: event }),
        },
        env: process.env,
        fetchFn: fetch,
        sample: await read('sample.json'),
        sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
    });
    log.info(result.message);
    await Actor.exit(result.message);
} catch (error) {
    const message = error instanceof UserError || /You were not charged|not configured/.test(error.message)
        ? error.message
        : 'The run failed. You were not charged.';
    await Actor.fail(message);
}
