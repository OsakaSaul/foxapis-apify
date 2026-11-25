# US Nonprofit Check

Check one US tax-exempt organization using the IRS files: exemption status, revocation list and headline figures, with more detail in full mode.

## What you get

- Exemption status and whether the organization is on the revocation list
- Latest headline figures from its returns
- A plain verdict, and what the files do not cover

## Input

- `ein`: Fill in either the EIN or the name.
- `name`: Fill in either the name or the EIN. A name that matches several organizations returns the candidates, free.
- `state`: Two-letter state, to narrow a name search.
- `mode`: Snapshot: status, latest headline figures, one verdict. Full: adds filings, ratios, people and grants where the returns carry them.

## When you are charged

- **Nonprofit snapshot**: One organization found, snapshot depth.
- **Nonprofit full record**: One organization found, full depth.

The price of each event is shown on this Actor's pricing tab. A run that finds nothing, or fails, charges no event. Live results need a paid Apify plan: on the free plan the run returns the sample below, marked as a sample.

## Real sample output

Captured 2026-11-25 for this input:

```json
{
  "ein": "26-3618722",
  "mode": "full"
}
```

Shortened here (private names removed):

```json
{
  "resolved": true,
  "mode": "full",
  "organization": {
    "name": "PENCILS OF PROMISE INCORPORATED",
    "ein": "26-3618722",
    "city": "NEW YORK",
    "state": "NY",
    "page": "https://www.irs.gov/charities-non-profits/exempt-organizations-business-master-file-extract-eo-bmf"
  },
  "match": {
    "how": "ein",
    "note": null
  },
  "irs_status": {
    "exemption": {
      "code": 1,
      "meaning": "unconditional exemption",
      "section": "501(c)(3)",
      "ruling_date": "2009-02",
      "deductible_contributions_code": 1,
      "foundation_code": 16,
      "ntee_code": "Q30",
      "latest_return_period": "2025-12"
    },
    "revocation_list": {
      "checked": true,
      "listed": false,
      "entries": []
    },
    "sources": [
      {
        "label": "IRS exempt organizations file",
        "url": "https://www.irs.gov/charities-non-profits/exempt-organizations-business-master-file-extract-eo-bmf",
        "as_of": "2026-11-25"
      },
      {
        "label": "IRS automatic-revocation list",
        "url": "https://www.irs.gov/charities-non-profits/tax-exempt-organization-search-bulk-data-downloads",
        "as_of": null
      }
    ]
  },
  "latest_filing": {
    "period": "2025-12",
    "form": "990",
    "revenue": 6551697,
    "expenses": 3880982,
    "assets": 3401456,
    "liabilities": 82573,
    "net_assets": 3318883,
    "program_pct": 82.3,
    "read_from": "IRS Form 990 e-file",
    "page": "https://apps.irs.gov/pub/epostcard/990/xml/2026/2026_TEOS_XML_09A.zip"
  },
  "red_flags": [],
  "not_checked": [
    {
      "what": "State charity registration",
      "reason": "No open, machine-readable state register is read yet; check the state attorney general's charity register for the state it solicits in."
    },
    {
      "what": "News",
      "reason": "No cited news check is run for organizations."
    },
    "[1 more shortened]"
  ],
  "verdict": {
    "label": "exempt_no_flags_found",
    "sentence": "PENCILS OF PROMISE INCORPORATED is listed by the IRS with unconditional tax exemption and absent from the automatic-revocation list, with revenue $6.6 million for the year ending 2025-12 and 82.3% of spending on programs; none of the checks run here raised a flag (state registration, news and court  [shortened]"
```

## Limits

US organizations in the IRS files only. Returns are filed late by nature, so figures can be more than a year old.
