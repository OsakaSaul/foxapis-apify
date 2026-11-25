# Show HN Best Time to Post

How often Show HN posts reached 50 and 100 points: overall, for the best hour and day, and for the slot you ask about. Counts, not a prediction.

## What you get

- The share of posts reaching 50 and 100 points, overall
- The best hour and day
- The same shares for your weekday and hour, with the number of posts behind them

## Input

- `weekday`: 0 is Sunday, 6 is Saturday.
- `hour`: 0 to 23, in UTC.

## When you are charged

- **Lookup**: One lookup that returns figures.

The price of each event is shown on this Actor's pricing tab. A run that finds nothing, or fails, charges no event. Live results need a paid Apify plan: on the free plan the run returns the sample below, marked as a sample.

## Real sample output

Captured 2026-11-22 for this input:

```json
{
  "weekday": "2",
  "hour": "15"
}
```

Shortened here (private names removed):

```json
{
  "note": "weekday 0 = Sunday; hours are UTC; a post counts when it has reached the points at any time",
  "slot": {
    "posts": 817,
    "rate_50": 3.3,
    "weekday": 2,
    "hour_utc": 15,
    "rate_100": 1.59,
    "reached_50": 27,
    "reached_100": 13
  },
  "posts": 49342,
  "by_hour": [
    {
      "posts": 1200,
      "rate_50": 3.83,
      "hour_utc": 0,
      "reached_50": 46
    },
    {
      "posts": 1053,
      "rate_50": 2.28,
      "hour_utc": 1,
      "reached_50": 24
    },
    "[22 more shortened]"
  ],
  "rate_50": 2.88,
  "best_day": {
    "posts": 5351,
    "rate_50": 3.44,
    "weekday": 0,
    "reached_50": 184
  },
  "best_hour": {
    "posts": 3565,
    "rate_50": 4.04,
    "hour_utc": 16,
    "reached_50": 144
  },
  "window_to": "2026-11-22",
  "by_weekday": [
    {
      "posts": 5351,
      "rate_50": 3.44,
      "weekday": 0,
      "reached_50": 184
    },
    {
      "posts": 7396,
      "rate_50": 3.07,
      "weekday": 1,
      "reached_50": 227
    },
    "[5 more shortened]"
  ],
  "reached_50": 1422,
  "reached_100": 802,
  "window_from": "2025-11-22",
  "credits_used": 1
}
```

## Limits

Past shares are not a forecast for your post. Not affiliated with or endorsed by Hacker News.
