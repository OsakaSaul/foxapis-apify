# US Federal Contractor Check

Check one US federal contractor against the official public records: registration, totals, largest contracts and, in full mode, tables by year and agency.

## What you get

- Registration details and how the contractor was matched
- Five-year totals and the largest contracts, with record links
- A plain verdict, and what was not checked

## Input

- `company` (required): A company name, a 12-character UEI or a 5-character CAGE code.
- `mode`: Snapshot: registration, five-year totals, top five contracts, one verdict. Full: adds tables by year and agency, active contracts, modifications and subcontracts.

## When you are charged

- **Contractor snapshot**: One contractor found, snapshot depth.
- **Contractor full record**: One contractor found, full depth.

The price of each event is shown on this Actor's pricing tab. A run that finds nothing, or fails, charges no event. Live results need a paid Apify plan: on the free plan the run returns the sample below, marked as a sample.

## Real sample output

Captured 2026-11-23 for this input:

```json
{
  "company": "K19NE1KN3EL5",
  "mode": "full"
}
```

Shortened here (private names removed):

```json
{
  "found": true,
  "status": "found",
  "mode": "full",
  "as_of": "2026-11-22",
  "contractor": {
    "name": "Schwab Engineering, Inc.",
    "uei": "K19NE1KN3EL5",
    "matched_on": "uei",
    "record_url": "https://www.usaspending.gov/recipient/ff993536-a457-6e19-b432-de87e1524527-C/latest"
  },
  "registration": {
    "status": "not_checked",
    "reason": "registration source not connected"
  },
  "exclusions": {
    "status": "not_checked",
    "reason": "registration source not connected"
  },
  "awards": {
    "window": {
      "from": "2022-10-01",
      "to": "2027-09-30",
      "federal_years": "2023 to 2027"
    },
    "not_checked": [],
    "total_5y": {
      "amount_usd": 988347,
      "contracts": 7,
      "record_url": "https://www.usaspending.gov/recipient/ff993536-a457-6e19-b432-de87e1524527-C/latest"
    },
    "trend": {
      "fiscal_year": 2026,
      "obligated_usd": -25585,
      "prior_fiscal_year": 2025,
      "prior_obligated_usd": 102297,
      "change_pct": -125,
      "record_url": "https://www.usaspending.gov/recipient/ff993536-a457-6e19-b432-de87e1524527-C/latest"
    },
    "top_agency": {
      "agency": "Department of Veterans Affairs",
      "obligated_usd": 988347,
      "share_pct": 100,
      "record_url": "https://www.usaspending.gov/recipient/ff993536-a457-6e19-b432-de87e1524527-C/latest"
    },
    "recompete": {
      "sample": "the 100 biggest awards of the last five federal years",
      "sample_size": 7,
      "active_contracts": 1,
      "ending_within_18_months": 1,
      "ending_within_18_months_usd": 881844,
      "earliest_end": "2027-10-05",
      "record_url": "https://www.usaspending.gov/award/CONT_AWD_36C77624C0206_3600_-NONE-_-NONE-"
    },
    "top_contracts": [
      {
        "award_id": "36C77624C0206",
        "award_total_obligated_usd": 881844,
        "start": "2024-09-26",
        "end": "2027-10-05",
        "agency": "Department of Veterans Affairs",
        "set_aside": null,
        "naics": "541330",
        "naics_name": "Engineering Services",
        "description": "MINOR DESIGN TO CONSTRUCT HYBRID OPERATING SUITE - SAN FRANCISCO, CA",
        "record_url": "https://www.usaspending.gov/award/CONT_AWD_36C77624C0206_3600_-NONE-_-NONE-",
        "recompete_window": true
      },
      {
        "award_id": "36E77618N0052",
```

## Limits

US federal records only, as of the date shown in the result. It is not legal advice and not a complete responsibility check: confirm exclusions on the official site before an award decision.
