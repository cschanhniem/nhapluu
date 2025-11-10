# NhapLuu Design System

> A mindful design system inspired by Buddhist principles and aesthetics

## Philosophy

The NhapLuu design system embodies Buddhist principles of simplicity, mindfulness, and clarity. Every design decision reflects the path to awakening (Bodhi) through clean, purposeful interfaces that minimize distraction and maximize focus.

## Color Palette

### Primary Colors

Our color palette draws from traditional Buddhist symbolism and meditation spaces.

#### Saffron (Monk's Robe)
- **Primary**: `oklch(0.75 0.15 65)` - #D4A373
- **Light**: `oklch(0.85 0.12 65)` - #E8C9A0
- **Dark**: `oklch(0.65 0.18 65)` - #B8884F

Represents wisdom, humility, and renunciation. Used for primary actions and key focus areas.

#### Lotus Pink
- **Primary**: `oklch(0.80 0.10 340)` - #E8B4B8
- **Light**: `oklch(0.90 0.08 340)` - #F5D9DC
- **Dark**: `oklch(0.70 0.12 340)` - #D18C94

Symbolizes purity and spiritual awakening. Used for highlights and success states.

#### Bodhi Blue
- **Primary**: `oklch(0.55 0.12 240)` - #5B7FB8
- **Light**: `oklch(0.70 0.10 240)` - #8BA8D4
- **Dark**: `oklch(0.45 0.14 240)` - #3E5E8C

Represents wisdom, tranquility, and the path to enlightenment. Used for information and contemplative states.

#### Dharma Green
- **Primary**: `oklch(0.65 0.12 150)` - #6BB896
- **Light**: `oklch(0.80 0.10 150)` - #9DD4B8
- **Dark**: `oklch(0.50 0.14 150)` - #4A9670

Symbolizes harmony, peace, and nature. Used for positive feedback and growth indicators.

#### Meditation Purple
- **Primary**: `oklch(0.60 0.15 290)` - #8B6BB8
- **Light**: `oklch(0.75 0.12 290)` - #B399D4
- **Dark**: `oklch(0.50 0.18 290)` - #6A4A8C

Represents spirituality, contemplation, and transformation. Used for special features and premium content.

### Neutral Colors

#### Stone Gray (Temple Stone)
- **50**: `oklch(0.98 0 0)` - #F9F9F9
- **100**: `oklch(0.95 0 0)` - #F1F1F1
- **200**: `oklch(0.90 0 0)` - #E6E6E6
- **300**: `oklch(0.82 0 0)` - #D1D1D1
- **400**: `oklch(0.70 0 0)` - #B3B3B3
- **500**: `oklch(0.55 0 0)` - #8C8C8C
- **600**: `oklch(0.45 0 0)` - #737373
- **700**: `oklch(0.35 0 0)` - #595959
- **800**: `oklch(0.25 0 0)` - #404040
- **900**: `oklch(0.15 0 0)` - #262626

### Semantic Colors

#### Success (Enlightenment)
- **Background**: `oklch(0.95 0.08 150)` - Light green
- **Border**: `oklch(0.65 0.12 150)` - Dharma Green
- **Text**: `oklch(0.40 0.14 150)` - Dark green

#### Warning (Mindfulness)
- **Background**: `oklch(0.95 0.10 65)` - Light saffron
- **Border**: `oklch(0.75 0.15 65)` - Saffron
- **Text**: `oklch(0.45 0.18 65)` - Dark saffron

#### Error (Suffering/Dukkha)
- **Background**: `oklch(0.95 0.10 25)` - Light red
- **Border**: `oklch(0.60 0.20 25)` - Compassionate red
- **Text**: `oklch(0.40 0.22 25)` - Dark red

#### Info (Teaching)
- **Background**: `oklch(0.95 0.08 240)` - Light blue
- **Border**: `oklch(0.55 0.12 240)` - Bodhi Blue
- **Text**: `oklch(0.35 0.14 240)` - Deep blue

## Typography

