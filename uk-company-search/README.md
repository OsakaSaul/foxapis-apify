# UK Company Register Search

Search the UK company register by the start of a name, company number, status, country or industry code. Register facts only, no contacts.

## What you get

- Company name, number, status, type and incorporation date
- Jurisdiction, registered address town and country, industry codes
- Whether the register holds persons of significant control for the company

## Input

- `q`: Matched from the start of the registered name.
- `company_number`: Exact registered company number.
- `status`: For example active or dissolved.
- `country`: Country of the registered address.
- `sic`: A standard industry classification code.
- `page`: Page of results, from 1.
- `page_size`: From 1 to 100.

## When you are charged

- **Search with results**: One search that returns at least one company, up to 100 rows.

The price of each event is shown on this Actor's pricing tab. A run that finds nothing, or fails, charges no event. Live results need a paid Apify plan: on the free plan the run returns the sample below, marked as a sample.

## Real sample output

Captured 2026-11-22 for this input:

```json
{
  "q": "Tesco PLC"
}
```

Shortened here (private names removed):

```json
[
  {
    "company_number": "00445790",
    "company_name": "TESCO PLC",
    "company_status": "active",
    "company_type": "Public Limited Company",
    "incorporation_date": "1947-11-27",
    "jurisdiction": "united kingdom",
    "reg_address_locality": "WELWYN GARDEN CITY",
    "reg_address_country": "UNITED KINGDOM",
    "sic_codes": [
      "47110"
    ],
    "has_psc": false
  }
]
```

## Limits

Covers the UK register only. The data is held from the register and can lag behind it; check the official register before relying on a record. At least one filter is needed.
