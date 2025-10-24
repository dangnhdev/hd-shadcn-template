# Deployment Guide

## Overview

This guide covers deploying the Shadcn Starter Template to production. The template uses a serverless architecture with Convex for the backend and can be deployed to various static hosting platforms for the frontend.

## Architecture Overview

```
┌─────────────────────┐
│   Static Hosting    │
│  (Vercel/Netlify)   │  ← Frontend (React SPA)
└─────────────────────┘
          │
          │ HTTPS/WebSocket
          ▼
┌─────────────────────┐
│  Convex Backend     │  ← Backend (Serverless)
│  (convex.dev)       │
└─────────────────────┘
          │
          │ SMTP API
          ▼
┌─────────────────────┐
│  Resend Email       │  ← Email Service
│  (resend.com)       │
└─────────────────────┘
```

## Prerequisites

Before deploying, ensure you have:

- [x] Node.js 18+ installed
- [x] pnpm installed (`npm install -g pnpm`)
- [x] Convex account (free tier available)
- [x] Resend account (free tier available)
- [x] Static hosting account (Vercel/Netlify recommended)
- [x] Custom domain (optional, but recommended for production)

## Environment Variables

### Required Variables

Create `.env` file with these variables:

```bash
# Convex
VITE_CONVEX_URL=https://your-deployment.convex.cloud
CONVEX_SITE_URL=https://your-domain.com

# Better Auth
SITE_URL=https://your-domain.com

# Resend Email
RESEND_API_KEY=re_xxxxxxxxxxxx

# Environment
NODE_ENV=production
```

### Variable Descriptions

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_CONVEX_URL` | Your Convex deployment URL | `https://happy-panda-123.convex.cloud` |
| `CONVEX_SITE_URL` | Your frontend URL (for CORS) | `https://myapp.com` |
| `SITE_URL` | Same as CONVEX_SITE_URL | `https://myapp.com` |
| `RESEND_API_KEY` | Resend API key for emails | `re_abc123xyz...` |

## Deployment Steps

### Step 1: Convex Backend Deployment

#### 1.1 Install Convex CLI

```bash
pnpm install -g convex
```

#### 1.2 Login to Convex

```bash
pnpx convex login
```

This will open a browser for authentication.

#### 1.3 Create Convex Project

```bash
pnpx convex init
```

Select "Create a new project" and follow the prompts.

#### 1.4 Set Environment Variables in Convex

```bash
# Set Resend API key
pnpx convex env set RESEND_API_KEY re_your_api_key_here

# Set site URL (your production domain)
pnpx convex env set SITE_URL https://your-domain.com
```

#### 1.5 Deploy Convex Functions

```bash
pnpx convex deploy
```

This will:
- Build and deploy all Convex functions
- Create database schema
- Set up HTTP endpoints
- Generate deployment URL

**Output Example:**
```
✓ Deployed successfully!
URL: https://happy-panda-123.convex.cloud
```

Copy this URL - you'll need it for frontend deployment.

### Step 2: Frontend Deployment

Choose your preferred hosting platform:

#### Option A: Vercel (Recommended)

**2A.1 Install Vercel CLI**

```bash
pnpm install -g vercel
```

**2A.2 Login to Vercel**

```bash
vercel login
```

**2A.3 Configure Environment Variables**

Create `.env.production` file:

```bash
VITE_CONVEX_URL=https://happy-panda-123.convex.cloud
```

**2A.4 Deploy to Vercel**

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

**2A.5 Set Environment Variables in Vercel Dashboard**

Go to: `Vercel Dashboard > Project > Settings > Environment Variables`

Add:
- `VITE_CONVEX_URL` = `https://your-deployment.convex.cloud`

**2A.6 Trigger Redeploy**

After setting environment variables, trigger a redeploy:

```bash
vercel --prod
```

#### Option B: Netlify

**2B.1 Install Netlify CLI**

```bash
pnpm install -g netlify-cli
```

**2B.2 Login to Netlify**

```bash
netlify login
```

**2B.3 Initialize Netlify Site**

```bash
netlify init
```

**2B.4 Set Environment Variables**

```bash
netlify env:set VITE_CONVEX_URL https://your-deployment.convex.cloud
```

Or via Netlify dashboard:
`Site Settings > Build & deploy > Environment`

**2B.5 Deploy to Netlify**

```bash
# Deploy to preview
netlify deploy

# Deploy to production
netlify deploy --prod
```

#### Option C: Cloudflare Pages

**2C.1 Login to Cloudflare Dashboard**

Go to: `Workers & Pages > Create application > Pages`

