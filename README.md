# Actors

Seven small Apify Actors, one folder each. Each calls the publisher's data API and returns the answer as dataset items.

| Folder | Charged events (USD) |
| --- | --- |
| uk-company-search | search-with-results 0.01 |
| work-email-finder | email-found 0.014 |
| us-federal-contractor-check | contractor-snapshot 0.45, contractor-full 2.95 |
| us-nonprofit-check | nonprofit-snapshot 0.30, nonprofit-full 2.20 |
| company-due-diligence-report | company-report 7.40 |
| show-hn-best-time | slot-lookup 0.01 |
| product-changelog-lookup | changelog-lookup 0.005 |

## Editing

Edit `actors.json` or `_shared/`, then run `node generate.cjs` and `node test.mjs`. The Actor folders are generated.

Keep Actor READMEs, titles and descriptions free of links to, or promotion of, anything outside Apify: the Store publishing terms (2.2.4.2) forbid it. The test checks the READMEs for this publisher's own names.

## Publishing checklist

1. Each Actor needs a secret environment variable `FOXAPIS_API_KEY`, set in Apify Console. Use a key made only for Apify. Never put it in this repository.
2. In monetization (pay per event), enter the events from the folder's `.actor/pay_per_event.json`, and delete the automatic `apify-default-dataset-item` event, or users pay twice.
3. For `company-due-diligence-report`, set the default run timeout to at least 1800 seconds.
4. A user on the free plan gets a marked sample and the API is not called. To test live from your own free account, set `ALLOW_FREE_RUNS=1` on one Actor, run it, then remove the variable.
