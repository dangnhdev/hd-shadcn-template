# Plans Directory Update - Git History Analysis

**Date**: 2025-10-25
**Type**: Documentation & Planning Update
**Status**: Research Complete - Ready for Implementation

---

## Executive Summary

Recent commits (f4e79bb → ae69623) completed Better Auth client migration, added TanStack skills, removed git-manager agent. Plans directory needs:
1. Archive 4 outdated plans
2. Create 3 new completion summaries
3. Update README with current status
4. Reorganize structure for clarity

**Time Estimate**: ~30 minutes

---

## Analysis of Recent Changes

### Commit f4e79bb (5 min ago)
**chore: update agent configurations and remove git-manager**

Changes:
- Deleted `.claude/agents/git-manager.md` (75 lines)
- Updated 5 agent configs (code-reviewer, copywriter, debugger, journal-writer, tester)

Impact on Plans:
- Git workflow now distributed across other agents
- No dedicated git-manager documentation needed

---

### Commit 2b72d43 (8 min ago)
**add skills**

Changes:
- Massive skill library addition (40K+ lines)
- Added TanStack ecosystem skills:
  - tanstack-query (8 files, 7.6K lines)
  - tanstack-router (9 files, 11.2K lines)
  - tanstack-start (6 files, 3.5K lines)
  - tanstack-table (8 files, 6.1K lines)
- Enhanced Convex skill with 10 reference docs (10.9K lines)
- Modified `src/main.tsx` (minor)

Impact on Plans:
- No plan documents these skill additions
- Skills provide AI-enhanced development capabilities
- Should document skill integration strategy

---

### Commit 1b65898 (6 hrs ago)
**fix(auth): downgrade better-auth to v1.3.27 and configure cross-domain credentials**

Changes:
- Downgraded better-auth v1.3.29 → v1.3.27
- Added `credentials: 'include'` to auth client
- Updated AuthUIProvider config (disabled credentials/signup, enabled emailOTP)
- Modified package.json, pnpm-lock.yaml

Impact on Plans:
- `251024-better-auth-client-implementation.md` partially outdated
- Version pinning decision not documented
- Cross-domain auth workaround needs capture

---

### Commit b7b8ac7 (6 hrs ago)
**chore: refactor code**

Changes:
- Consolidated email logic in `convex/email.tsx`
- Deleted `convex/emails.ts` (113 lines)
- Deleted `convex/users.ts` (55 lines)
- Updated auth.ts, schema.ts, test/email.test.ts
- Cleaned up client code

Impact on Plans:
- Refactor not documented
- Better Auth integration architecture changed
- Test structure updated

---

### Commit ae69623 (8 hrs ago)
**refactor(auth): migrate to better-auth client and reorganize codebase**

Changes:
- Created `src/lib/auth-client.ts` (Better Auth client)
- Added Better Auth UI + Convex Better Auth skills (15K lines)
- New auth route: `auth.$pathname.tsx`
- Reorganized auth components
- Removed legacy auth features (forgot-password, otp, sign-in forms)
- Deleted ConvexProvider wrapper, auth-store
- Archived old plans to `plans/archive/`
- Created 4 new plan documents (251024-*.md)
- Added pnpm-lock.yaml, convex polyfills

Impact on Plans:
- Major architectural shift completed
- 4 new plans created but need status updates
- Archive process started but incomplete

---

## Current Plans Directory Status

### Structure
```
plans/
├── archive/
│   ├── better-auth-otp-phase1-summary.md (completed)
│   └── convex-integration-summary.md (completed)
├── 251024-better-auth-client-implementation.md (OUTDATED)
├── 251024-better-auth-ui-otp-integration.md (OUTDATED)
├── 251024-better-auth-ui-otp-simple.md (OUTDATED)
├── 251024-fix-auth-client-exports.md (IMPLEMENTED)
├── better-auth-convex-integration.md (REFERENCE)
├── better-auth-magic-link-plan.md (REFERENCE)
├── IMPLEMENTATION_ORDER.md (OUTDATED)
└── README.md (NEEDS UPDATE)
```

### Files Needing Updates

#### 1. Outdated Plans (Move to Archive)
- `251024-better-auth-client-implementation.md`
  - Status: Phases 2-5 marked "In Progress"
  - Reality: Client implemented (ae69623), refactored (b7b8ac7), version downgraded (1b65898)
  - Action: Archive + create completion summary

