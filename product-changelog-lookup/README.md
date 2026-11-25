# Product Changelog Lookup

The newest changelog entries held for a software product, each with date, title, a short summary and the vendor's own link.

## What you get

- Date and title of each entry
- A short summary of each
- The vendor's own link for each entry

## Input

- `product` (required): The product's name.
- `limit`: How many of the newest entries.

## When you are charged

- **Changelog lookup**: One lookup of a tracked product that returns entries.

The price of each event is shown on this Actor's pricing tab. A run that finds nothing, or fails, charges no event. Live results need a paid Apify plan: on the free plan the run returns the sample below, marked as a sample.

## Real sample output

Captured 2026-11-22 for this input:

```json
{
  "product": "Linear",
  "limit": 10
}
```

Shortened here (private names removed):

```json
{
  "tracked": true,
  "product": "Linear",
  "entries_held": 62,
  "homepage": "https://linear.app",
  "entries": [
    {
      "date": "2026-11-05",
      "title": "Mobile Diffs",
      "summary": "Diffs, the review experience, is now available on iOS and Android, with guided reviews, inbox review items, preview links and merging from the phone. Several agent display fixes are also included.",
      "link": "https://linear.app/changelog/2026-11-04-mobile-diffs",
      "source_feed": "https://linear.app/rss/changelog.xml"
    },
    {
      "date": "2026-10-22",
      "title": "More ways to run and share Loops",
      "summary": "Loops can now be started by Slack and GitHub events, saved as shareable templates, and given customized reasoning levels.",
      "link": "https://linear.app/changelog/2026-10-22-slack-and-github-loops",
      "source_feed": "https://linear.app/rss/changelog.xml"
    },
    "[7 more shortened]"
  ],
  "credits_used": 1
}
```

## Limits

Only tracked products have entries; an untracked product costs nothing. Entries can lag behind the vendor's page. Not affiliated with the vendors listed.