### Font Families

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-serif: 'Noto Serif', Georgia, serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Font Scale

Following the Noble Eightfold Path principle, we use an 8-point scale:

- **xs**: 0.75rem (12px)
- **sm**: 0.875rem (14px)
- **base**: 1rem (16px)
- **lg**: 1.125rem (18px)
- **xl**: 1.25rem (20px)
- **2xl**: 1.5rem (24px)
- **3xl**: 2rem (32px)
- **4xl**: 2.5rem (40px)

### Font Weights

- **Light (300)**: For subtle, non-essential text
- **Regular (400)**: Default body text
- **Medium (500)**: Emphasis and subheadings
- **Semibold (600)**: Headings and important labels
- **Bold (700)**: Major headings and critical information

## Spacing

Based on the number 8 (Eightfold Path):

```
--space-1: 0.5rem   (8px)
--space-2: 1rem     (16px)
--space-3: 1.5rem   (24px)
--space-4: 2rem     (32px)
--space-5: 2.5rem   (40px)
--space-6: 3rem     (48px)
--space-8: 4rem     (64px)
--space-10: 5rem    (80px)
--space-12: 6rem    (96px)
```

## Border Radius

Inspired by the circular nature of Dharma wheel:

```
--radius-sm: 0.375rem (6px)
--radius-md: 0.5rem   (8px)
--radius-lg: 0.75rem  (12px)
--radius-xl: 1rem     (16px)
--radius-full: 9999px
```

## Shadows

Soft, mindful shadows that suggest depth without harshness:

```css
--shadow-sm: 0 1px 2px oklch(0 0 0 / 0.05);
--shadow-md: 0 4px 6px oklch(0 0 0 / 0.07);
--shadow-lg: 0 10px 15px oklch(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px oklch(0 0 0 / 0.15);
```

## Icons

- **Size**: Consistent 24px base, scaled with text
- **Style**: Line-based, minimalist
- **Weight**: 1.5-2px strokes
- **Library**: Lucide React (clean, consistent)

## Component Principles

### Mindfulness in Design

1. **Minimal Distraction**: Remove unnecessary elements
2. **Clear Hierarchy**: Guide attention intentionally
3. **Breathing Room**: Generous spacing prevents overwhelm
4. **Purposeful Color**: Use color with intention
5. **Gentle Transitions**: Smooth, calming animations

### Animation Values

```css
--duration-fast: 150ms
--duration-base: 250ms
--duration-slow: 350ms
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
--ease-mindful: cubic-bezier(0.32, 0, 0.67, 0)
```

### Accessibility

- **WCAG AA minimum** for all text
- **Focus states** clearly visible with Bodhi Blue ring
- **Keyboard navigation** supported throughout
- **Screen reader** friendly labels and ARIA attributes
- **Motion preferences** respected with `prefers-reduced-motion`

## Implementation

### Tailwind Configuration

The design system is implemented through Tailwind CSS v4 using CSS variables. All colors and spacing values are defined in [src/index.css](src/index.css).

### Component Library

Built with shadcn/ui components, customized to match our Buddhist-inspired aesthetic.

### Usage Example

```tsx
import { Button } from "@/components/ui/button"

<Button className="bg-primary text-primary-foreground">
  Begin Practice
</Button>
```

## Design Tokens

All design tokens are available as CSS custom properties:

```css
/* Color example */
background-color: var(--color-primary);

/* Spacing example */
padding: var(--space-4);

/* Typography example */
font-size: var(--text-lg);
font-weight: var(--font-medium);
```

## Buddhist Symbolism Guide

| Symbol | Meaning | Application |
|--------|---------|-------------|
| Lotus | Purity, awakening | Success states, achievements |
| Dharma Wheel | Teaching, path | Navigation, progress indicators |
| Bodhi Tree | Enlightenment | Key features, milestones |
| Meditation Pose | Practice, stillness | Loading states, pauses |
| Incense | Offering, devotion | Notifications, reminders |

---

*May this design system guide users toward clarity, peace, and understanding on their path.*