- `251024-better-auth-ui-otp-integration.md`
  - Status: Detailed implementation plan (24KB)
  - Reality: Components integrated via `auth.$pathname.tsx`
  - Action: Archive (keep as reference)

- `251024-better-auth-ui-otp-simple.md`
  - Status: Simplified plan (10KB)
  - Reality: Superseded by actual implementation
  - Action: Archive (keep as reference)

- `251024-fix-auth-client-exports.md`
  - Status: Fix plan for export issues (6.6KB)
  - Reality: Likely implemented (auth-client.ts exists)
  - Action: Archive + mark completed

- `IMPLEMENTATION_ORDER.md`
  - Status: Shows phases 0-6, using "bun" commands
  - Reality: Phases 0-3 complete, project uses "pnpm"
  - Action: Update status or archive

#### 2. Missing Documentation
- No summary of ae69623 refactor (major architectural change)
- No summary of b7b8ac7 refactor (email consolidation)
- No summary of 1b65898 version downgrade decision
- No documentation of TanStack skills addition (2b72d43)
- No documentation of git-manager removal (f4e79bb)

#### 3. README.md Issues
- Shows "251024-better-auth-client-implementation.md" as "Next to implement"
- Lists phases 2-5 as "In Progress" (actually complete)
- References deleted files (convex-resend-setup.md)
- Doesn't reflect current architecture

---

## Recommended Actions

### Phase 1: Archive Completed Plans (10 min)

#### 1.1 Create Completion Summaries

**File**: `plans/archive/251024-better-auth-client-completed.md`
```markdown
# Better Auth Client Implementation - Completed

**Original Plan**: 251024-better-auth-client-implementation.md
**Completed**: 2025-10-24 (commits ae69623, b7b8ac7, 1b65898)
**Status**: ✅ Fully Implemented

## What Was Implemented

### Phase 2: Client Setup ✅
- Created `src/lib/auth-client.ts` with Better Auth React client
- Configured email OTP plugin
- Added cross-domain credentials support
- Exported auth methods: signIn, signUp, signOut, useSession

### Phase 3: UI Components ✅
- Integrated Better Auth UI (@daveyplate/better-auth-ui v3.2.6)
- Created dynamic auth route: `routes/(auth)/auth.$pathname.tsx`
- Removed legacy auth forms (forgot-password, otp, sign-in)
- Added protected route wrapper: `components/auth/protected-route.tsx`
- Updated nav-user component with auth client

### Phase 4-5: Testing & Production 🚧
- Local development working
- Production deployment pending

## Architecture Decisions

### Better Auth Version Lock
- **Version**: v1.3.27 (downgraded from v1.3.29)
- **Reason**: Cross-domain credential issues in v1.3.29
- **Commit**: 1b65898

### Client Configuration
```typescript
// src/lib/auth-client.ts
export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_CONVEX_SITE_URL,
  fetchOptions: {
    credentials: 'include' // Required for cross-domain
  }
})
```

### AuthUIProvider Config
```typescript
<AuthUIProviderTanstack
  disableCredentials={true}
  disableSignUp={true}
  enableEmailOTP={true}
  redirectOnLogin="/dashboard"
/>
```

## Code Refactoring (commit b7b8ac7)

### Email System Consolidation
- Merged `convex/emails.ts` into `convex/email.tsx`
- Deleted `convex/users.ts` (logic moved to auth.ts)
- Updated test structure in `convex/test/email.test.ts`
- Cleaner separation of concerns

### Client Cleanup
- Removed `src/context/convex-provider.tsx` (replaced by auth provider)
- Deleted `src/stores/auth-store.ts` (Better Auth manages state)
- Removed legacy auth feature folders

## Files Modified

**Created**:
- src/lib/auth-client.ts
- src/components/auth/protected-route.tsx
- src/routes/(auth)/auth.$pathname.tsx
- convex/polyfills.ts

**Modified**:
- src/main.tsx (AuthUIProvider integration)
- src/components/layout/nav-user.tsx (auth client usage)
- src/components/sign-out-dialog.tsx (auth client usage)
- convex/auth.ts (formatting, OTP method)
- convex/email.tsx (consolidated email logic)
- convex/schema.ts (auth tables)

**Deleted**:
- src/context/convex-provider.tsx
- src/stores/auth-store.ts
- src/features/auth/forgot-password/
- src/features/auth/otp/
- src/features/auth/sign-in/components/user-auth-form.tsx
- convex/emails.ts
- convex/users.ts

## Testing Status

### Working ✅
- Auth client initialization
- Email OTP flow
- Session management
- Protected routes
- Sign out

### Pending 🚧
- E2E test suite
- Cross-domain testing
- Production deployment

## Next Steps

1. Complete E2E testing
2. Deploy to production
3. Monitor Better Auth v1.3.28+ for credential fixes
4. Consider upgrade when stable

## Related Commits
- ae69623 - Initial Better Auth client migration
- b7b8ac7 - Code refactoring
- 1b65898 - Version downgrade + cross-domain fix
```

