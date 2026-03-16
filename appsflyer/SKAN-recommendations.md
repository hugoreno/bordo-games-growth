# SKAN Recommendations — Social Casino App Launch on Meta

## Context

- Social casino app (slots, poker, etc.)
- New launch, zero existing users
- Limited marketing budget
- Meta (Facebook/Instagram) as primary ad channel
- Testing phase — learning what works before scaling

---

## TL;DR

| Decision | Recommendation |
|----------|---------------|
| **Schema strategy** | Revenue-heavy split: 4 bits revenue (16 buckets) + 1 bit auth type + 1 bit core loop |
| **Window 1 duration** | 24 hours |
| **Coarse CV (W2/W3)** | Low = no purchase, Medium = 1 purchase, High = repeat buyer |
| **Meta campaign structure** | 1–2 campaigns max, use Advantage+ |
| **Meta optimization** | Start with MAI (installs), move to AEO once you have volume |
| **Minimum viable iOS budget** | ~$500–600/day to reach privacy thresholds |

---

## 1. Conversion Value Schema (Window 1 — Fine CV)

### Why revenue-heavy?

The data is clear: **86% of social casino apps use revenue-focused schemas**, and 84% of gaming apps overall prioritize revenue in their CVs. For a social casino:

- Revenue is your north star metric — you need to know which campaigns bring paying users
- Social casino users who monetize tend to do so fast (first 24 hrs)
- Meta needs revenue signal for Value Optimization (VO) campaigns, which is where you eventually want to be

### Recommended schema: 4 bits revenue + 2 bits (auth flag + core-loop flag)

We use **two independent flags** instead of a sequential funnel. This matters because you can't associate events with users until they sign in — the auth gate is your most critical funnel event.

**Revenue bits (4 bits = 16 levels):**

| CV Range | Revenue Bucket | Why |
|----------|---------------|-----|
| 0 | $0 (no purchase) | Baseline — most installs land here |
| 1 | $0.01 – $0.99 | Micro-transaction signal |
| 2 | $1.00 – $1.99 | Low IAP |
| 3 | $2.00 – $4.99 | Starter packs |
| 4 | $5.00 – $9.99 | Mid-low spenders |
| 5 | $10.00 – $14.99 | Mid spenders |
| 6 | $15.00 – $19.99 | Moderate spenders |
| 7 | $20.00 – $29.99 | Good spenders |
| 8 | $30.00 – $39.99 | High spenders |
| 9 | $40.00 – $49.99 | High spenders |
| 10 | $50.00 – $74.99 | Very high |
| 11 | $75.00 – $99.99 | Very high |
| 12 | $100.00 – $149.99 | Whale territory |
| 13 | $150.00 – $249.99 | Whale |
| 14 | $250.00 – $499.99 | Super whale |
| 15 | $500.00+ | VIP |

> **Note:** You'll refine these buckets over time as you learn your actual revenue distribution. Start with this and adjust based on AppsFlyer's daily recommendations. Make sure min ≠ max for each bucket (Meta requires this).

**Signal bits (2 independent flags):**

| Bit 1 (Auth) | Bit 0 (Core loop) | Combined | Meaning | User tracking |
|---|---|---|---|---|
| 0 | 0 | 0 | No sign-in / bounced | Cannot identify user |
| 0 | 1 | 1 | Guest login + played first spin | Guest ID only — limited data association |
| 1 | 0 | 2 | Social auth, hasn't played yet | Can identify user, but low engagement |
| 1 | 1 | 3 | Social auth + played first spin | Full tracking — identified + engaged |

**Why flags instead of a sequential funnel?**

- Auth type and engagement are **independent dimensions** — a guest who plays a lot (0,1) is very different from a social-auth user who bounced (1,0). A sequential funnel collapses this.
- You can directly answer **"what % of my ad-acquired users can I track in our backend?"** from SKAN data alone.
- Social auth is a strong **retention predictor** for social casino — worth encoding explicitly.
- SKAN-compatible: values only go up. All transitions are valid:
  - install → guest play: 0→1
  - install → social auth: 0→2
  - guest play → social auth upgrade: 1→3
  - social auth → plays first spin: 2→3

This gives you **64 total values** (16 revenue × 4 signal combos = 64). Each CV maps to a revenue bucket AND auth+engagement state.

