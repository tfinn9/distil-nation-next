# Knowledge Base — Items Needing Research / Verification

This file tracks KB articles from the master list that were **skipped or only partially drafted**
because they require specific, current, or legally-sensitive New Zealand facts that I do not have
verified data for. Do not publish numbers/claims in these areas without checking a primary source
(Customs NZ, Distilled Spirits Aotearoa, a lawyer, or the distillery itself).

Each entry lists: the question, why it's blocked, and what's needed to unblock it.

## New Zealand Spirits Explained
- **How many distilleries are there in New Zealand?** — Drafted using a defensible proxy (the
  Distil-Nation NZ directory in `data/mock.ts` currently lists 107 distillery/producer entries),
  but this is *our directory count*, not a verified official national total. Needs cross-check
  against Distilled Spirits Aotearoa's member list if we want to claim a national figure.
- **What are the oldest distilleries in New Zealand?** — SKIPPED. `data/mock.ts` does not
  reliably record founding dates for most entries (only a few have a `founded` field, e.g.
  Ruapehu Distillery lists 2026, which is itself unverified/likely a data error worth checking).
  Needs a research pass confirming founding years distillery-by-distillery.
- **What are the newest distilleries in New Zealand?** — SKIPPED. Same issue as above; this is
  also a moving target and probably better implemented as a live/auto-updated query against the
  directory (e.g. sorted by `founded` once that data is populated) rather than a static article.

## New Zealand Distilling Laws
General legal-status answers (e.g. "is home distilling legal") are drafted at a high level because
the core principle — that distilling spirits without an excise licence is prohibited under the
Customs and Excise Act 2018, unlike home-brewing beer or wine — is well established. However, the
following need a lawyer/Customs NZ review before publishing, and all draft articles carry a
disclaimer:
- **How much excise tax do New Zealand distilleries pay?** — SKIPPED (numeric rate). Excise rates
  on spirits are adjusted periodically (historically twice yearly for CPI) by NZ Customs. Needs the
  current rate per litre of pure alcohol (LPA) from customs.govt.nz at time of publishing.
- **How does excise duty work in New Zealand?** — Drafted at a conceptual level only (LPA-based,
  paid to Customs, deferred payment schemes exist). Needs verification of current mechanics,
  deferment/licensing details from Customs NZ.
- **What licences do you need to start a distillery in New Zealand?** — Drafted with general
  categories (Customs excise manufacturer's licence, alcohol licensing under the Sale and Supply of
  Alcohol Act 2012 if selling directly, food/safety registrations). Needs verification of exact
  licence names/forms from Customs NZ and a local council.
- **Can you import spirits into New Zealand?** — Drafted at a general level (yes, subject to
  Customs duty, excise-equivalent duty, GST and biosecurity rules). Needs verification of current
  duty rates and MPI/Customs specifics.
- **What are New Zealand's alcohol labeling requirements?** — Drafted at a general level
  (FSANZ/Food Standards Code requirements: standard drinks labelling, pregnancy warning label
  which became mandatory, allergen statements). Needs a compliance check against the current Food
  Standards Code and Australia New Zealand Food Standards Code before publishing as guidance.

## Distillery Tourism
Regional "best distilleries to visit" articles are drafted using `data/mock.ts` fields
(`region`, `hasVisitorCentre`, `hasTours`, `visitorInfo`) since that is the site's own directory
data. However:
- This directory itself contains unverified entries (see `data/nz-distilleries.md`, which
  explicitly says "verify region, spirit types and websites before publishing").
- Before publishing tourism articles live, spot-check opening hours, booking requirements, and
  whether tours/cellar doors are still operating — this changes often for small distilleries.
- **A complete guide to New Zealand distillery tours** and **Distillery road trips around New
  Zealand** are drafted as frameworks/starting points, not verified turn-by-turn itineraries.

## Industry-Focused Articles
SKIPPED ENTIRELY — all require current, sourced data I don't have and should not estimate:
- New Zealand distillery startup costs
- How much does it cost to open a distillery in New Zealand?
- A complete guide to New Zealand excise duty (needs current rate + worked examples, see above)
- New Zealand spirits industry statistics (updated automatically) — needs a real data source/API
  (e.g. Stats NZ, Distilled Spirits Aotearoa, or our own directory analytics) and a mechanism to
  auto-update; this is an engineering task as much as a content one.
- The state of New Zealand craft distilling (updated annually) — needs a real editorial process
  and sourced data each year; cannot be written in advance without content.
- New Zealand spirits awards explained — needs a verified list of relevant awards (e.g. NZ
  Spirits Awards, San Francisco World Spirits Competition NZ entrants) and their judging criteria.
- Distillery equipment suppliers in New Zealand — needs a researched supplier list (stills,
  fermenters, bottling lines) with verified current contact/service details.
- Where to source bottles, closures and labels in New Zealand — same as above, needs a verified
  supplier list.
- New Zealand contract distilling explained — needs to confirm which NZ distilleries actually
  offer contract/white-label distilling services before naming any.
- Distillery grants and funding opportunities — needs current, verified grant/funding programmes
  (e.g. Callaghan Innovation, regional business grants); these change often and citing a stale
  scheme would be actively misleading.
- How many craft distilleries have opened in New Zealand in the last 10 years? — needs founding-year
  data across the directory (see "oldest/newest" above) before this can be answered.

## Notes on approach
- Where a question is general spirits/production/cocktail knowledge (not NZ-specific regulation or
  statistics), I've written a full draft article — this is standard, widely documented knowledge
  (e.g. how a pot still works, what ABV means, how to make a Negroni).
- Where a question needs a specific NZ number, date, law citation, or business-directory fact I
  can't verify, I've either flagged it here and skipped the article, or (for a few directory-driven
  ones) drafted it clearly sourced to `data/mock.ts` with a caveat rather than presenting it as an
  authoritative external statistic.