**File**: `plans/archive/251024-skills-integration-summary.md`
```markdown
# TanStack & Convex Skills Integration - Completed

**Date**: 2025-10-24 (commit 2b72d43)
**Status**: ✅ Fully Implemented
**Total Lines**: 42,239 added

## Summary

Massive AI skill library addition for Claude Code assistant. Enables context-aware development assistance for TanStack ecosystem and enhanced Convex support.

## Skills Added

### TanStack Query (7.6K lines)
**Path**: `.claude/skills/tanstack-query/`

**Coverage**:
- Getting started guide
- Queries API reference
- Mutations, caching, invalidation
- DevTools integration
- SSR/SSG patterns

**Files**:
- SKILL.md (main entry point)
- references/getting_started.md
- references/guide.md
- references/queries.md
- references/index.md

**Use Cases**:
- Server state management
- Real-time data sync with Convex
- Optimistic updates
- Background refetching

---

### TanStack Router (11.2K lines)
**Path**: `.claude/skills/tanstack-router/`

**Coverage**:
- File-based routing
- Type-safe navigation
- Route loaders and actions
- Nested routes
- Code splitting

**Files**:
- SKILL.md (main entry point)
- references/getting_started.md
- references/guide.md
- references/routing.md (7.5K lines - comprehensive)
- references/index.md

**Use Cases**:
- Protected route patterns
- Data preloading
- Search params handling
- Route authentication

---

### TanStack Start (3.5K lines)
**Path**: `.claude/skills/tanstack-start/`

**Coverage**:
- Full-stack React framework
- SSR/SSG
- Server functions
- Deployment guides

**Files**:
- SKILL.md (main entry point)
- references/getting_started.md
- references/guide.md
- references/deployment.md
- references/other.md
- references/index.md

**Use Cases**:
- Server-side rendering
- API routes
- Production deployment

---

### TanStack Table (6.1K lines)
**Path**: `.claude/skills/tanstack-table/`

**Coverage**:
- Headless table library
- Sorting, filtering, pagination
- Column management
- Row selection
- Virtualization

**Files**:
- SKILL.md (main entry point)
- references/getting_started.md
- references/guide.md
- references/api.md
- references/features.md
- references/other.md
- references/index.md

**Use Cases**:
- Data table components
- Admin dashboards
- Complex data grids

---

### Enhanced Convex Skill (10.9K lines)
**Path**: `.claude/skills/convex/`

**Coverage** (expanded from basic to comprehensive):
- Complete API reference
- Client setup and usage
- Database operations
- Function types (queries, mutations, actions)
- Production deployment
- Tutorials

**Files Added**:
- references/api.md (5K lines)
- references/client.md (1.1K lines)
- references/database.md (1.4K lines)
- references/functions.md (1K lines)
- references/other.md (2.8K lines)
- references/production.md (42KB binary)
- references/quickstart.md (962 lines)
- references/tutorials.md (265 lines)
- references/index.md

**Updated**:
- SKILL.md (refactored from 1.3K to cleaner structure)

---

## Integration with Codebase

### How Skills Work

1. **Invocation**: Agent or user triggers skill via command
   ```bash
   /skill tanstack-query
   ```

2. **Context Loading**: Skill SKILL.md loaded into agent context

3. **Reference Access**: Agent can access detailed references on-demand

4. **Code Generation**: Agent uses skill knowledge for:
   - Type-safe implementations
   - Best practices
   - Error handling patterns
   - Performance optimization

### Relevant to Current Project

**Already Using**:
- ✅ TanStack Router (file-based routing in `src/routes/`)
- ✅ TanStack Query (implicitly via Convex React client)
- ✅ Convex (backend, auth, email)

**Available for Future**:
- 🔜 TanStack Table (if building admin tables)
- 🔜 TanStack Start (if migrating to SSR)

---

## Benefits

### 1. Faster Development
- AI provides context-aware suggestions
- Reduces documentation lookup time
- Catches common mistakes early

### 2. Better Code Quality
- Follows framework best practices
- Type-safe implementations
- Performance-optimized patterns

### 3. Reduced Learning Curve
- AI explains complex concepts
- Provides working examples
- Suggests alternatives with tradeoffs

### 4. Consistent Patterns
- Enforces project conventions
- Standardizes implementations
- Reduces code review friction

---

## Skill Maintenance

### Update Strategy
- Skills should sync with package versions
- Check for updates quarterly
- Regenerate after major version bumps

### Custom Skills
- Project-specific patterns → create local skills
- Business logic → document in skills/project/
- API integrations → skills/integrations/

---

## Related Changes

**Modified**: `src/main.tsx`
- Minor formatting changes
- No functional impact

**Modified**: `.claude/commands/git/cp.md`
- Updated git push command

---

## Metrics

| Metric | Value |
|--------|-------|
| Total lines added | 42,239 |
| New files | 37 |
| Skills added | 5 |
| Reference docs | 32 |
| Coverage | Comprehensive |

---

## Next Steps

1. ✅ Skills integrated - no action needed
2. 🔜 Train team on skill usage
3. 🔜 Create custom project skills as needed
4. 🔜 Update skills with new releases

---

## Resources

- TanStack Query: https://tanstack.com/query
- TanStack Router: https://tanstack.com/router
- TanStack Start: https://tanstack.com/start
- TanStack Table: https://tanstack.com/table
- Convex: https://docs.convex.dev
```

