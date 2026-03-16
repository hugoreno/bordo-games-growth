# AppsFlyer's SKAdNetwork (SKAN) Solution — Executive Summary

## What problem does this solve?

Since iOS 14.5, Apple requires users to opt in to ad tracking (ATT). Only ~15-30% do. **SKAdNetwork (SKAN)** is Apple's privacy-preserving framework that lets you measure ad campaign performance **without** needing user consent or device identifiers (IDFA). AppsFlyer's solution sits on top of SKAN to make it usable.

## How SKAN works (in 60 seconds)

1. **User sees your ad** in another app (e.g., a game, social media)
2. **User installs and opens your app** within 30 days
3. **iOS tracks post-install activity** using "conversion values" (CVs) you define
4. **iOS sends a postback** (a data packet) to the ad network + AppsFlyer — with no user-identifying info
5. **You see aggregated campaign data** in your AppsFlyer dashboard

**Key constraint**: you never see individual user data — only campaign-level aggregates.

## Conversion Values: the core concept

A conversion value is a **6-bit number (0–63)** that encodes what a user did after install. **You decide what it encodes.**

| Strategy | Example | Trade-off |
|----------|---------|-----------|
| **All revenue** | 64 revenue buckets ($0, $0.99, $1.99…) | Deep revenue insight, no event data |
| **Split** | 3 bits revenue (8 levels) + 3 bits engagement (8 levels) | Balanced but less granular |
| **Combo** | Revenue + game level + login flag | Most info but least precision per metric |

**You only get 64 possible values** — choosing what to measure is a critical strategic decision.

## SKAN 4.0 — three measurement windows

| Window | Time | Conversion Value | Postback delay |
|--------|------|-----------------|----------------|
| **Window 1** | Days 0–2 | Fine (0–63) + Coarse (low/med/high) | 24–48 hrs after window ends |
| **Window 2** | Days 3–7 | Coarse only (low/med/high) | 24–144 hrs |
| **Window 3** | Days 8–35 | Coarse only (low/med/high) | 24–144 hrs |

This means you can now see user behavior evolution over 35 days, not just the first 24 hours.

## Privacy thresholds — the catch

Apple won't send full conversion values unless your campaign has **enough installs** to prevent identifying individual users.

| Install volume | What you get |
|---------------|-------------|
| **Very low** | Install count only. No conversion value. |
| **Low** | Coarse value (low/med/high) |
| **High enough** | Full fine-grained conversion value (0–63) |

**Practical implication**: you need ~128+ installs/day per campaign to get useful data. New campaigns or niche markets may start "blind."

## What AppsFlyer adds on top of SKAN

| Feature | What it does |
|---------|-------------|
| **Conversion Studio** | Visual tool to design your CV schema — what bits encode what |
| **Schema templates** | Pre-built schemas for gaming, e-commerce, subscription apps |
| **Modeled data** | ML fills in the gaps from null/missing conversion values |
| **SKAN Dashboard** | Unified view of SKAN data across all ad networks |
| **CV Decode** | Translates raw CV numbers back into meaningful metrics |
| **Recommendations** | Daily suggestions to improve your schema based on real data |

## Key decisions for your CTO call

### 1. What to measure with your 64 conversion values?
- Revenue only? Events only? A combination?
- This depends on your business model (subscription, IAP, ad-monetized)

### 2. Measurement window durations
- Longer windows = more user data but slower optimization cycle
- Shorter windows = faster iteration but less complete picture

### 3. Campaign structure vs. data granularity
- Fewer campaigns = more installs per campaign = better data quality
- More campaigns = more targeting options but risk falling below privacy thresholds

### 4. SKAN vs. consented (ATT) data strategy
- SKAN data is complementary to ATT-consented data, not a replacement
- Consider running both and using modeled data to bridge gaps

### 5. AdAttributionKit (Apple's successor)
- Apple announced a successor framework with configurable attribution windows and country-level data
- Shipping with iOS 18.4 — worth planning for

## Limitations to be aware of

- **No real-time data**: minimum 24-48hr delay on all postbacks
- **No user-level data**: everything is aggregated at campaign level
- **No re-engagement attribution**: SKAN only measures first install
- **Fraud risk**: concentrated attribution creates a target for manipulation
- **64-value cap**: forces hard trade-offs on what you measure
- **Privacy thresholds**: low-volume campaigns get limited or no data

## Bottom line

SKAN is **not optional** — it's the only way to measure iOS ad performance for ~70-85% of users who don't consent to tracking. AppsFlyer makes it manageable by handling the CV encoding, postback collection, and data modeling. Your main strategic decisions are **what to encode in your 64 values** and **how to structure campaigns** to stay above privacy thresholds.