### Example decoded values:

| CV | Meaning |
|----|---------|
| 0 | $0 revenue, bounced / no sign-in |
| 1 | $0 revenue, guest player (playing but unidentified) |
| 2 | $0 revenue, social auth user (identified, hasn't played yet) |
| 3 | $0 revenue, social auth + first spin (best free user) |
| 5 | $0.01–$0.99, guest player |
| 23 | $5–$9.99, social auth + first spin |
| 63 | $500+, social auth + first spin (whale, fully tracked) |

---

## 2. Measurement Windows

### Window 1: 24 hours (recommended)

This is the critical decision and 24 hours is correct for your situation:

- **86% of social casino apps use 24-hour windows** — the industry standard for this vertical
- Social casino users who will spend tend to show intent fast (first session)
- **Meta specifically optimizes on day-of-install data** — a 24hr window aligns perfectly with Meta's optimization engine
- Shorter window = postback arrives ~3 days after install (vs 4-5 days for 48hr) = you can iterate faster
- With a small budget, fast feedback is more valuable than complete data

### Window 2 (Days 3–7) — Coarse CV:

| Coarse Value | Meaning |
|-------------|---------|
| **Low** | No purchase in days 3–7 |
| **Medium** | Made 1 purchase in days 3–7 |
| **High** | Made 2+ purchases or spent >$20 in days 3–7 |

This tells you: are users sticking around and spending, or did they churn after day 1?

### Window 3 (Days 8–35) — Coarse CV:

| Coarse Value | Meaning |
|-------------|---------|
| **Low** | Churned / no activity |
| **Medium** | Active but not spending |
| **High** | Still spending at day 8–35 (LTV signal) |

This is your retention/LTV signal. Users who are "High" in window 3 are your most valuable cohort.

---

## 3. Meta Ads Strategy for SKAN

### The cold start problem

You need **~88–128 installs/day per campaign** to get meaningful SKAN data. With a limited budget, this is your biggest constraint.

### Recommended approach:

**Phase 1: Launch (Weeks 1–4)**

| Setting | Value |
|---------|-------|
| Campaign count | **1 campaign only** |
| Campaign type | **Advantage+ App Campaigns** (Meta's automated format) |
| Optimization | **MAI (Mobile App Install)** — optimize for installs |
| Budget | Minimum $500/day on iOS, ideally $600+ |
| Geo targeting | **Consolidate into tiers** (e.g., US+CA+UK as one group), don't split by country |
| Ad sets | 1–2 max (fewer = more installs per set = above threshold) |
| Evaluation cadence | **Wait 72 hours** minimum before making any changes |

> **Why MAI first?** You don't have enough purchase data yet for Meta to optimize on events or value. Start with installs, let the pixel learn, accumulate data.

**Phase 2: Optimization (Week 5+, once you have purchase data)**

| Setting | Value |
|---------|-------|
| Optimization | Switch to **AEO (App Event Optimization)** → optimize for `Purchase` event |
| Prerequisite | You need ~15 attributed purchases in the last 7 days |
| Campaign count | Still 1–2 max |

**Phase 3: Scale (once AEO is stable)**

| Setting | Value |
|---------|-------|
| Optimization | **VO (Value Optimization)** → optimize for highest-value purchasers |
| Prerequisite | Stable AEO performance, sufficient purchase volume |
| CV mapping | Upload your revenue bucket CSV to Meta via AppsFlyer interop |

### Budget reality check

| Daily iOS budget | Expected daily installs (social casino CPI ~$3-8) | Privacy threshold? |
|-----------------|---------------------------------------------------|-------------------|
| $200/day | ~25–65 installs | Below threshold — mostly null CVs |
| $500/day | ~62–165 installs | Borderline — coarse CVs likely |
| $800/day | ~100–265 installs | Above threshold — fine CVs likely |
| $1,500/day | ~185–500 installs | Comfortable — full data |

> **If your budget is under $500/day**: Accept that you'll get mostly null or coarse CVs for the first weeks. Rely on AppsFlyer's modeled data and your consented (ATT) users for signal. This is normal for new app launches. Don't fragment your budget across multiple campaigns.

---

## 4. AppsFlyer Setup Checklist

1. **Enable SKAN measurement** in AppsFlyer dashboard → Settings → SKAN Conversion Studio
2. **Set SKAN 4 mode** (not SKAN 3) — more data, coarse fallback values
3. **Configure Conversion Studio** with the schema above (revenue + funnel)
4. **Enable Meta interoperation** → Collaborate → Active Integrations → Meta ads → SKAN tab → login → share CV mapping
5. **Enable SSOT (Single Source of Truth)** — AppsFlyer deduplicates SKAN + non-SKAN data to avoid double-counting
6. **Enable Modeled Data** — ML fills gaps from null CVs (critical for low-budget launch)
7. **Upload CV decode CSV** — so AppsFlyer translates raw numbers into business metrics
8. **Set up ATT prompt** in your app — aim for max opt-in (even 20% helps calibrate models)

---

## 5. What to Tell Your CTO

### Must-do now:

- [ ] Integrate AppsFlyer SDK with SKAN 4 support
- [ ] Implement the conversion value schema in Conversion Studio (revenue + funnel as described above)
- [ ] Set up Meta SKAN interoperation in AppsFlyer
- [ ] Configure ATT prompt with a compelling pre-prompt (explain value to user)
- [ ] Implement these SDK events: `login_guest`, `login_social`, `first_spin` (or equivalent core action), `purchase` with revenue

### Discuss with CTO:

- **Revenue bucket boundaries** — the ranges above are a starting point; CTO should validate against your IAP price points
- **Auth + engagement flags** — validate that `login_guest`, `login_social`, and `first_spin` events fire correctly and at the right time in your app flow
- **ATT pre-prompt strategy** — a good pre-prompt can get 25-30% opt-in vs 15% without one
- **AdAttributionKit roadmap** — iOS 18.4 brings Apple's successor framework; worth planning SDK updates

### Accept these realities:

- First 2–4 weeks will have noisy/incomplete SKAN data — that's normal at low volume
- You'll be flying partially blind on iOS; use Android data as a directional proxy
- Don't make big campaign decisions on <72hrs of SKAN data
- Meta's ML needs ~50+ conversions/week to optimize well; patience is required

---

## 6. Schema Evolution Plan

Your schema isn't set in stone. Plan to revisit at these milestones:

| Milestone | Action |
|-----------|--------|
| **Week 2** | Check AppsFlyer's daily recommendations — are your revenue buckets right? |
| **Week 4** | Review actual revenue distribution — most users likely cluster in the low buckets. Refine granularity where it matters. |
| **Month 2** | If you have enough volume, consider shifting 1 funnel bit to revenue (5 bits revenue = 32 buckets) for more precision |
| **Month 3+** | Evaluate if you should add a second campaign on Meta, or test Google/TikTok |
| **iOS 18.4 launch** | Plan migration to AdAttributionKit with your CTO |

---

## Sources

- [AppsFlyer SKAN Solution Guide](https://support.appsflyer.com/hc/en-us/articles/360011420698-SKAdNetwork-SKAN-solution-guide)
- [AppsFlyer Conversion Studio](https://support.appsflyer.com/hc/en-us/articles/4403727223185-SKAN-Conversion-Studio)
- [AppsFlyer SKAN Schema Templates](https://support.appsflyer.com/hc/en-us/articles/28968432692241-SKAN-conversion-schema-templates)
- [AppsFlyer CV Mapping Data (Gaming vs Non-Gaming)](https://www.appsflyer.com/blog/trends-insights/skadnetwork-conversion-value-mapping/)
- [AppsFlyer: Optimize SKAN Campaigns on Meta](https://www.appsflyer.com/blog/measurement-analytics/optimize-skadnetwork-campaigns/)
- [AppsFlyer SKAN + Meta Interoperation](https://support.appsflyer.com/hc/en-us/articles/360017095198-SKAdNetwork-SKAN-interoperation-with-Meta-ads)
- [Meta: Configure SKAdNetwork](https://www.facebook.com/business/help/670955636925518)
- [Meta: Value Optimization Setup](https://www.facebook.com/business/help/437932930561569)
- [Meta: iOS 14+ Campaign Tips](https://www.facebook.com/business/help/595608511524017)
- [SplitMetrics SKAN Guide](https://splitmetrics.com/blog/apple-skadnetwork-guide/)
