# SEC Form D Raise Lookup

Look up one US private funding notice (SEC Form D) by its accession number, or a company's Form D history by its SEC CIK number.

## What you get

- Issuer, address, industry and entity type as filed
- Amount offered, amount sold, date of first sale, exemptions and amendment flag
- People the filing names with their roles
- A link to the filing on the SEC site

## Input

- `accession`: The SEC accession number of one Form D filing. Use this or the CIK.
- `cik`: The company's CIK, for its Form D history. Use this or the accession number.

## When you are charged

- **Form D result**: One Form D filing, or one company's Form D history, that was found.

The price of each event is shown on this Actor's pricing tab. A run that finds nothing, or fails, charges no event. Live results need a paid Apify plan: on the free plan the run returns the sample below, marked as a sample.

## Real sample output

Captured 2026-11-25 for this input:

```json
{
  "accession": "0001692147-26-000001"
}
```

Shortened here (private names removed):

```json
{
  "as_of": "2026-11-25T21:17:06.552963+00:00",
  "record_type": "form_d_filing",
  "record": {
    "filed": "2026-08-13",
    "issuer": "Abcuro, Inc.",
    "signed": "2026-08-13",
    "company": {
      "zip": "02458",
      "city": "NEWTON",
      "state": "MASSACHUSETTS",
      "street": "55 CHAPEL ST SUITE 200",
      "entity_type": "Corporation",
      "jurisdiction": "DELAWARE"
    },
    "sec_cik": "1692147",
    "industry": "Biotechnology",
    "sold_usd": 39383108,
    "accession": "0001692147-26-000001",
    "amendment": false,
    "form_type": "D",
    "first_sale": "2026-08-07",
    "source_url": "https://www.sec.gov/Archives/edgar/data/1692147/000169214726000001/primary_doc.xml",
    "offering_usd": 176522953,
    "people_named": [
      {
        "name": "[name removed from this sample]",
        "roles": [
          "Executive Officer",
          "Director"
        ]
      },
      {
        "name": "[name removed from this sample]",
        "roles": [
          "Director"
        ]
      },
      "[4 more shortened]"
    ],
    "revenue_range": "Decline to Disclose",
    "finders_fees_usd": "0",
    "securities_types": [
      "Equity"
    ],
    "offering_as_filed": "176522953",
    "exemptions_claimed": "06b",
    "remaining_as_filed": "137139845",
    "sales_commissions_usd": "0",
    "minimum_investment_usd": "0",
    "investors_already_invested": "23",
    "has_non_accredited_investors": "false"
  },
  "source": "SEC Form D filings"
}
```

## Limits

Held filings are US Form D, nearly all filed from 2022 on. Form D states no valuation and does not name the investors in a round. Amounts are what the company reported. Many raises are never reported on this form.
