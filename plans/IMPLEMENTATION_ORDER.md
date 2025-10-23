# Implementation Order for Better Auth with Magic Link

## 📋 Step-by-Step Guide

Follow these steps in order for successful implementation:

---

## Phase 0: Convex Resend Component (30 minutes)
**File**: `convex-resend-setup.md`

### Why First?
- Test email delivery independently
- Set up domain verification with Resend
- Configure webhooks for monitoring
- Required for Better Auth magic link

### Checklist
- [ ] Install `@convex-dev/resend`
- [ ] Configure `convex/convex.config.ts`
- [ ] Set `RESEND_API_KEY` environment variable
- [ ] Create `convex/emails.ts` with test function
- [ ] Test email sending with CLI
- [ ] Optional: Set up webhook
- [ ] Optional: Add React Email templates
- [ ] Verify domain with Resend (production)

**Test Command**:
```bash
bunx convex run emails:sendTestEmail '{
  "to": "your-email@example.com",
  "subject": "Test",
  "message": "Convex Resend works!"
}'
```

**Success Criteria**: ✅ Receive test email in inbox

---

## Phase 1: Better Auth Configuration (30 minutes)
**File**: `better-auth-magic-link-plan.md` (sections 1-5)

### Checklist
- [ ] Install `better-auth` and `@daveyplate/better-auth-ui`
- [ ] Update `convex/emails.ts` with `sendMagicLinkEmail`
- [ ] Create `convex/auth.ts` with Better Auth config
- [ ] Update `convex/http.ts` with auth routes
- [ ] Update `convex/schema.ts` with `authTables`
- [ ] Set `BETTER_AUTH_SECRET` environment variable
- [ ] Set `BETTER_AUTH_URL` environment variable

**Test Command**:
```bash
bunx convex dev
```

**Success Criteria**: ✅ No TypeScript errors, Convex syncing

---

## Phase 2: Client Setup (30 minutes)
**File**: `better-auth-magic-link-plan.md` (section 6)

### Checklist
- [ ] Create `src/lib/auth-client.ts`
- [ ] Update `src/main.tsx` with providers
- [ ] Add `ConvexAuthProvider`
- [ ] Add `AuthUIProvider`
- [ ] Test app boots without errors

**Test Command**:
```bash
bun run dev
```

**Success Criteria**: ✅ App runs, no console errors

---

## Phase 3: UI Components (45 minutes)
**File**: `better-auth-magic-link-plan.md` (section: Authentication Components)

### Checklist
- [ ] Create sign-in page with `<SignIn />` component
- [ ] Add `<UserButton />` to header/navigation
- [ ] Create protected route wrapper
- [ ] Add `<SignedIn>` / `<SignedOut>` conditional rendering
- [ ] Test responsive design
- [ ] Test dark mode

**Routes to Create**:
- `/auth/sign-in` - Sign-in page
- `/dashboard` - Protected page (example)

**Success Criteria**: ✅ Sign-in page renders, components visible

---

## Phase 4: Testing (30 minutes)

### End-to-End Test Flow

1. **Test Sign-In**:
   - [ ] Go to `/auth/sign-in`
   - [ ] Enter email address
   - [ ] Click "Send magic link"
   - [ ] Check Resend dashboard for sent email
   - [ ] Click magic link in email
   - [ ] Should redirect to dashboard

2. **Test Session Persistence**:
   - [ ] Reload page - should stay signed in
   - [ ] Close browser, reopen - should stay signed in

3. **Test Sign-Out**:
   - [ ] Click user button
   - [ ] Click "Sign Out"
   - [ ] Should redirect to sign-in page

4. **Test Protected Routes**:
   - [ ] Sign out
   - [ ] Try to access `/dashboard`
   - [ ] Should redirect to `/auth/sign-in`

5. **Test Components**:
   - [ ] `<SignedIn>` - should show when authenticated
   - [ ] `<SignedOut>` - should show when not authenticated
   - [ ] `<UserButton />` - should show user info

**Success Criteria**: ✅ All tests pass

---

## Phase 5: React Email Templates (Optional, 30 minutes)
**File**: `better-auth-magic-link-plan.md` (section: React Email Template)

### Checklist
- [ ] Install `react-email` and `@react-email/components`
- [ ] Create `emails/magic-link.tsx` template
- [ ] Update `convex/emails.ts` with `'use node'` directive
- [ ] Change to `internalAction`
- [ ] Use `await render()` for template
- [ ] Test email with new template

**Success Criteria**: ✅ Beautiful HTML emails in inbox

---

## Phase 6: Production Deployment

### Checklist

1. **Domain Verification**:
   - [ ] Verify domain with Resend
   - [ ] Add DNS records (SPF, DKIM, DMARC)
   - [ ] Wait for verification
   - [ ] Update `from` email in code

2. **Environment Variables**:
   ```bash
   bunx convex deploy
   bunx convex env set RESEND_API_KEY re_prod_xxx --prod
   bunx convex env set RESEND_WEBHOOK_SECRET whsec_prod_xxx --prod
   bunx convex env set BETTER_AUTH_SECRET $(openssl rand -base64 32) --prod
   bunx convex env set BETTER_AUTH_URL https://yourdomain.com --prod
   ```

3. **Webhook Configuration**:
   - [ ] Update webhook URL to production
   - [ ] Test webhook delivery

4. **Testing**:
   - [ ] Test magic link in production
   - [ ] Test from multiple email clients
   - [ ] Monitor Resend dashboard
   - [ ] Check Convex logs

**Success Criteria**: ✅ Production authentication working

---

## Quick Reference Commands

```bash
# Install packages
bun add @convex-dev/resend better-auth @daveyplate/better-auth-ui

# Set environment variables
bunx convex env set RESEND_API_KEY re_xxx
bunx convex env set BETTER_AUTH_SECRET $(openssl rand -base64 32)
bunx convex env set BETTER_AUTH_URL http://localhost:5173

# Test email
bunx convex run emails:sendTestEmail '{"to":"you@example.com","subject":"Test","message":"Hello"}'

# Dev mode
bunx convex dev
bun run dev

# Production deploy
bunx convex deploy
bunx convex env set RESEND_API_KEY re_prod_xxx --prod
```

---

## Troubleshooting Quick Links

| Issue | Check |
|-------|-------|
| Email not sending | `convex-resend-setup.md` → Troubleshooting |
| Magic link not working | `better-auth-magic-link-plan.md` → Troubleshooting |
| Components not rendering | Check providers in `main.tsx` |
| Session not persisting | Check `BETTER_AUTH_URL` matches your app |
| Webhook not working | Check `RESEND_WEBHOOK_SECRET` is set |

---

## Support

- Convex Discord: https://convex.dev/community
- Resend Support: https://resend.com/support
- Better Auth Docs: https://www.better-auth.com
- Better Auth UI: https://github.com/daveyplate/better-auth-ui

---

## Next: Start Implementation

Ready to start? Open `convex-resend-setup.md` and begin Phase 0!
