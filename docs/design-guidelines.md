# Design Guidelines

## Overview

This document outlines the design principles, patterns, and guidelines for the Shadcn Starter Template. These guidelines ensure a consistent, accessible, and delightful user experience across the application.

## Design Philosophy

### Core Principles

1. **Simplicity First**
   - Remove unnecessary complexity
   - Clear visual hierarchy
   - Minimal cognitive load

2. **Accessibility by Default**
   - WCAG 2.1 Level AA compliance
   - Keyboard navigation support
   - Screen reader friendly
   - High contrast ratios

3. **Responsive Design**
   - Mobile-first approach
   - Fluid layouts
   - Adaptive components
   - Touch-friendly interactions

4. **Performance Minded**
   - Fast load times
   - Smooth animations
   - Optimized assets
   - Progressive enhancement

5. **Consistency**
   - Predictable interactions
   - Unified visual language
   - Reusable patterns
   - Design system adherence

## Design System

### Foundation: Shadcn UI

The template uses **Shadcn UI**, which provides:
- Accessible components (Radix UI primitives)
- Customizable design tokens
- TailwindCSS integration
- Copy-paste flexibility

### Design Tokens

All design tokens are defined using CSS variables for easy theming.

#### Colors

**Neutral Colors:**
```css
--background: 0 0% 100%        /* Page background */
--foreground: 222.2 84% 4.9%   /* Primary text */
--muted: 210 40% 96.1%         /* Muted background */
--muted-foreground: 215.4 16.3% 46.9%  /* Muted text */
```

**Semantic Colors:**
```css
--primary: 222.2 47.4% 11.2%    /* Primary actions */
--secondary: 210 40% 96.1%      /* Secondary actions */
--accent: 210 40% 96.1%         /* Accent elements */
--destructive: 0 84.2% 60.2%    /* Errors, danger */
--success: 142 71% 45%          /* Success states */
--warning: 38 92% 50%           /* Warnings */
```

**UI Element Colors:**
```css
--card: 0 0% 100%              /* Card background */
--border: 214.3 31.8% 91.4%    /* Border color */
--input: 214.3 31.8% 91.4%     /* Input borders */
--ring: 222.2 84% 4.9%         /* Focus rings */
```

#### Typography

**Font Families:**
```css
--font-sans: 'Inter', system-ui, sans-serif
--font-mono: 'JetBrains Mono', monospace
```

**Font Sizes:**
```css
--text-xs: 0.75rem      /* 12px */
--text-sm: 0.875rem     /* 14px */
--text-base: 1rem       /* 16px */
--text-lg: 1.125rem     /* 18px */
--text-xl: 1.25rem      /* 20px */
--text-2xl: 1.5rem      /* 24px */
--text-3xl: 1.875rem    /* 30px */
--text-4xl: 2.25rem     /* 36px */
```

**Font Weights:**
```css
--font-normal: 400
--font-medium: 500
--font-semibold: 600
--font-bold: 700
```

**Line Heights:**
```css
--leading-none: 1
--leading-tight: 1.25
--leading-snug: 1.375
--leading-normal: 1.5
--leading-relaxed: 1.625
```

#### Spacing

Based on 4px grid system:

```
0   = 0px
1   = 4px
2   = 8px
3   = 12px
4   = 16px
5   = 20px
6   = 24px
8   = 32px
10  = 40px
12  = 48px
16  = 64px
20  = 80px
24  = 96px
```

#### Radius

```css
--radius-sm: 0.25rem    /* 4px */
--radius: 0.5rem        /* 8px */
--radius-md: 0.75rem    /* 12px */
--radius-lg: 1rem       /* 16px */
--radius-full: 9999px   /* Circle */
```

#### Shadows

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1)
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1)
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1)
```

## Component Design Patterns

### Buttons

**Variants:**
- **default:** Primary action, high emphasis
- **destructive:** Dangerous actions (delete, cancel)
- **outline:** Secondary actions
- **secondary:** Tertiary actions
- **ghost:** Low emphasis, inline actions
- **link:** Text links styled as buttons

**Sizes:**
- **sm:** Compact spaces (16px height)
- **default:** Standard buttons (40px height)
- **lg:** Prominent actions (48px height)
- **icon:** Icon-only buttons (40px square)

**Usage Guidelines:**
```typescript
// ✅ Good - Clear action hierarchy
<Button>Save Changes</Button>
<Button variant="outline">Cancel</Button>

