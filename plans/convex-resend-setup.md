# Convex Resend Component Setup Guide

## Quick Reference

This is a standalone guide for setting up the `@convex-dev/resend` component **before** integrating Better Auth.

---

## Why Use @convex-dev/resend?

Instead of using the standalone `resend` npm package, the Convex Resend component provides:

✅ **Built-in queueing**: Emails are queued and processed reliably
✅ **Automatic retries**: Failed sends retry automatically
✅ **Rate limiting**: Prevents API overuse
✅ **Idempotency**: Prevents duplicate emails
✅ **Durable execution**: Guaranteed delivery
✅ **Webhook integration**: Track delivery status
✅ **Native Convex**: Works seamlessly with Convex functions

---

## Installation

### 1. Install Package

```bash
bun add @convex-dev/resend
```

### 2. Configure Convex App

**`convex/convex.config.ts`** (CREATE or UPDATE)
```typescript
import { defineApp } from "convex/server";
import resend from "@convex-dev/resend/convex.config";

const app = defineApp();
app.use(resend);

export default app;
```

### 3. Set Environment Variables

```bash
# Required
bunx convex env set RESEND_API_KEY re_your_api_key_here

# Optional (for webhook tracking)
bunx convex env set RESEND_WEBHOOK_SECRET whsec_your_webhook_secret
```

---

## Basic Usage

### Create Email Sending Function

**`convex/emails.ts`** (NEW)
```typescript
import { components } from "./_generated/api";
import { Resend } from "@convex-dev/resend";
import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

// Initialize Resend component
export const resend = new Resend(components.resend, {});

// Send a test email
export const sendTestEmail = internalMutation({
  args: {
    to: v.string(),
    subject: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    await resend.sendEmail(ctx, {
      from: "onboarding@resend.dev", // Use your verified domain
      to: args.to,
      subject: args.subject,
      html: `<p>${args.message}</p>`,
    });
  },
});
```

### Test the Function

```bash
bunx convex run emails:sendTestEmail '{
  "to": "your-email@example.com",
  "subject": "Test Email",
  "message": "Hello from Convex!"
}'
```

---

## With React Email (Recommended)

### 1. Install React Email

```bash
bun add react-email @react-email/components
```

### 2. Create Email Template

**`emails/welcome.tsx`** (NEW)
```tsx
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Button,
} from '@react-email/components';

interface WelcomeEmailProps {
  name: string;
  actionUrl: string;
}

export default function WelcomeEmail({ name, actionUrl }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'Arial, sans-serif' }}>
        <Container>
          <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>
            Welcome, {name}!
          </Text>
          <Text>Thanks for signing up. Click below to get started:</Text>
          <Button href={actionUrl} style={{ padding: '12px 24px', backgroundColor: '#000', color: '#fff' }}>
            Get Started
          </Button>
        </Container>
      </Body>
    </Html>
  );
}
```

### 3. Update Email Function

**`convex/emails.ts`** (UPDATE)
```typescript
'use node'; // Required for React Email

import { components } from "./_generated/api";
import { Resend } from "@convex-dev/resend";
import { internalAction } from "./_generated/server"; // Use internalAction with 'use node'
import { v } from "convex/values";
import { render } from "@react-email/render";
import WelcomeEmail from "../emails/welcome";

export const resend = new Resend(components.resend, {});

export const sendWelcomeEmail = internalAction({
  args: {
    to: v.string(),
    name: v.string(),
    actionUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const emailHtml = await render(
      WelcomeEmail({
        name: args.name,
        actionUrl: args.actionUrl,
      })
    );

    await resend.sendEmail(ctx, {
      from: "onboarding@resend.dev",
      to: args.to,
      subject: `Welcome, ${args.name}!`,
      html: emailHtml,
    });
  },
});
```

**Important**: When using React Email:
- Add `'use node'` directive at the top
- Change from `internalMutation` to `internalAction`
- Use `await render()` to convert React component to HTML

---

## Webhook Setup (Optional but Recommended)

Webhooks allow you to track email delivery, bounces, and complaints.

### 1. Add Webhook Route

**`convex/http.ts`** (UPDATE)
```typescript
import { httpRouter } from "convex/server";
import { components } from "./_generated/api";

const http = httpRouter();

// Add Resend webhook handler
http.route({
  path: "/resend/webhook",
  method: "POST",
  handler: components.resend.webhook,
});

export default http;
```

### 2. Configure in Resend Dashboard

1. Go to https://resend.com/webhooks
2. Click "Add Webhook"
3. Enter URL: `https://your-deployment.convex.site/resend/webhook`
4. Select events: `email.delivered`, `email.bounced`, `email.complained`
5. Copy webhook secret
6. Set in Convex:
   ```bash
   bunx convex env set RESEND_WEBHOOK_SECRET whsec_your_secret
   ```

