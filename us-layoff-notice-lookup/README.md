# US Layoff Notice (WARN) Lookup

Find the US state layoff notices held for one company, by company name, website domain or SEC CIK number.

## What you get

- Each notice held: state, city, employees, notice and effective dates, type
- The company name as filed, how it was matched and a source link
- How the company you asked for was identified

## Input

- `name`: The company's legal or trading name. Give exactly one of name, domain or CIK.
- `domain`: The company's domain, for example example.com.
- `cik`: The company's CIK, for companies that file with the SEC.

## When you are charged

- **Company with layoff notices**: One company lookup that returns at least one layoff notice.

The price of each event is shown on this Actor's pricing tab. A run that finds nothing, or fails, charges no event. Live results need a paid Apify plan: on the free plan the run returns the sample below, marked as a sample.

## Real sample output

Captured 2026-11-25 for this input:

```json
{
  "name": "Microsoft"
}
```

Shortened here (private names removed):

```json
{
  "as_of": "2026-11-25T21:16:59.744539+00:00",
  "identity": {
    "query": {
      "name": "Microsoft"
    },
    "matches": [
      {
        "how": "exactly one SEC filer has this name",
        "kind": "sec_cik",
        "value": 789019,
        "confidence": "high"
      }
    ],
    "resolved": {
      "sec_cik": 789019
    }
  },
  "layoff_notices": {
    "count": 7,
    "source": "US state WARN layoff notices",
    "notices": [
      {
        "city": "Redmond",
        "type": "layoff",
        "state": "WA",
        "employees": 277,
        "matched_by": "SEC CIK",
        "source_url": "https://fortress.wa.gov/esd/file/WARN",
        "notice_date": "2026-09-22",
        "effective_date": "2026-11-21",
        "company_as_filed": "Microsoft"
      },
      {
        "city": "Redmond",
        "type": "layoff",
        "state": "WA",
        "employees": 605,
        "matched_by": "SEC CIK",
        "source_url": "https://fortress.wa.gov/esd/file/WARN",
        "notice_date": "2026-07-06",
        "effective_date": "2026-09-04",
        "company_as_filed": "Microsoft"
      },
      "[5 more shortened]"
    ],
    "confidence": "linked to the SEC filer, or exact company name",
    "last_notice": "2026-09-22",
    "first_notice": "2025-05-13",
    "employees_total": 4084
  }
}
```

## Limits

State layoff notices only, as published by the states we read; coverage and history differ by state and small layoffs may need no notice. A name can belong to more than one company: check the match details. No notice found does not prove there were no layoffs. No employee is named.
