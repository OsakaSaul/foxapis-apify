# Company Due Diligence Report

A sourced due diligence report on one company, written for the decision you pick, such as buying from them, joining them or lending to them. Takes several minutes.

## What you get

- The report as a web page, as Markdown and as structured sections
- Links to the sources behind its statements
- No charge when the company cannot be found

## Input

- `name`: Fill in the name, the domain or both.
- `domain`: The company's domain.
- `angle`: The decision the report is written for.
- `country`: Where the company is, if the name is common.

## When you are charged

- **Company report**: One finished report. Set the run timeout to at least 30 minutes.

The price of each event is shown on this Actor's pricing tab. A run that finds nothing, or fails, charges no event. Live results need a paid Apify plan: on the free plan the run returns the sample below, marked as a sample.

## Real sample output

Captured 2026-11-23 for this input:

```json
{
  "name": "Walmart",
  "angle": "selling_to"
}
```

Shortened here (private names removed):

```json
{
  "status": "complete",
  "sections_json": {
    "verdict": {
      "band": "stop",
      "score": 100,
      "headline": "Do not spend a quarter of pipeline on this account."
    },
    "headline": "Selling to them",
    "sections": [
      {
        "id": "executive_summary",
        "title": "The Short Answer",
        "citations": [
          "https://corporate.walmart.com/about/leadership/john-furner"
        ]
      },
      {
        "id": "company_identity",
        "title": "Which Company This Is",
        "citations": [
          "https://www.walmart.com/store/finder?location=&utm_campaign=Patrocinio%20LVP&utm_source=LVP&utm_content=clic-header-web&utm_medium=Referral&utm_var1=espa%5C%5C361a&utm_var2=unity-cup&utm_var3=counter-strike%2F%2F%2F%2Fdesignjet-t700",
          "https://corporate.walmart.com/about/leadership/suresh-kumar"
        ]
      },
      "[14 more shortened]"
    ],
    "citations": {
      "warning_bells": [
        "https://storejobs.wal-mart.com/hiringcenter/disclaimer",
        "https://walmart.wd504.myworkdayjobs.com/WalmartExternal",
        "[13 more shortened]"
      ],
      "payment_record": [],
      "recent_signals": [
        "https://www.foxbusiness.com/business-leaders/who-john-furner-walmarts-new-ceo",
        "https://www.retaildive.com/news/walmart-ceo-dynamic-pricing-concerns/831490/",
        "[4 more shortened]"
      ],
      "spend_direction": [
        "https://careers.walmart.com/",
        "https://www.foxbusiness.com/business-leaders/who-john-furner-walmarts-new-ceo",
        "[2 more shortened]"
      ],
      "company_identity": [
        "https://www.walmart.com/store/finder?location=&utm_campaign=Patrocinio%20LVP&utm_source=LVP&utm_content=clic-header-web&utm_medium=Referral&utm_var1=espa%5C%5C361a&utm_var2=unity-cup&utm_var3=counter-strike%2F%2F%2F%2Fdesignjet-t700",
        "https://corporate.walmart.com/about/leadership/suresh-kumar"
      ],
      "executive_summary": [
        "https://corporate.walmart.com/about/leadership/john-furner"
      ],
      "financial_picture": [
        "https://derrick-app.com/company/walmart/executives"
      ],
      "corporate_standing": [
        "https://corporate.walmart.com/about/leadership/john-furner",
        "https://derrick-app.com/company/walmart/executives"
      ],
      "solvency_and_runway": [
        "https://corporate.walmart.com/about/leadership/john-david-rainey"
      ],
      "key_people_and_contacts": [
        "https://www.foxbusiness.com/business-leaders/who-john-furner-walmarts-new-ceo",
        "https://www.walmart.com/store/finder?location=&utm_campaign=Patrocinio%20LVP&utm_source=LVP&utm_content=clic-header-web&utm_medium=Referral&utm_var1=espa%5C%5C361a&utm_var2=unity-cup&utm_var3=counter-strike%2F%2F%2F%2Fdesignjet-t700",
        "[5 more shortened]"
      ],
      "procurement_and_who_signs": [],
      "customers_and_market_position": [
        "https://derrick-app.com/company/walmart/executives",
        "https://careers.walmart.com/",
```

## Limits

A research aid built from public information, which can be incomplete or out of date. It is not legal, credit or investment advice: open the sources before you decide.