// ❌ Bad - Multiple primary buttons compete
<Button>Save</Button>
<Button>Submit</Button>
<Button>Continue</Button>
```

### Forms

**Layout:**
- Labels above inputs (not inline)
- Clear visual separation between fields
- Group related fields
- Consistent spacing (16px between fields)

**Validation:**
- Inline validation after blur
- Clear error messages
- Success indicators for valid fields
- Disabled submit until valid

**Example:**
```tsx
<form>
  <div className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        placeholder="you@example.com"
        aria-describedby="email-error"
      />
      {error && (
        <p id="email-error" className="text-sm text-destructive">
          {error.message}
        </p>
      )}
    </div>
  </div>
</form>
```

### Cards

**Structure:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Main content */}
  </CardContent>
  <CardFooter>
    {/* Actions */}
  </CardFooter>
</Card>
```

**Usage Guidelines:**
- Use for grouping related content
- Consistent padding (24px)
- Optional shadow for elevation
- Clickable cards have hover states

### Dialogs/Modals

**Structure:**
```tsx
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    {/* Content */}
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

**Best Practices:**
- Clear title and description
- Primary action on the right
- Cancel/close option always available
- Keyboard accessible (Esc to close)
- Focus trap inside dialog

### Tables

**Features:**
- Sortable columns
- Filterable data
- Pagination
- Row selection
- Bulk actions

**Design:**
- Header row with clear labels
- Alternating row colors (optional)
- Hover states on rows
- Fixed header on scroll (optional)
- Responsive on mobile (horizontal scroll or cards)

## Layout Patterns

### Page Layout

```
┌─────────────────────────────────────┐
│           Header/Navbar              │
├──────────┬──────────────────────────┤
│          │                          │
│          │                          │
│ Sidebar  │      Main Content        │
│  (Nav)   │                          │
│          │                          │
│          │                          │
└──────────┴──────────────────────────┘
```

**Desktop (≥1024px):**
- Persistent sidebar (collapsible)
- Header with user menu
- Main content area with padding

**Tablet (768px - 1023px):**
- Collapsible sidebar (default collapsed)
- Header with hamburger menu
- Main content full width when sidebar collapsed

**Mobile (<768px):**
- Drawer sidebar (overlay)
- Header with hamburger menu
- Main content full width
- Bottom nav (optional)

### Content Width

**Max Width:**
```css
/* Default content container */
max-width: 1280px  /* xl */
padding: 0 24px

/* Text content (for readability) */
max-width: 65ch    /* ~650px */
```

**Breakpoints:**
```css
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Grid System

Based on CSS Grid and Flexbox:

```tsx
// 12-column grid
<div className="grid grid-cols-12 gap-4">
  <div className="col-span-12 md:col-span-8">Main</div>
  <div className="col-span-12 md:col-span-4">Sidebar</div>
</div>

// Auto-fit grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => <Card key={item.id} />)}
</div>
```

## Dark Mode

### Theme Switching

The template supports three theme modes:
- **Light:** Default theme
- **Dark:** Dark theme
- **System:** Match OS preference

### Dark Mode Colors

```css
.dark {
  --background: 222.2 84% 4.9%
  --foreground: 210 40% 98%
  --muted: 217.2 32.6% 17.5%
  --muted-foreground: 215 20.2% 65.1%
  --primary: 210 40% 98%
  --secondary: 217.2 32.6% 17.5%
  /* ... other dark mode colors */
}
```

### Dark Mode Guidelines

1. **Contrast:**
   - Maintain 4.5:1 contrast ratio minimum
   - Test with contrast checkers