**2C.2 Connect to Git Repository**

- Select your repository
- Configure build settings:
  - Build command: `pnpm build`
  - Build output directory: `dist`

**2C.3 Set Environment Variables**

In Cloudflare dashboard:
`Settings > Environment variables`

Add:
- `VITE_CONVEX_URL` = `https://your-deployment.convex.cloud`

**2C.4 Deploy**

Click "Save and Deploy"

### Step 3: Configure Domain and CORS

#### 3.1 Add Custom Domain

**For Vercel:**
1. Go to `Project Settings > Domains`
2. Add your domain
3. Follow DNS configuration instructions

**For Netlify:**
1. Go to `Site Settings > Domain management`
2. Add custom domain
3. Configure DNS records

**For Cloudflare:**
1. Domain is automatically managed if using Cloudflare DNS

#### 3.2 Update Convex Environment Variables

After domain is configured, update Convex:

```bash
pnpx convex env set SITE_URL https://your-custom-domain.com
```

#### 3.3 Update Frontend Environment Variables

Update `VITE_CONVEX_URL` in your hosting platform if needed.

#### 3.4 Redeploy

Redeploy frontend to pick up new environment variables.

### Step 4: Email Configuration

#### 4.1 Verify Resend Domain

1. Go to Resend Dashboard > Domains
2. Add your domain
3. Add DNS records (TXT, MX, CNAME)
4. Wait for verification (usually < 1 hour)

#### 4.2 Update Email Templates

Edit email templates in `convex/emails/` if needed:
- Update "from" email address
- Customize branding
- Adjust copy

#### 4.3 Test Emails

Send a test email:

```bash
# Use Convex dashboard to test email function
# Or use the test page in your app
```

Use Resend test addresses for testing:
- `delivered@resend.dev` - Always successful
- `bounced@resend.dev` - Always bounces
- `complained@resend.dev` - Marks as spam

### Step 5: Verify Deployment

#### 5.1 Check Frontend

Visit your deployment URL and verify:
- [ ] Page loads correctly
- [ ] Theme switching works
- [ ] Navigation works
- [ ] No console errors

#### 5.2 Check Authentication

Test the authentication flow:
- [ ] Sign in page loads
- [ ] OTP email is sent
- [ ] OTP verification works
- [ ] Dashboard loads after login
- [ ] Sign out works

#### 5.3 Check Backend

Verify Convex functions:
- [ ] Convex dashboard shows deployment
- [ ] No error logs in Convex dashboard
- [ ] Database tables created

#### 5.4 Check Performance

Run Lighthouse audit:

```bash
# Install Lighthouse
pnpm install -g lighthouse

# Run audit
lighthouse https://your-domain.com --view
```

Target scores:
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

## Deployment Checklist

### Pre-Deployment

- [ ] All tests passing (`pnpm test:run`)
- [ ] Type checking passing (`pnpm typecheck`)
- [ ] Linting passing (`pnpm lint`)
- [ ] Build successful (`pnpm build`)
- [ ] Environment variables configured
- [ ] Sensitive data removed from code

### Deployment

- [ ] Convex backend deployed
- [ ] Environment variables set in Convex
- [ ] Frontend built and deployed
- [ ] Environment variables set in hosting platform
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] CORS configured correctly

### Post-Deployment

- [ ] Frontend accessible
- [ ] Authentication working
- [ ] Emails sending correctly
- [ ] No console errors
- [ ] Performance acceptable (Lighthouse > 90)
- [ ] Monitoring configured
- [ ] Error tracking configured (if using Sentry)

## CI/CD Setup

### GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install

      - name: Type check
        run: pnpm typecheck

      - name: Lint
        run: pnpm lint

      - name: Test
        run: pnpm test:run

      - name: Build
        run: pnpm build
        env:
          VITE_CONVEX_URL: ${{ secrets.VITE_CONVEX_URL }}

      - name: Deploy to Convex
        run: pnpx convex deploy --prod
        env:
          CONVEX_DEPLOY_KEY: ${{ secrets.CONVEX_DEPLOY_KEY }}

      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

### Required Secrets

Add these secrets in GitHub repository settings:

- `VITE_CONVEX_URL` - Your Convex deployment URL
- `CONVEX_DEPLOY_KEY` - From Convex dashboard
- `VERCEL_TOKEN` - From Vercel account settings
- `VERCEL_ORG_ID` - From Vercel project settings
- `VERCEL_PROJECT_ID` - From Vercel project settings

## Rollback Procedure

### Rolling Back Frontend

**Vercel:**
```bash
# List deployments
vercel list

# Rollback to previous deployment
vercel rollback [deployment-url]
```

