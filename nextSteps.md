# Next Steps — Truga Deployment

## What to Buy

| Item | Where | Cost |
|------|-------|------|
| Domain (e.g. truga.si) | Cloudflare Registrar or any registrar | ~10-15€/year |

Everything else is free tier.

## Free Accounts to Set Up

| Service | What for | Free tier |
|---------|----------|-----------|
| Cloudflare | DNS, CDN, Turnstile (spam protection), WAF, D1 database | Generous free plan |
| Vercel | Host the Next.js app | Free for personal/small biz |
| Resend | Email notifications (already set up) | 100 emails/month |

## Recommended Architecture

```
Domain (truga.si)  →  Cloudflare DNS
                         ↓
                    Vercel (hosts Next.js app)
                         ↓
                    Cloudflare D1 (database — source of truth)
                    Resend (email notification only)
                    Cloudflare Turnstile (spam protection)
```

### Inquiry Submission Flow

```
User submits form
  → Server Action validates + Turnstile check
  → Write to D1 database (source of truth)
  → Send Resend email (notification only, can fail gracefully)
  → Return success
```

## Security Layers (Free via Cloudflare)

1. **Cloudflare Turnstile** — invisible CAPTCHA on the form, stops bots without annoying users
2. **Cloudflare WAF rate limiting** — e.g. max 5 submissions per IP per hour
3. **Server Action validation** — input sanitization, HTML escaping (already implemented)
4. **Next.js CSRF protection** — Server Actions handle this automatically
5. **Honeypot field** — hidden field that bots fill, humans don't (zero cost)

## Why Database + Email (Not Email Only)

- Emails can get lost in spam or accidentally deleted
- No way to search/filter/sort inquiries with email only
- No audit trail
- If Resend goes down, the inquiry is lost entirely
- Database = source of truth, email = notification

## Total Monthly Cost

**~1€/month** (domain amortized). All services on free tier.
