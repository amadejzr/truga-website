# Security & Analytics — Truga

## 1. DDoS Protection (Free — Cloudflare automatic)

If the domain is behind Cloudflare, DDoS protection is included out of the box. Cloudflare absorbs volumetric attacks at the edge before they reach the app. No setup needed.

## 2. Form Spam Prevention (Must implement)

| Layer | What | Stops | Effort |
|-------|------|-------|--------|
| **Cloudflare Turnstile** | Invisible challenge on form | Bots, scrapers | 30 min |
| **Honeypot field** | Hidden input bots fill | Dumb bots | 10 min |
| **Server-side rate limit** | Max 3 submissions per IP per hour | Spam floods | 20 min |
| **Email validation** | Check format + disposable domains | Fake signups | 10 min |

Turnstile is the most important one. It's Cloudflare's free alternative to reCAPTCHA — invisible to real users, blocks bots. Without it, anyone can curl the server action and flood the inbox.

## 3. Rate Limiting (Two layers)

### Edge level — Cloudflare WAF rule (free tier)

- Configure in Cloudflare dashboard: Security > WAF > Rate limiting rules
- Example: Block IP after 5 requests to `/api/*` within 1 minute

### App level — in the server action

- Simple in-memory rate limit (or Cloudflare KV for persistence)
- Reject if same IP submits more than 3 inquiries per hour

## 4. Analytics

### Website Analytics (pick one)

| Tool | Cost | Privacy |
|------|------|---------|
| **Cloudflare Web Analytics** | Free | No cookies, GDPR compliant |
| **Plausible** | 9€/month | No cookies, GDPR compliant |
| **Google Analytics** | Free | Requires cookie banner (GDPR) |

Recommendation: **Cloudflare Web Analytics**. Free, no cookies (no cookie banner needed for Slovenia/EU), one line of code. Provides page views, visitors, top pages, referrers, countries.

### Business Analytics (from database)

If using D1 database for inquiries, query the data for:
- How many inquiries per week/month
- Which boxes are most popular
- Average rental duration
- Which roof types are most common
- Conversion: visitors vs inquiries (combine with web analytics)

No fancy dashboard needed on day one — just the database. Query it later.

## 5. Implementation Priority

| Priority | Task | Why |
|----------|------|-----|
| **Before launch** | Add Cloudflare Turnstile to the form | Without this, bots will spam |
| **Before launch** | Add honeypot field | 10 min, catches dumb bots |
| **Before launch** | Add Cloudflare Web Analytics | One script tag, free |
| **Week 1** | Add server-side rate limiting | Prevents abuse |
| **Later** | Add D1 database for inquiries | Business analytics, data safety |
| **Later** | Build simple admin page | View/manage inquiries |

## 6. What You DON'T Need

- Paid WAF/security tools — Cloudflare free tier is enough at this scale
- Bot management services — Turnstile covers it
- Uptime monitoring — Vercel provides this
- Error tracking (Sentry etc.) — nice to have but not critical at launch
