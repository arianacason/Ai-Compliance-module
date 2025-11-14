# Lock Toggle Position Fix

## Issue
The lock toggle was positioned absolutely in the top-right corner, causing it to overlap with the NIST badge (e.g., "NIST: Govern", "NIST: Measure").

## Solution
Repositioned the lock toggle to be part of the module card's layout flow instead of using absolute positioning.

### New Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│  [Icon]  Module Title                    ⏱ 15 min       │
│          Subtitle                        [NIST: Govern]  │
│                                          ☐ 🔓 Unlocked   │
│                                                          │
│  Description text...                                     │
│  [Start Module Button]                                   │
└─────────────────────────────────────────────────────────┘
```

### Changes Made

**Before:**
- Lock toggle: `position: absolute; top: 1rem; right: 1rem;`
- Overlapped with NIST badge

**After:**
- Lock toggle: Integrated into flex layout
- Positioned below NIST badge in a vertical stack
- Right-aligned with proper spacing

### Technical Details

**Layout Structure:**
```tsx
<div className="flex items-start justify-between">
  <div className="flex-1 pr-4">
    {/* Title and subtitle */}
  </div>
  <div className="flex flex-col items-end gap-2">
    {/* Duration and NIST badge */}
    {/* Lock toggle below */}
  </div>
</div>
```

**Key CSS Classes:**
- `flex-col` - Vertical stacking
- `items-end` - Right alignment
- `gap-2` - Spacing between badge and toggle
- `flex-shrink-0` - Prevent shrinking
- `whitespace-nowrap` - Keep toggle text on one line

### Visual Result

The lock toggle now appears:
1. Below the NIST badge
2. Right-aligned with the badge
3. No overlap or collision
4. Clean, organized appearance

## Status: ✅ Fixed

The lock toggle positioning issue has been resolved. The toggle now displays cleanly below the NIST badge without any overlap.