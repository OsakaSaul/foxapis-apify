# US Public Company Ownership

Who holds a US public company according to its SEC filings: large holder reports, insider holdings and acquisition reports.

## What you get

- Reports of large holdings (Schedules 13D and 13G)
- Insider holdings from Forms 3, 4 and 5
- Acquisition reports the company filed, each with its date and filing link

## Input

- `ticker`: The ticker the SEC's list gives the company today. Give exactly one of ticker, CIK or company.
- `sec_cik`: Exact company.
- `company`: Words from the name. If several companies match, you get the list and no charge.

## When you are charged

- **Ownership record**: One company's ownership record that was found.

The price of each event is shown on this Actor's pricing tab. A run that finds nothing, or fails, charges no event. Live results need a paid Apify plan: on the free plan the run returns the sample below, marked as a sample.

## Real sample output

Captured 2026-11-25 for this input:

```json
{
  "ticker": "ECHO"
}
```

Shortened here (private names removed):

```json
{
  "as_of": "2026-11-25T21:17:11.520995+00:00",
  "record": {
    "company": "EchoStar CORP",
    "sec_cik": "1415404",
    "tickers": [
      {
        "ticker": "ECHO",
        "exchange": "Nasdaq"
      }
    ],
    "insider_holdings": [
      {
        "form": "4",
        "name": "[name removed from this sample]",
        "filed": "2026-07-31",
        "filing_url": "https://www.sec.gov/Archives/edgar/data/1415404/000090454826000015/0000904548-26-000015-index.htm",
        "is_officer": false,
        "is_director": true,
        "joint_filing": true,
        "shares_direct": 11140269,
        "shares_indirect": 1551355,
        "period_of_report": "2026-07-29",
        "is_ten_percent_owner": true
      },
      {
        "form": "4",
        "name": "[name removed from this sample]",
        "filed": "2026-07-31",
        "title": "CHAIRMAN, PRES and CEO",
        "filing_url": "https://www.sec.gov/Archives/edgar/data/1415404/000090454826000015/0000904548-26-000015-index.htm",
        "is_officer": true,
        "is_director": true,
        "joint_filing": true,
        "shares_direct": 11140269,
        "shares_indirect": 1551355,
        "period_of_report": "2026-07-29",
        "is_ten_percent_owner": true
      },
      "[13 more shortened]"
    ],
    "acquisition_reports": [
      {
        "form": "8-K",
        "filed": "2026-10-02",
        "filer_role": "unclear",
        "filing_url": "https://www.sec.gov/Archives/edgar/data/1415404/000141540426000048/0001415404-26-000048-index.htm"
      },
      {
        "form": "8-K",
        "filed": "2026-07-28",
        "filer_role": "unclear",
        "filing_url": "https://www.sec.gov/Archives/edgar/data/1415404/000141540426000035/0001415404-26-000035-index.htm"
      }
    ],
    "large_holder_reports": [
      {
        "form": "SCHEDULE 13G/A",
        "filed": "2026-11-16",
        "holders": [
          "[name removed from this sample]",
          "[name removed from this sample]",
          "[1 more shortened]"
        ],
        "event_date": "2026-09-30",
        "filing_url": "https://www.sec.gov/Archives/edgar/data/1415404/000090221926000388/0000902219-26-000388-index.htm",
        "share_class": "Common Stock"
      },
      {
        "form": "SCHEDULE 13G",
```

## Limits

Quarterly institutional holdings (Form 13F) are not included. No parent company is worked out. Share figures are as filed on their dates, not today's positions. US SEC filers only.
