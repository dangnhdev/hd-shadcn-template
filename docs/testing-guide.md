# Testing Guide

## Overview

This project uses **Vitest 4.0** for testing with a focus on **integration tests** that test actual code without mocks.

## Philosophy

**No Mocking**: We test actual Convex functions against a real testing environment, not mocked implementations. This ensures our tests reflect real-world behavior.

## Setup

### Dependencies

- `vitest@4.0` - Fast unit test framework
- `@vitest/ui` - Visual testing UI
- `convex-test` - Convex integration testing utilities
- `happy-dom` - Lightweight DOM implementation for tests

### Configuration

- `vitest.config.ts` - Main Vitest configuration
- `test/setup.ts` - Global test setup with Convex testing helper

## Writing Tests

### Test Location

Place tests next to the code they test:
- Convex functions: `convex/*.test.ts`
- React components: `src/components/*.test.tsx`
- Utilities: `src/lib/*.test.ts`

### Example: Testing Convex Functions

```typescript
import { describe, it, expect } from 'vitest'
import { convexTest } from '../test/setup'
import { api } from './_generated/api'

describe('Email Functions', () => {
  it('should send test email successfully', async () => {
    const result = await convexTest.mutation(api.emails.sendTestEmail, {
      to: 'delivered@resend.dev',
      subject: 'Test',
      message: 'Hello',
    })

    expect(result).toBeDefined()
  })
})
```

### Testing Resend Emails

Use Resend's test email addresses:
- `delivered@resend.dev` - Always delivers successfully
- `bounced@resend.dev` - Always bounces
- `complained@resend.dev` - Marks as spam

## Running Tests

```bash
# Run tests in watch mode
bun test

# Run tests once
bun test:run

# Run with UI
bun test:ui

# Run with coverage
bun test:coverage
```

## Environment Requirements

### Required Environment Variables

Tests that use Convex functions require:
- `RESEND_API_KEY` - Set via `bunx convex env set RESEND_API_KEY re_xxx`
- Convex deployment must be running (`bunx convex dev`)

### Test Database

`convex-test` creates an isolated test environment that:
- Uses the same schema as your production database
- Cleans up after each test
- Doesn't affect your development or production data

## Best Practices

### 1. Test Real Behavior

✅ **Good**: Test actual Convex mutations
```typescript
await convexTest.mutation(api.emails.sendTestEmail, args)
```

❌ **Bad**: Mock the entire function
```typescript
vi.mock('./emails', () => ({ sendTestEmail: vi.fn() }))
```

### 2. Use Descriptive Test Names

```typescript
it('should send email with valid parameters')
it('should throw error for invalid email address')
it('should handle Resend API failures gracefully')
```

### 3. Test Edge Cases

- Invalid inputs
- Missing required fields
- Network failures
- Rate limiting

### 4. Keep Tests Fast

- Use `delivered@resend.dev` for quick tests
- Avoid unnecessary delays or timeouts
- Clean up resources in `afterEach`

## CI/CD Integration

Add to GitHub Actions:

```yaml
- name: Run tests
  run: bun test:run
  env:
    RESEND_API_KEY: ${{ secrets.RESEND_API_KEY }}
```

## Troubleshooting

### Tests Fail with "Cannot find module"

Make sure Convex dev server is running:
```bash
bunx convex dev
```

### Email Tests Fail

1. Verify `RESEND_API_KEY` is set in Convex
2. Check Resend dashboard for API errors
3. Ensure you're using test email addresses

### Slow Tests

- Check if Convex deployment is responsive
- Verify network connectivity
- Consider using Resend test mode

## Coverage Goals

- **Functions**: 80%+ coverage
- **Statements**: 80%+ coverage
- **Branches**: 70%+ coverage
- **Lines**: 80%+ coverage

View coverage report:
```bash
bun test:coverage
```

Then open `coverage/index.html` in your browser.

## Resources

- [Vitest Documentation](https://vitest.dev)
- [Convex Testing Guide](https://docs.convex.dev/testing)
- [Resend Testing](https://resend.com/docs/send-with-nodejs)