**Netlify:**
```bash
# Via dashboard: Deploys > [Select previous deploy] > Publish deploy
```

### Rolling Back Backend (Convex)

```bash
# Via Convex dashboard: Deployments > [Select previous deployment] > Restore
```

**Note:** Database schema changes may not be reversible. Test thoroughly before deploying schema changes.

## Monitoring and Logging

### Frontend Monitoring

**Recommended Tools:**
- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **Google Analytics** - User analytics
- **Web Vitals** - Performance monitoring

### Backend Monitoring

**Convex Dashboard:**
- Function execution times
- Error logs
- Database query performance
- Real-time connections

**Convex Logs:**

```bash
# Stream logs in terminal
pnpx convex logs
```

### Setting Up Alerts

1. **Convex Alerts:**
   - Configure in Convex dashboard
   - Set thresholds for errors, latency

2. **Frontend Alerts:**
   - Configure error tracking (Sentry)
   - Set up performance alerts

## Troubleshooting

### Common Issues

#### Issue: CORS Errors

**Symptoms:**
- Authentication fails
- API requests blocked
- Console shows CORS error

**Solution:**
```bash
# Verify SITE_URL is correct
pnpx convex env get SITE_URL

# Update if needed
pnpx convex env set SITE_URL https://your-actual-domain.com

# Redeploy Convex
pnpx convex deploy
```

#### Issue: Authentication Not Working

**Symptoms:**
- OTP emails not sent
- Login redirects fail
- Session not persisting

**Solution:**
1. Check Resend API key: `pnpx convex env get RESEND_API_KEY`
2. Verify domain in Resend dashboard
3. Check SITE_URL matches frontend URL
4. Clear browser cookies and try again

#### Issue: Environment Variables Not Applied

**Symptoms:**
- App shows default values
- Features not working as expected

**Solution:**
1. Verify variables in hosting platform dashboard
2. Redeploy after setting variables
3. Check variable names (must start with `VITE_` for frontend)

#### Issue: Build Fails

**Symptoms:**
- Deployment fails during build
- Type errors in production build

**Solution:**
```bash
# Test build locally
pnpm build

# Fix type errors
pnpm typecheck

# Check for missing dependencies
pnpm install
```

#### Issue: Slow Performance

**Symptoms:**
- Lighthouse score < 90
- Slow page loads

**Solution:**
1. Check bundle size: `pnpm build` and inspect `dist/`
2. Enable gzip/brotli compression in hosting platform
3. Optimize images
4. Review Convex query performance in dashboard

## Security Best Practices

### Production Security Checklist

- [ ] HTTPS enabled (automatic with Vercel/Netlify)
- [ ] Environment variables not exposed in frontend
- [ ] API keys secured in backend
- [ ] CORS properly configured
- [ ] Content Security Policy (CSP) headers configured
- [ ] Rate limiting enabled (Convex has built-in)
- [ ] Database rules properly configured
- [ ] Regular security updates for dependencies

### Securing Convex

```bash
# Set strict CORS
pnpx convex env set SITE_URL https://your-domain.com

# No wildcards in production!
```

### Securing Frontend

**Set Security Headers (Vercel):**

Create `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

## Cost Optimization

### Convex Costs

**Free Tier:**
- 1M reads/day
- 500K writes/day
- 1GB storage
- 10GB bandwidth

**Optimization Tips:**
- Use pagination for large datasets
- Cache query results when appropriate
- Optimize database indexes
- Monitor usage in dashboard

### Hosting Costs

**Vercel Free Tier:**
- 100GB bandwidth/month
- Unlimited deployments
- No credit card required

**Netlify Free Tier:**
- 100GB bandwidth/month
- 300 build minutes/month

**Optimization Tips:**
- Optimize images (use WebP)
- Enable caching headers
- Use CDN for static assets

### Email Costs

**Resend Free Tier:**
- 100 emails/day
- 3,000 emails/month

**Optimization Tips:**
- Use transactional emails only
- Implement email queuing
- Monitor usage in dashboard

## Support and Resources

### Documentation
- Convex: https://docs.convex.dev
- Vercel: https://vercel.com/docs
- Netlify: https://docs.netlify.com
- Resend: https://resend.com/docs

### Community
- GitHub Issues: Report bugs
- GitHub Discussions: Ask questions
- Discord: (if available)

### Emergency Contacts
- Convex Status: https://status.convex.dev
- Vercel Status: https://www.vercel-status.com
- Resend Status: https://status.resend.com

---

**Last Updated:** 2025-10-25
**Maintained By:** docs-manager agent
