# Work Email Finder

Find the most likely work email for a named person at a company domain, with a verification status. Charged only when an address is found.

## What you get

- The email address
- A verification status: verified, risky or invalid
- When it was checked

## Input

- `website` (required): The company's domain, for example example.com.
- `name`: First and last name of the person.

## When you are charged

- **Email found**: One email address returned for your input.

The price of each event is shown on this Actor's pricing tab. A run that finds nothing, or fails, charges no event. Live results need a paid Apify plan: on the free plan the run returns the sample below, marked as a sample.

## Real sample output

Captured 2026-11-23 for this input:

```json
{
  "website": "stripe.com",
  "name": "Patrick Collison"
}
```

Shortened here (private names removed):

```json
{
  "success": true,
  "email": "p***@stripe.com",
  "email_status": "verified",
  "verification": {
    "status": "verified",
    "checked": true,
    "checked_at": "2026-11-23T06:42:32+00:00",
    "method": "mailbox check",
    "check_result": "ultra_sure"
  },
  "credits_used": 1
}
```

## Limits

A status is not a delivery guarantee. Use the addresses only where the law allows you to contact that person, and honour opt-outs. The address in the sample is masked.
