# Shadcn Template Cleanup Plan

## Objective
Clean up the shadcn starter template by removing RTL features, Team/Workspace functionality, and demo components to create a lean, personal starter template.

## User Decisions
- ❌ Remove Clerk authentication (will use Better Auth + Convex instead)
- ❌ Remove all demo pages (tasks, apps, chats, users)
- ❌ Remove RTL (Right-to-Left) support
- ❌ Remove Team/Workspace switcher

---

## 1. Remove Clerk Authentication

### Files to Delete:
- `src/routes/clerk/` (entire directory)
- All Clerk-related route files

### Files to Modify:

**`src/main.tsx`:**
- Remove all Clerk imports
- Remove Clerk providers
- Will be replaced with Better Auth later

**`src/components/layout/data/sidebar-data.ts`:**
- Remove Clerk navigation items from sidebar
- Remove "Secured by Clerk" section

**`src/stores/auth-store.ts`** (if exists):
- Review and remove Clerk-specific code

### Dependencies to Remove:
- `@clerk/clerk-react` from package.json

### Routes to Delete:
- `src/routes/clerk/_authenticated/route.tsx`
- `src/routes/clerk/_authenticated/user-management.tsx`
- `src/routes/clerk/route.tsx`
- `src/routes/clerk/(auth)/route.tsx`
- `src/routes/clerk/(auth)/sign-in.tsx`
- `src/routes/clerk/(auth)/sign-up.tsx`

---

## 2. Remove RTL Features

### Files to Delete:
- `src/context/direction-provider.tsx`
- `src/assets/custom/icon-dir.tsx`

### Files to Modify:

**`src/main.tsx`:**
- Remove `DirectionProvider` import (line 13)
- Remove `<DirectionProvider>` wrapper (lines 96-98)

**`src/components/config-drawer.tsx`:**
- Remove `useDirection` import (line 15)
- Remove `IconDir` import (line 4)
- Remove `resetDir` from handleReset (lines 32, 38)
- Remove entire `DirConfig` component (lines 314-354)
- Remove `<DirConfig />` usage (line 67)

### Dependencies to Remove:
- `@radix-ui/react-direction` from package.json

### UI Components (Optional - RTL-specific code):
If no RTL needed, can update these back to standard shadcn versions:
- alert-dialog, calendar, command, dialog, dropdown-menu
- select, table, sheet, sidebar, switch

---

## 3. Remove Team/Workspace Features

### Files to Delete:
- `src/components/layout/team-switcher.tsx`

### Files to Modify:

**`src/components/layout/app-sidebar.tsx`:**
- Remove `TeamSwitcher` import (line 13)
- Remove `<TeamSwitcher teams={sidebarData.teams} />` (line 20)
- Uncomment `AppTitle` import and usage (lines 9, 24)

**`src/components/layout/data/sidebar-data.ts`:**
- Remove `teams` array from `sidebarData` (lines 34-50)
- Update type definition in `src/components/layout/types.ts` to make teams optional or remove it

---

## 4. Remove Demo Pages

### Routes to Delete:
- `src/routes/_authenticated/tasks/index.tsx`
- `src/routes/_authenticated/apps/index.tsx`
- `src/routes/_authenticated/chats/index.tsx`
- `src/routes/_authenticated/users/index.tsx`

### Features to Delete:
- `src/features/tasks/` (entire directory)
- `src/features/apps/` (entire directory)
- `src/features/chats/` (entire directory)
- `src/features/users/` (entire directory)

### Files to Modify:

**`src/components/layout/data/sidebar-data.ts`:**
Remove from navGroups:
- Tasks item
- Apps item
- Chats item
- Users item

Keep:
- Dashboard (simplified)
- Auth pages (sign-in, sign-up - will update for Better Auth)
- Error pages (useful templates)
- Settings pages (useful templates)
- Help Center

---

## 5. Clean Dashboard Demo Content

**`src/features/dashboard/index.tsx`:**
- Keep the page structure
- Remove or simplify demo analytics/charts components
- Replace with a simple "Welcome" or starter content

Option: Keep as-is for reference, or simplify to basic layout.

---

## 6. Update README

**`README.md`:**
- Update project description
- Remove RTL support mention
- Update features list
- Update installation/setup instructions
- Personalize for your use case

---

## 7. Clean Dependencies

Remove unused dependencies:
- `@clerk/clerk-react` (removing Clerk)
- `@radix-ui/react-direction` (removing RTL)
- `@faker-js/faker` (used for demo data)
- `axios` (will use Convex instead)
- `@tanstack/react-query` (will use Convex instead, optional)
- Consider keeping or removing based on future needs

---

## 8. Update Documentation

**Files to update:**
- Update `package.json` name and description
- Consider adding your own `CLAUDE.md` instructions
- Update any comment references to demo features

---

## Implementation Order

1. ✅ Create this plan
2. Remove Clerk authentication (routes, components, imports)
3. Remove RTL features (context, imports, UI config)
4. Remove Team/Workspace (component, sidebar data)
5. Remove demo pages (routes and features)
6. Update sidebar navigation
7. Clean dependencies
8. Update README
9. Run type checking: `pnpm exec tsc --noEmit`
10. Fix TypeScript errors
11. Prepare for Better Auth + Convex integration

---

## Post-Cleanup

After cleanup:
- Verify all TypeScript errors are resolved
- Test the application runs correctly
- Verify all navigation links work
- Review and commit changes

---

## Notes

- Clerk authentication will be removed
- Auth page templates kept (will update for Better Auth)
- Error pages kept (useful templates)
- Settings pages kept (useful templates)
- After cleanup, ready for Better Auth + Convex integration
- Can further customize after initial cleanup

---

## Next Step: Better Auth + Convex Integration

After completing this cleanup, follow the integration plan:
`plans/better-auth-convex-integration.md`