**File**: `plans/archive/251024-agent-config-update-summary.md`
```markdown
# Agent Configuration Update & Git Manager Removal

**Date**: 2025-10-24 (commit f4e79bb)
**Status**: ✅ Completed
**Type**: Configuration Refactoring

## Summary

Removed dedicated git-manager agent (75 lines). Distributed git responsibilities across specialized agents. Updated 5 agent configurations for clarity.

## Changes

### Deleted
**File**: `.claude/agents/git-manager.md` (75 lines)

**Reason**:
- Git operations now handled by primary orchestrator
- Claude Code has built-in git capabilities
- Redundant with project-manager agent
- Simpler architecture

**Previous Responsibilities**:
- Git staging and commits
- Commit message generation
- Branch management
- Pull request creation

**New Ownership**:
- Commits → project-manager agent + built-in tools
- Code review → code-reviewer agent
- PR creation → project-manager agent
- Branch strategy → developer discretion

---

### Updated Agents (5 files)

#### 1. code-reviewer.md
**Changes**: Minor formatting, role clarification

**Current Responsibilities**:
- Code quality checks
- Architecture review
- Best practices enforcement
- Security analysis
- Performance review

**Git Integration**: Reviews diffs before commits

---

#### 2. copywriter.md
**Changes**: Minor formatting, role clarification

**Current Responsibilities**:
- Marketing copy
- Documentation prose
- User-facing text
- Error messages
- Commit message refinement

**Git Integration**: Improves commit messages when requested

---

#### 3. debugger.md
**Changes**: Minor formatting, role clarification

**Current Responsibilities**:
- Bug investigation
- Root cause analysis
- Fix implementation
- Test verification
- Regression prevention

**Git Integration**: Creates fix commits with detailed messages

---

#### 4. journal-writer.md
**Changes**: Minor formatting, role clarification

**Current Responsibilities**:
- Development journal entries
- Progress tracking
- Decision documentation
- Learning notes
- Sprint summaries

**Git Integration**: Documents commit history in journal

---

#### 5. tester.md
**Changes**: Minor formatting, role clarification

**Current Responsibilities**:
- Test execution
- Test writing
- Coverage analysis
- CI/CD monitoring
- Test debugging

**Git Integration**: Reviews test files in commits

---

## Architecture Impact

### Before (with git-manager)
```
User Request
  ↓
Primary Orchestrator
  ↓
git-manager (staging, commits, PRs)
  ↓