2. **Colors:**
   - Desaturate colors slightly in dark mode
   - Reduce brightness of accent colors
   - Avoid pure white (#FFFFFF) text

3. **Images:**
   - Reduce opacity of bright images
   - Use dark mode specific images when needed
   - Add subtle borders to images

4. **Shadows:**
   - Lighter shadows in dark mode
   - Consider using borders instead

## Typography

### Hierarchy

```tsx
// Page Title
<h1 className="text-4xl font-bold tracking-tight">

// Section Title
<h2 className="text-3xl font-semibold">

// Subsection Title
<h3 className="text-2xl font-semibold">

// Card Title
<h4 className="text-xl font-medium">

// Body Text
<p className="text-base leading-relaxed">

// Small Text
<span className="text-sm text-muted-foreground">

// Caption
<span className="text-xs text-muted-foreground">
```

### Best Practices

1. **Line Length:**
   - Max 75 characters for body text
   - Use `max-w-prose` class

2. **Line Height:**
   - Body text: 1.5 - 1.625
   - Headings: 1.2 - 1.375

3. **Font Weight:**
   - Headings: 600 (semibold) or 700 (bold)
   - Body: 400 (normal)
   - Emphasis: 500 (medium)

4. **Letter Spacing:**
   - Headings: -0.02em (`tracking-tight`)
   - Body: 0 (normal)
   - Small caps: 0.05em (`tracking-wide`)

## Iconography

### Icon Library: Lucide React

```tsx
import { User, Settings, LogOut } from 'lucide-react'

// Standard size (24px)
<User className="h-6 w-6" />

// Small (16px)
<User className="h-4 w-4" />

// Large (32px)
<User className="h-8 w-8" />
```

### Icon Usage

1. **Size:**
   - Use consistent sizes throughout the app
   - Match text size: 16px icons with 16px text

2. **Color:**
   - Inherit text color by default
   - Use semantic colors for status icons
   - Muted color for secondary icons

3. **Alignment:**
   - Vertically center with text
   - Use flex for alignment

```tsx
// ✅ Good - aligned with text
<div className="flex items-center gap-2">
  <User className="h-4 w-4" />
  <span>Profile</span>
</div>
```

## Interactions

### Hover States

**Buttons:**
```css
/* Subtle background change */
hover:bg-primary/90
hover:bg-secondary/80

/* Border buttons */
hover:bg-accent
hover:text-accent-foreground
```

**Links:**
```css
/* Underline on hover */
hover:underline

/* Color change */
hover:text-primary
```

**Cards:**
```css
/* Subtle lift */
hover:shadow-lg
transition-shadow duration-200
```

### Focus States

**Keyboard Navigation:**
```css
/* Visible focus ring */
focus-visible:ring-2
focus-visible:ring-ring
focus-visible:ring-offset-2

/* Offset from element */
ring-offset-background
```

**Best Practices:**
- Never remove focus indicators
- Make focus states obvious
- Test with keyboard-only navigation

### Loading States

**Buttons:**
```tsx
<Button disabled={isLoading}>
  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
  {isLoading ? 'Loading...' : 'Submit'}
</Button>
```

**Page Loading:**
```tsx
// Skeleton screens
<div className="space-y-4">
  <Skeleton className="h-12 w-full" />
  <Skeleton className="h-12 w-full" />
</div>

// Loading spinner
<div className="flex items-center justify-center">
  <Loader2 className="h-8 w-8 animate-spin" />
</div>
```

### Animations

**Duration:**
```css
--duration-fast: 150ms
--duration-normal: 200ms
--duration-slow: 300ms
```

**Easing:**
```css
--ease-in: cubic-bezier(0.4, 0, 1, 1)
--ease-out: cubic-bezier(0, 0, 0.2, 1)
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
```

**Common Animations:**
```tsx
// Fade in
<div className="animate-in fade-in duration-200">

// Slide in from bottom
<div className="animate-in slide-in-from-bottom duration-300">

// Scale in
<div className="animate-in zoom-in duration-200">
```

**Guidelines:**
- Keep animations subtle and fast
- Provide `prefers-reduced-motion` support
- Avoid animations on page load
- Use for feedback and transitions only

## Accessibility

### Keyboard Navigation

**Requirements:**
- All interactive elements keyboard accessible
- Tab order follows visual order
- Skip to main content link
- Modal focus trapping
- Escape key closes modals

**Tab Order:**
```tsx
// Use tabIndex carefully
tabIndex={0}  // Include in tab order
tabIndex={-1} // Exclude from tab order (but focusable)
```

### Screen Readers

**ARIA Labels:**
```tsx
// Buttons with icons only
<Button aria-label="Close menu">
  <X className="h-4 w-4" />
</Button>

// Form inputs
<Input
  id="email"
  aria-label="Email address"
  aria-describedby="email-help"
/>

// Status messages
<div role="status" aria-live="polite">
  Changes saved successfully
</div>
```

**Semantic HTML:**
```tsx
// ✅ Good - semantic elements
<nav>
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>

// ❌ Bad - div soup
<div className="nav">
  <div>
    <div onClick={goHome}>Home</div>
  </div>
</div>
```

### Color Contrast

**Minimum Ratios:**
- Normal text: 4.5:1
- Large text (18px+): 3:1
- UI components: 3:1

**Testing Tools:**
- Chrome DevTools: Inspect > Accessibility
- WebAIM Contrast Checker
- axe DevTools browser extension

### Alternative Text

```tsx
// Decorative images
<img src="..." alt="" />

// Informative images
<img src="..." alt="User profile photo" />

// Complex images
<img src="chart.png" alt="Sales increased by 25% in Q4" />
```

## Responsive Design

### Mobile-First Approach

```tsx
// ✅ Good - mobile first
<div className="text-sm md:text-base lg:text-lg">

// ❌ Bad - desktop first
<div className="text-lg lg:text-base md:text-sm">
```

### Breakpoint Usage

```tsx
// Stack on mobile, grid on desktop
<div className="flex flex-col md:grid md:grid-cols-2 gap-4">

// Hidden on mobile
<div className="hidden md:block">

// Show only on mobile
<div className="block md:hidden">
```

### Touch Targets

**Minimum Size:**
- 44px × 44px for touch targets
- 48px × 48px for critical actions

```tsx
// ✅ Good - large enough touch target
<Button className="h-12 px-6">

// ❌ Bad - too small for touch
<Button className="h-6 px-2 text-xs">
```

## Error States

### Form Validation

```tsx
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    className={cn(error && "border-destructive")}
  />
  {error && (
    <p className="text-sm text-destructive">
      {error.message}
    </p>
  )}
</div>
```

### Empty States

```tsx
<div className="flex flex-col items-center justify-center py-12">
  <InboxIcon className="h-12 w-12 text-muted-foreground" />
  <h3 className="mt-4 text-lg font-semibold">No messages</h3>
  <p className="mt-2 text-sm text-muted-foreground">
    You don't have any messages yet.
  </p>
  <Button className="mt-6">
    <Plus className="mr-2 h-4 w-4" />
    New Message
  </Button>
</div>
```

### Error Pages

**Structure:**
- Error code (401, 404, 500, etc.)
- Clear message
- Suggested action
- Navigation back to safety

## Performance

### Image Optimization

```tsx
// Use appropriate formats
<img src="photo.webp" alt="..." />

// Lazy load off-screen images
<img loading="lazy" src="..." alt="..." />

// Responsive images
<img
  srcSet="small.jpg 480w, medium.jpg 768w, large.jpg 1200w"
  sizes="(max-width: 768px) 100vw, 50vw"
  src="medium.jpg"
  alt="..."
/>
```

### Font Loading

```css
/* Preload critical fonts */
<link
  rel="preload"
  href="/fonts/Inter-Regular.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>

/* font-display: swap for non-blocking */
@font-face {
  font-family: 'Inter';
  font-display: swap;
}
```

## Design Checklist

### Component Checklist
- [ ] Works in light and dark mode
- [ ] Responsive on all screen sizes
- [ ] Keyboard accessible
- [ ] Screen reader friendly
- [ ] Focus states visible
- [ ] Touch targets ≥44px
- [ ] Color contrast ≥4.5:1
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Loading states implemented
- [ ] Error states handled
- [ ] Empty states designed

### Page Checklist
- [ ] Clear visual hierarchy
- [ ] Consistent spacing
- [ ] Readable typography
- [ ] Proper semantic HTML
- [ ] Meta tags for SEO
- [ ] Open Graph images
- [ ] Performance optimized
- [ ] Tested on real devices

## Resources

### Design Tools
- **Figma:** Design mockups
- **Adobe XD:** Alternative design tool
- **Framer:** Interactive prototypes

### Accessibility Testing
- **axe DevTools:** Browser extension
- **WAVE:** Web accessibility evaluation
- **Lighthouse:** Chrome DevTools audit

### Color Tools
- **Coolors:** Color palette generator
- **WebAIM Contrast Checker:** Contrast ratios
- **Color Hunt:** Color inspiration

### Typography Tools
- **Google Fonts:** Free fonts
- **Font Squirrel:** Font generator
- **Modular Scale:** Typography scale calculator

---

**Last Updated:** 2025-10-25
**Maintained By:** docs-manager agent
