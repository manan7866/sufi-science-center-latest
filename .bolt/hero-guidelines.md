# Hero Section Guidelines

## Overview
All pages using the `ObservatoryHero` component must follow these standardized patterns to ensure visual consistency across the entire website.

## Core Principles

### 1. Automatic Spacing
The `ObservatoryHero` component now automatically handles navigation spacing with `mt-[72px]` (navigation height).

**DO NOT** add `pt-20` or similar padding to pages using ObservatoryHero.

### 2. Consistent Container Structure

**✅ CORRECT:**
```tsx
export default function MyPage() {
  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Category or Context"
        title="Page Title"
        description="Brief description of the page purpose."
      />
      {/* Page content */}
    </div>
  );
}
```

**❌ INCORRECT:**
```tsx
export default function MyPage() {
  return (
    <div className="min-h-screen pt-20">  {/* Remove pt-20! */}
      <ObservatoryHero
        subtitle="Category"
        title="Title"
        description="Description"
      />
    </div>
  );
}
```

### 3. Hero Component Props

#### subtitle (optional)
- Short contextual label
- Use `font-mono` style (automatic)
- Uppercase with wide letter spacing
- Examples: "Inner Development", "Academic Excellence", "Community"

#### title (required)
- Main page heading
- Keep concise (1-3 words ideal)
- Uses `font-serif` for elegance
- Examples: "Research", "Foundations", "Assessment"

#### description (optional)
- Single paragraph description
- Max 2-3 sentences
- Explain page purpose clearly
- Uses muted color for hierarchy

## Visual Theme

### Color Palette
- Background: Observatory gradient (`#0B0F2A` to `#1C1F4A`)
- Subtitle: Gold (`#C8A75E`)
- Title: Warm white (`#F5F3EE`)
- Description: Muted indigo (`#AAB0D6`)

### Animations
- All elements use fade-in animations
- Staggered timing for visual hierarchy
- Subtle and professional (not distracting)

### Interactive Elements
- Animated particle system background
- Gradient overlay for depth
- Responsive typography scaling

## Height Standards

- Desktop: 600px fixed height
- Mobile/Tablet: 600px fixed height (responsive typography)

## When to Use ObservatoryHero

### ✅ Use For:
- Main section pages (`/research`, `/dialogues`, `/foundations`)
- Top-level category pages
- Landing pages for major features
- Pages requiring strong visual impact

### ❌ Do Not Use For:
- Sub-pages without dedicated focus
- Modal/drawer content
- Utility pages (404, etc.)
- Dynamic content pages (individual blog posts, etc.)

## Common Patterns

### Pattern 1: Main Section Page
```tsx
export default function SectionPage() {
  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Section Category"
        title="Section Name"
        description="Clear explanation of what users will find here."
      />
      <section className="py-24 px-4">
        {/* Section content */}
      </section>
    </div>
  );
}
```

### Pattern 2: With Loading State
```tsx
export default function DynamicPage() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#C8A75E]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ObservatoryHero
        subtitle="Dynamic Content"
        title="Page Title"
        description="Description here"
      />
      {/* Content */}
    </div>
  );
}
```

## Implementation Checklist

When creating or updating a page with ObservatoryHero:

- [ ] Remove any `pt-20` or `pt-*` from main container
- [ ] Use `min-h-screen` for full-height pages
- [ ] Provide meaningful subtitle for context
- [ ] Keep title concise and clear
- [ ] Write descriptive but brief description
- [ ] Test on mobile and desktop viewports
- [ ] Verify smooth navigation transitions

## Maintenance

If you modify the `ObservatoryHero` component:
1. Update this documentation
2. Test across all pages using the component
3. Verify responsive behavior
4. Check animation performance
5. Update design system documentation

## Examples from Codebase

Reference these well-implemented pages:
- `/app/research/page.tsx` - Academic section
- `/app/inner-development/page.tsx` - Practice section
- `/app/foundations/page.tsx` - Knowledge section
- `/app/interfaith-coherence/page.tsx` - Thematic section

---

**Last Updated:** February 14, 2026
**Component Version:** 2.0 (Standardized Spacing)