### 3. Handle Webhook Events (Optional)

**`convex/emails.ts`** (UPDATE)
```typescript
import { internal } from "./_generated/api";
import { vEmailId, vEmailEvent } from "@convex-dev/resend";

export const resend = new Resend(components.resend, {
  onEmailEvent: internal.emails.handleEmailEvent,
});

export const handleEmailEvent = internalMutation({
  args: {
    id: vEmailId,
    event: vEmailEvent
  },
  handler: async (ctx, args) => {
    // Log or store email events
    console.log(`Email ${args.id} event: ${args.event.type}`);

    // Example: Update user record based on event
    if (args.event.type === "delivered") {
      // Email was successfully delivered
    } else if (args.event.type === "bounced") {
      // Email bounced - mark user email as invalid
    } else if (args.event.type === "complained") {
      // User marked as spam
    }
  },
});
```

---

## Testing

### Test in Development

**Option 1: Use Resend Test Email**
```typescript
await resend.sendEmail(ctx, {
  from: "onboarding@resend.dev",
  to: "delivered@resend.dev", // Resend test inbox
  subject: "Test",
  html: "<p>Test email</p>",
});
```

**Option 2: Check Resend Dashboard**
1. Go to https://resend.com/emails
2. View all sent emails
3. Click to see delivery status

### Test with CLI

```bash
# Send test email
bunx convex run emails:sendTestEmail '{
  "to": "your-email@example.com",
  "subject": "Test",
  "message": "Hello!"
}'
```

---

## Production Checklist

### Before Deploying

- [ ] Verify your domain with Resend
- [ ] Update `from` email to use verified domain
- [ ] Set production environment variables
- [ ] Configure webhook (optional but recommended)
- [ ] Test email delivery
- [ ] Monitor Resend dashboard for issues

### Domain Verification

1. Go to Resend dashboard → Domains
2. Add your domain (e.g., `example.com`)
3. Add DNS records (SPF, DKIM, DMARC)
4. Wait for verification (usually 5-10 minutes)
5. Update emails to use: `"Your App <noreply@example.com>"`

### Production Environment Variables

```bash
bunx convex deploy
bunx convex env set RESEND_API_KEY re_prod_xxxxxx --prod
bunx convex env set RESEND_WEBHOOK_SECRET whsec_prod_xxxxxx --prod
```

---

## Common Use Cases

### 1. Welcome Email
```typescript
export const sendWelcome = internalMutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    await resend.sendEmail(ctx, {
      from: "hello@example.com",
      to: user.email,
      subject: "Welcome!",
      html: "<h1>Welcome to our app!</h1>",
    });
  },
});
```

### 2. Password Reset (for later)
```typescript
export const sendPasswordReset = internalMutation({
  args: { email: v.string(), token: v.string() },
  handler: async (ctx, args) => {
    const resetUrl = `https://example.com/reset?token=${args.token}`;
    await resend.sendEmail(ctx, {
      from: "security@example.com",
      to: args.email,
      subject: "Reset your password",
      html: `<a href="${resetUrl}">Reset password</a>`,
    });
  },
});
```

### 3. Notification Email
```typescript
export const sendNotification = internalMutation({
  args: {
    userId: v.id("users"),
    title: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    await resend.sendEmail(ctx, {
      from: "notifications@example.com",
      to: user.email,
      subject: args.title,
      html: `<p>${args.message}</p>`,
    });
  },
});
```

---

## Troubleshooting

### Email not sending
1. Check Resend API key is correct
2. Verify environment variable is set: `bunx convex env get RESEND_API_KEY`
3. Check Convex logs: `bunx convex logs`
4. Check Resend dashboard for errors

### Webhook not working
1. Verify webhook URL is correct
2. Check webhook secret is set
3. Ensure HTTP route is configured
4. Test webhook in Resend dashboard

### Domain not verified
1. Wait 5-10 minutes after adding DNS records
2. Check DNS propagation: `dig TXT example.com`
3. Verify all required records (SPF, DKIM, DMARC)
4. Contact Resend support if issues persist

---

## Rate Limits

### Free Tier
- 100 emails per day
- 3,000 emails per month
- 1 verified domain

### Paid Tier ($20/month)
- 50,000 emails per month
- Unlimited domains
- Dedicated IP (optional)

---

## Resources

- Convex Resend Docs: https://www.convex.dev/components/resend
- GitHub Repo: https://github.com/get-convex/resend
- Resend Docs: https://resend.com/docs
- React Email: https://react.email

---

## Next Steps

After setting up Convex Resend:
1. ✅ Test email sending works
2. ✅ Set up webhook (optional)
3. ✅ Create React Email templates (optional)
4. ➡️ **Ready for Better Auth integration!**

Go back to `better-auth-magic-link-plan.md` to continue with authentication setup.