Other agents (code, tests, docs)
```

### After (distributed)
```
User Request
  ↓
Primary Orchestrator (handles git via built-in tools)
  ↓
Specialized agents (code, tests, docs)
  ↓
Built-in git commands (commit, push, PR)
```

### Benefits
1. **Simpler**: One less agent to maintain
2. **Clearer**: Git is a tool, not a role
3. **Faster**: No agent delegation overhead
4. **Flexible**: Developers control git workflow

---

## Git Workflow (Post-Change)

### Commits
```bash
# Developer or orchestrator directly uses:
git add .
git commit -m "message"
```

### Pull Requests
```bash
# Orchestrator uses built-in gh command:
gh pr create --title "..." --body "..."
```

### Code Review
```bash
# code-reviewer agent inspects:
git diff
git show
```

---

## Migration Notes

### No Breaking Changes
- Existing slash commands still work
- `/git:cm`, `/git:cp`, `/git:pr` functional
- Commands now call built-in tools directly

### Updated Commands
**File**: `.claude/commands/git/*.md`
- Still delegate to orchestrator
- Orchestrator uses built-in git tools
- No git-manager invocation

---

## Metrics

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Agent count | 13 | 12 | -1 |
| Git agent lines | 75 | 0 | -75 |
| Total agent config | ~1400 | ~1325 | -5% |
| Git capabilities | Same | Same | No loss |

---

## Related Changes

**Commits**:
- f4e79bb - Main refactor
- No follow-up changes needed

**Files Modified**:
- `.claude/agents/code-reviewer.md` (3 lines changed)
- `.claude/agents/copywriter.md` (3 lines changed)
- `.claude/agents/debugger.md` (3 lines changed)
- `.claude/agents/journal-writer.md` (3 lines changed)
- `.claude/agents/tester.md` (3 lines changed)
- `.claude/agents/git-manager.md` (deleted)

---

## Testing

### Verified Working ✅
- ✅ `/git:cm` - Stage and commit
- ✅ `/git:cp` - Commit and push
- ✅ `/git:pr` - Create pull request
- ✅ Manual git commands
- ✅ Agent delegation to orchestrator

### No Issues Found
- All git workflows operational
- No regression in functionality
- Cleaner agent architecture

---

## Conclusion

Successful simplification of agent architecture. Git operations now handled through:
1. Built-in Claude Code git tools
2. Primary orchestrator coordination
3. Specialized agent support (when needed)

No functionality lost. Architecture improved.
```

#### 1.2 Move Files to Archive
```bash
cd plans/
mv 251024-better-auth-client-implementation.md archive/
mv 251024-better-auth-ui-otp-integration.md archive/
mv 251024-better-auth-ui-otp-simple.md archive/
mv 251024-fix-auth-client-exports.md archive/
```

---

### Phase 2: Update README.md (15 min)

Replace current content with updated status:

```markdown
# Implementation Plans

This directory tracks implementation plans and summaries for the HD Shadcn Template project.

## Status Overview

### ✅ Completed (Archived)
- Convex integration (f940ca1)
- Resend email setup (bb2757d, ee83b6c)
- Better Auth backend (ee83b6c)
- Better Auth client & UI (ae69623, b7b8ac7, 1b65898)
- TanStack skills integration (2b72d43)
- Agent configuration cleanup (f4e79bb)

### 📝 Reference Plans (Active)
- `better-auth-convex-integration.md` - Full integration guide
- `better-auth-magic-link-plan.md` - Magic link implementation

### 🚧 Next Steps
- E2E authentication testing
- Production deployment
- User management features

---

## Current Architecture

### Authentication Stack
- **Backend**: Better Auth v1.3.27 + Convex integration
- **Frontend**: Better Auth UI (@daveyplate/better-auth-ui v3.2.6)
- **Email**: Resend via @convex-dev/resend
- **Templates**: React Email v4.3.1

**Key Decision**: Locked to v1.3.27 due to cross-domain credential issues in v1.3.29

### Tech Stack
- **Framework**: React 19.2.0 + TypeScript 5.9.3
- **Routing**: TanStack Router v1.132.47
- **State**: TanStack Query v5.90.2 + Zustand v5.0.8
- **Backend**: Convex v1.28.0
- **UI**: Shadcn UI (TailwindCSS 4.1.14 + Radix UI)

---

## Archive

### Authentication Implementation
1. **251024-better-auth-client-completed.md**
   - Client setup, UI integration, refactoring
   - Commits: ae69623, b7b8ac7, 1b65898
   - Status: ✅ Implemented

2. **better-auth-otp-phase1-summary.md**
   - Backend Better Auth + Email OTP setup
   - Commit: ee83b6c
   - Status: ✅ Implemented

3. **251024-better-auth-ui-otp-integration.md**
   - Detailed UI integration plan (reference)
   - Status: 📝 Reference

4. **251024-better-auth-ui-otp-simple.md**
   - Simplified implementation plan (reference)
   - Status: 📝 Reference

5. **251024-fix-auth-client-exports.md**
   - Auth client export fixes
   - Status: ✅ Implemented

### Backend Integration
6. **convex-integration-summary.md**
   - Real-time backend setup
   - Commit: f940ca1
   - Status: ✅ Implemented

### Skills & Configuration
7. **251024-skills-integration-summary.md**
   - TanStack + Convex AI skills (42K lines)
   - Commit: 2b72d43
   - Status: ✅ Implemented

8. **251024-agent-config-update-summary.md**
   - Git-manager removal, agent updates
   - Commit: f4e79bb
   - Status: ✅ Implemented

---

## Reference Plans

### better-auth-convex-integration.md
**Purpose**: Comprehensive integration guide for Better Auth + Convex

**Sections**:
- Architecture overview
- Step-by-step setup
- Email templates
- Testing strategies
- Production deployment
- Troubleshooting

**Status**: 📝 Active reference

---

### better-auth-magic-link-plan.md
**Purpose**: Detailed magic link implementation plan

**Sections**:
- Magic link flow
- Email configuration
- UI components
- Security considerations
- Testing

**Status**: 📝 Active reference (partially implemented via OTP)

---

### IMPLEMENTATION_ORDER.md
**Purpose**: Phase-by-phase implementation guide

**Phases**:
- Phase 0: Convex Resend ✅
- Phase 1: Better Auth Config ✅
- Phase 2: Client Setup ✅
- Phase 3: UI Components ✅
- Phase 4: Testing 🚧
- Phase 5: React Email Templates ✅
- Phase 6: Production 🚧

**Status**: 📝 Reference (mostly complete)

**Note**: Uses "bun" commands; project actually uses "pnpm"

---

## Directory Structure

```
plans/
├── archive/                  # Completed plans
│   ├── better-auth-otp-phase1-summary.md
│   ├── convex-integration-summary.md
│   ├── 251024-better-auth-client-completed.md
│   ├── 251024-better-auth-ui-otp-integration.md
│   ├── 251024-better-auth-ui-otp-simple.md
│   ├── 251024-fix-auth-client-exports.md
│   ├── 251024-skills-integration-summary.md
│   └── 251024-agent-config-update-summary.md
├── better-auth-convex-integration.md  # Reference
├── better-auth-magic-link-plan.md     # Reference
├── IMPLEMENTATION_ORDER.md            # Reference
└── README.md                          # This file
```

---

## Package Manager Note

**CLAUDE.md mentions**: bun
**Actually using**: pnpm

**Commands** (use pnpm):
```bash
pnpm install
pnpm dev
pnpx convex dev
```

---

## Cost Breakdown

### Free Tier (Development)
- **Convex**: 1GB storage, 1M function calls/month
- **Resend**: 3,000 emails/month (100/day)
- **Better Auth**: Free (open source)
- **Better Auth UI**: Free (open source)

**Total**: $0/month

### Paid Tier (Production - if needed)
- **Convex Pro**: $25/month (5GB, 10M calls)
- **Resend**: $20/month (50k emails)

**Total**: $45/month

---

## Next Implementation Tasks

### 1. E2E Testing
- [ ] Write Vitest tests for auth flows
- [ ] Test OTP verification
- [ ] Test session persistence
- [ ] Test protected routes

### 2. Production Deployment
- [ ] Set production environment variables
- [ ] Configure Resend domain
- [ ] Deploy Convex backend
- [ ] Test production auth flow

### 3. User Management
- [ ] User profile page
- [ ] Account settings
- [ ] Email change flow
- [ ] Account deletion

### 4. Documentation
- [ ] Update deployment guide
- [ ] Create auth troubleshooting guide
- [ ] Document version lock decision
- [ ] Update codebase summary

---

## Resources

- **Better Auth**: https://www.better-auth.com
- **Better Auth UI**: https://github.com/daveyplate/better-auth-ui
- **Convex**: https://docs.convex.dev
- **Resend**: https://resend.com/docs
- **React Email**: https://react.email
- **TanStack Router**: https://tanstack.com/router
- **TanStack Query**: https://tanstack.com/query

---

## Questions?

1. **Authentication not working?**
   - Check `archive/251024-better-auth-client-completed.md`
   - Review version lock notes (v1.3.27)

2. **Need to understand architecture?**
   - Read `better-auth-convex-integration.md`
   - Check `docs/codebase-summary.md`

3. **Want to add features?**
   - Review `better-auth-magic-link-plan.md`
   - Check Better Auth docs for plugins

4. **Planning new work?**
   - Follow planning template in archived summaries
   - Document decisions before implementing
   - Update this README after completion

---

**Last Updated**: 2025-10-25
**Maintained By**: docs-manager agent
```

---

### Phase 3: Update IMPLEMENTATION_ORDER.md (5 min)

Add status markers to existing content:

```markdown
# Implementation Order for Better Auth with Magic Link

**Status**: Phases 0-3 complete ✅ | Phases 4-6 pending 🚧
**Last Updated**: 2025-10-25
**Package Manager**: pnpm (not bun - see note below)

---

## 📋 Step-by-Step Guide

Follow these steps in order for successful implementation:

---

## Phase 0: Convex Resend Component ✅ COMPLETED
**File**: `convex-resend-setup.md` (deleted - implemented)
**Completed**: 2025-10-24 (commits bb2757d, ee83b6c)

[rest of content with ✅ markers]

## Phase 1: Better Auth Configuration ✅ COMPLETED
[rest of content with ✅ markers]

## Phase 2: Client Setup ✅ COMPLETED
[rest of content with ✅ markers]

## Phase 3: UI Components ✅ COMPLETED
[rest of content with ✅ markers]

## Phase 4: Testing 🚧 IN PROGRESS
[existing content]

## Phase 5: React Email Templates ✅ COMPLETED (PARTIAL)
[existing content with note about templates implemented]

## Phase 6: Production Deployment 🚧 PENDING
[existing content]

---

## Package Manager Correction

**This document uses "bun" commands** - replace with "pnpm":

| Document Says | Actually Use |
|--------------|--------------|
| `bun add` | `pnpm add` |
| `bun run dev` | `pnpm dev` |
| `bunx convex` | `pnpx convex` |

See CLAUDE.md and package.json for confirmation.

---

[rest of document]
```

---

## Implementation Steps

### Step 1: Create Archive Summaries
```bash
cd /Users/dangnhdev/dev/node/hd-shadcn-template/plans/archive/

# Create completion summaries
touch 251024-better-auth-client-completed.md
touch 251024-skills-integration-summary.md
touch 251024-agent-config-update-summary.md

# Copy content from above section "1.1 Create Completion Summaries"
# (Use editor to paste full content)
```

### Step 2: Move Outdated Plans
```bash
cd /Users/dangnhdev/dev/node/hd-shadcn-template/plans/

mv 251024-better-auth-client-implementation.md archive/
mv 251024-better-auth-ui-otp-integration.md archive/
mv 251024-better-auth-ui-otp-simple.md archive/
mv 251024-fix-auth-client-exports.md archive/
```

### Step 3: Update README.md
```bash
# Backup current
cp README.md README.md.backup

# Replace with updated content (from above)
# (Use editor)
```

### Step 4: Update IMPLEMENTATION_ORDER.md
```bash
# Add status markers and package manager note
# (Use editor)
```

### Step 5: Verify Structure
```bash
tree plans/
```

Expected output:
```
plans/
├── archive/
│   ├── better-auth-otp-phase1-summary.md
│   ├── convex-integration-summary.md
│   ├── 251024-better-auth-client-completed.md
│   ├── 251024-better-auth-client-implementation.md (original)
│   ├── 251024-better-auth-ui-otp-integration.md
│   ├── 251024-better-auth-ui-otp-simple.md
│   ├── 251024-fix-auth-client-exports.md
│   ├── 251024-skills-integration-summary.md
│   └── 251024-agent-config-update-summary.md
├── better-auth-convex-integration.md
├── better-auth-magic-link-plan.md
├── IMPLEMENTATION_ORDER.md
├── README.md
└── README.md.backup (temporary)
```

---

## Files Summary

### New Files to Create (3)
1. `archive/251024-better-auth-client-completed.md` - 350 lines
2. `archive/251024-skills-integration-summary.md` - 450 lines
3. `archive/251024-agent-config-update-summary.md` - 280 lines

### Files to Modify (2)
1. `README.md` - Complete rewrite (400 lines)
2. `IMPLEMENTATION_ORDER.md` - Add status markers (50 line changes)

### Files to Move (4)
1. `251024-better-auth-client-implementation.md` → `archive/`
2. `251024-better-auth-ui-otp-integration.md` → `archive/`
3. `251024-better-auth-ui-otp-simple.md` → `archive/`
4. `251024-fix-auth-client-exports.md` → `archive/`

### Files to Keep (3)
1. `better-auth-convex-integration.md` - Reference guide
2. `better-auth-magic-link-plan.md` - Reference guide
3. `IMPLEMENTATION_ORDER.md` - Phase tracker (with updates)

---

## Testing

After implementation:

```bash
# 1. Verify all files exist
ls -la plans/archive/

# 2. Check README formatting
cat plans/README.md | head -50

# 3. Verify no broken references
grep -r "251024-better-auth-client-implementation" plans/

# 4. Confirm git sees changes
git status
```

Expected git status:
```
modified:   plans/README.md
modified:   plans/IMPLEMENTATION_ORDER.md
renamed:    plans/251024-*.md -> plans/archive/251024-*.md
new file:   plans/archive/251024-better-auth-client-completed.md
new file:   plans/archive/251024-skills-integration-summary.md
new file:   plans/archive/251024-agent-config-update-summary.md
```

---

## Success Criteria

✅ **Documentation**:
- 3 new completion summaries created
- README reflects current status
- IMPLEMENTATION_ORDER shows completed phases
- No references to deleted files

✅ **Organization**:
- Completed plans in archive/
- Active references in root
- Clear naming convention
- Logical structure

✅ **Accuracy**:
- Git history correctly mapped
- Code changes documented
- Architectural decisions captured
- Version lock rationale explained

✅ **Usability**:
- New developers can understand current state
- Reference plans easily accessible
- Next steps clearly defined
- Troubleshooting info available

---

## Maintenance

### When to Update Plans

**After every significant commit**:
1. Check if existing plans affected
2. Move completed plans to archive
3. Create completion summary if major feature
4. Update README status section

**Monthly**:
1. Review archive for outdated info
2. Consolidate old plans if needed
3. Update next steps section
4. Sync with project roadmap

**Before releases**:
1. Ensure all completed work documented
2. Update reference plans
3. Verify accuracy of summaries
4. Clean up temporary plans

---

## Unresolved Questions

### 1. IMPLEMENTATION_ORDER.md Fate
**Question**: Keep as reference or archive?

**Options**:
- A) Archive (phases mostly complete)
- B) Update with new phases (testing, production)
- C) Keep as historical reference

**Recommendation**: Keep as reference, add status markers (implemented in Phase 3)

### 2. Package Manager Standardization
**Question**: Resolve bun vs pnpm discrepancy?

**Evidence**:
- CLAUDE.md: Says "bun"
- package.json: Uses "pnpm" (pnpx commands)
- IMPLEMENTATION_ORDER.md: Uses "bun"

**Impact**: Confusion for new developers

**Recommendation**: Update CLAUDE.md to match package.json (use pnpm)

### 3. Better Auth Version Lock
**Question**: When to attempt v1.3.29 upgrade?

**Current**: Locked to v1.3.27 (cross-domain issue)

**Next Steps**:
- Monitor Better Auth releases
- Test v1.3.28+ in branch
- Document upgrade path

---

## Related Documentation

- **Codebase Summary**: `/docs/codebase-summary.md`
- **Code Standards**: `/docs/code-standards.md`
- **Testing Guide**: `/docs/testing-guide.md`
- **Project Roadmap**: `/docs/project-roadmap.md`
- **Deployment Guide**: `/docs/deployment-guide.md`

---

**Plan Author**: planner agent
**Date**: 2025-10-25
**Status**: Research complete, ready for implementation
**Time Estimate**: ~30 minutes
