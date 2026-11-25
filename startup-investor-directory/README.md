# Startup Investor Directory Search

Search a directory of startup investors by sector, stage, region and cheque size, or fetch one record by its slug.

## What you get

- Name, location, stated thesis and thesis summary
- Recent sectors and stages, stated cheque range
- Public profile and website links where held

## Input

- `sector`: For example fintech or healthtech.
- `stage`: For example pre seed, seed or series a.
- `region`: NA, EU, APAC, ME or OFFSHORE.
- `country_code`: Two letter country code.
- `q`: Searches name, thesis and firm description.
- `thesis`: Words that must appear in the stated thesis.
- `check_size_min`: Only investors whose stated range reaches this amount.
- `check_size_max`: Only investors whose stated range starts at or below this amount.
- `slug`: One exact record. Use it on its own.
- `page`: Page of results, from 1.
- `page_size`: From 1 to 100.

## When you are charged

- **Search with results**: One search that returns at least one investor, up to 100 rows.

The price of each event is shown on this Actor's pricing tab. A run that finds nothing, or fails, charges no event. Live results need a paid Apify plan: on the free plan the run returns the sample below, marked as a sample.

## Real sample output

Captured 2026-11-25 for this input:

```json
{
  "sector": "fintech",
  "stage": "seed",
  "page_size": "2"
}
```

Shortened here (private names removed):

```json
[
  {
    "slug": "3one4-capital-0b69f022",
    "name": "3one4 Capital",
    "title": null,
    "firm_description": null,
    "region": null,
    "country_code": null,
    "city": null,
    "thesis_text": "Early-stage India investor focused on formalization, financialization, urbanization and digitalization; unusually young partners, formal integrity and transparency principles, governance programs improving startup practices and profitable exits.",
    "linkedin_url": "https://www.linkedin.com/company/10554430",
    "twitter_url": "https://x.com/3one4Capital",
    "website_url": "http://www.3one4capital.com/",
    "recent_sectors": [
      "fintech",
      "financial services",
      "[2 more shortened]"
    ],
    "recent_stages": [
      "early",
      "pre seed",
      "[2 more shortened]"
    ],
    "check_size_min_usd": 0,
    "check_size_max_usd": 0,
    "bio": null,
    "thesis_summary": "Early-stage India investor targeting formalization, financialization, urbanization, and digitalization. They back founders with integrity and governance programs for profitable exits.",
    "people_on_record": []
  },
  {
    "slug": "4dx-ventures-1068408c",
    "name": "4DX Ventures",
    "title": null,
    "firm_description": null,
    "region": null,
    "country_code": null,
    "city": null,
    "thesis_text": "NY headquarters plus offices in Accra, Cairo and Nairobi combine global capital-market access with local operator proximity; ex-Bridgewater/Morgan Stanley founders and repeat backer of Africa's B2B e-commerce leaders.",
    "linkedin_url": "https://www.linkedin.com/company/4dx-ventures",
    "twitter_url": null,
    "website_url": "https://www.4dxventures.com",
    "recent_sectors": [
      "fintech",
      "logistics"
    ],
    "recent_stages": [
      "seed",
      "series a",
      "[1 more shortened]"
    ],
    "check_size_min_usd": null,
    "check_size_max_usd": null,
    "bio": null,
    "thesis_summary": "Seed to Series B in Africa, with a geographic focus on Nigeria, Kenya, Egypt, Ghana, and South Africa. Sectors include B2B commerce, fintech, logistics, and supply chain, leveraging local operator networks and global capital-market access.",
    "people_on_record": [
      "[people removed from this sample]"
    ]
  }
]
```

## Limits

No email addresses or private contact details are returned. Records can lag behind what an investor is doing now, and some cheque ranges are unstated (shown as 0). Some records are people: use them only where the law allows and honour opt-outs. A search that returns nothing is not charged.
