# SEC 8-K Executive Changes

Appointments and departures that US public companies report on Form 8-K, Item 5.02, one record per filing.

## What you get

- Company, CIK and tickers
- Each named change: person, role, appointed or departed, effective date and the filing's own sentence
- Links to the filing and the document, and the filing date

## Input

- `company`: Words from the company name; every word must appear as a whole word.
- `cik`: That company only.
- `person`: First and last name.
- `accession`: One exact filing. Send it on its own.
- `filed_from`: Filings filed on or after this date, YYYY-MM-DD.
- `filed_to`: Filings filed on or before this date, YYYY-MM-DD.
- `page`: Page of results, from 1.
- `page_size`: From 1 to 25. You pay for each filing returned.

## When you are charged

- **Filing returned**: Charged once for each filing returned.

The price of each event is shown on this Actor's pricing tab. A run that finds nothing, or fails, charges no event. Live results need a paid Apify plan: on the free plan the run returns the sample below, marked as a sample.

## Real sample output

Captured 2026-11-25 for this input:

```json
{
  "company": "LKQ",
  "page_size": 2
}
```

Shortened here (private names removed):

```json
{
  "page": 1,
  "as_of": "2026-11-25T21:17:09.619307+00:00",
  "source": "SEC Form 8-K filings, Item 5.02",
  "records": [
    {
      "form": "8-K",
      "filed": "2026-11-19",
      "changes": [
        {
          "role": "Director",
          "person": "[name removed from this sample]",
          "sentence": "[name removed from this sample]",
          "change_type": "departed"
        }
      ],
      "company": "LKQ CORP",
      "sec_cik": "1065696",
      "tickers": "LKQ",
      "accession": "0001065696-26-000063",
      "filing_url": "https://www.sec.gov/Archives/edgar/data/1065696/000106569626000063/0001065696-26-000063-index.htm",
      "document_url": "https://www.sec.gov/Archives/edgar/data/1065696/000106569626000063/lkq-20261118.htm"
    },
    {
      "form": "8-K",
      "filed": "2026-11-16",
      "changes": [
        {
          "role": "Senior Vice President",
          "person": "[name removed from this sample]",
          "sentence": "[name removed from this sample]",
          "change_type": "departed",
          "effective_date": "2027-01-01"
        }
      ],
      "company": "LKQ CORP",
      "sec_cik": "1065696",
      "tickers": "LKQ",
      "accession": "0001065696-26-000061",
      "filing_url": "https://www.sec.gov/Archives/edgar/data/1065696/000106569626000061/0001065696-26-000061-index.htm",
      "document_url": "https://www.sec.gov/Archives/edgar/data/1065696/000106569626000061/lkq-20261111.htm"
    }
  ],
  "has_data": true,
  "page_size": 2,
  "coverage_from": "2026-01-02",
  "total_matching": 4,
  "companies_matched": [
    {
      "company": "LKQ CORP",
      "sec_cik": "1065696"
    }
  ],
  "companies_matched_count": 1
}
```

## Limits

Coverage starts on 2 January 2026. Role and effective date are read from the filing's sentence and are empty when it does not state them; some filings name nobody in a readable sentence. Private companies do not file Form 8-K. Check the linked filing before acting.
