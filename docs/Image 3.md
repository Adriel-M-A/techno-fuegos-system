---
name: Techno Fuegos Industrial
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#574239'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#8b7267'
  outline-variant: '#dfc0b4'
  surface-tint: '#a23f00'
  primary: '#8c3600'
  on-primary: '#ffffff'
  primary-container: '#b34700'
  on-primary-container: '#ffe4d9'
  inverse-primary: '#ffb695'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfde'
  on-secondary-container: '#636262'
  tertiary: '#004fa2'
  on-tertiary: '#ffffff'
  tertiary-container: '#0066cf'
  on-tertiary-container: '#e1e9ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcc'
  primary-fixed-dim: '#ffb695'
  on-primary-fixed: '#351000'
  on-primary-fixed-variant: '#7b2f00'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#d7e2ff'
  tertiary-fixed-dim: '#abc7ff'
  on-tertiary-fixed: '#001b3f'
  on-tertiary-fixed-variant: '#004590'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-lg:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-md:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: '1.2'
  mono-data:
    fontFamily: monospace
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.4'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

This design system is engineered for industrial precision, technical documentation, and high-performance engineering interfaces. The brand personality is utilitarian, authoritative, and strictly professional. It avoids decorative elements in favor of functional clarity and structural integrity.

The aesthetic follows a **Modern Industrial** approach: a fusion of corporate reliability and technical "spec-sheet" aesthetics. It prioritizes information density, legibility, and a sense of physical hardware through the use of high-contrast typography and rigid, structured layouts. The emotional response should be one of confidence, stability, and absolute technical accuracy.

## Colors

The palette is derived from industrial materials: weathered iron, clean laboratory surfaces, and safety-critical "Oxide Orange."

- **Oxide Orange (Primary):** Used exclusively for primary actions, critical status indicators, and active selection states. It provides high-contrast visibility against the neutral background.
- **Surface & Container:** The background strategy utilizes pure white for the base layer, with light grey containers to define functional zones without the need for heavy shadows.
- **On-Surface:** A deep, near-black charcoal ensures maximum text contrast and legibility for technical data.
- **Outlines:** Subtle grey borders provide the structural scaffolding for the UI, mimicking the precision of technical blueprints.

## Typography

The typography system relies on **Inter**, chosen for its exceptional legibility in technical contexts and its neutral, systematic appearance.

- **Headlines:** Use tight letter spacing and bold weights to establish a clear hierarchy.
- **Data Display:** For numerical values, sensor readings, or serial numbers, a monospaced font should be used to ensure tabular alignment and clarity.
- **Labels:** Small-scale labels use uppercase styling with increased letter spacing to mimic industrial stamping and engraved tags.
- **Accessibility:** High contrast ratios (On-Surface vs. Surface) must be maintained at all times, especially for body copy and data points.

## Layout & Spacing

The layout is governed by a **Fixed Grid** system that emphasizes order and predictability. 

- **Grid Model:** A 12-column grid for desktop with 16px gutters. Elements should align strictly to the grid lines to reinforce the industrial feel.
- **Spacing Rhythm:** A 4px baseline grid ensures vertical consistency. All margins and paddings must be multiples of 4px.
- **Breakpoints:**
  - **Mobile (<600px):** Single column, 16px side margins.
  - **Tablet (600px - 1024px):** 6-column grid, 24px side margins.
  - **Desktop (>1024px):** 12-column grid, max-width of 1440px, centered.
- **Information Density:** Content should be densely packed but clearly separated by outlines and tonal changes rather than wide expanses of empty space.

## Elevation & Depth

This design system eschews shadows in favor of **Tonal Layering** and **Low-Contrast Outlines**.

- **Depth through Tone:** The background is `#ffffff`. Secondary functional areas or sidebars use `#f5f5f5`. This creates a sense of "stacked" metal plates or separate modules.
- **Structural Outlines:** All containers, cards, and input fields are defined by a 1px solid border (`#e0e0e0`). This replaces shadows to create a flatter, more technical appearance.
- **Active State:** Only when an element is active or focused does it receive a visual "lift," achieved through a color change to the border (Oxide Orange) rather than a shadow.

## Shapes

The shape language is **Soft (0.25rem)**. 

While the system is industrial, slightly softened corners (4px) prevent the UI from feeling hostile or dated, while still maintaining a rigid, machined look. Large elements like cards use `rounded-lg` (8px), but buttons and inputs should strictly adhere to the base 4px radius. Circles are reserved exclusively for status indicators (LED style) and checkboxes.

## Components

### Buttons
- **Primary:** Background `#b34700`, text `#ffffff`, 4px radius. No gradients.
- **Secondary:** White background, 1px border `#e0e0e0`, text `#1a1a1a`.
- **States:** Hover states should slightly darken the background color. Active states should show a 2px inset border.

### Input Fields
- **Default:** White background, 1px `#e0e0e0` border.
- **Focus:** 1px solid `#b34700` border.
- **Labels:** Always visible above the input, using `label-md` styling.

### Cards & Containers
- Cards use a 1px `#e0e0e0` border.
- Headers within cards should have a light grey (`#f5f5f5`) background and a bottom border to separate them from the content body.

### Data Tables
- Rows are separated by 1px horizontal lines.
- Header rows use `#f5f5f5` background with bold labels.
- Use monospaced fonts for numerical columns.

### Status Indicators
- **Active/Safe:** Solid circular icon in Green (use a standard technical green like `#2e7d32`).
- **Warning/Error:** Oxide Orange (`#b34700`) for high visibility.
- No glows or blurs; use solid, flat colors only.

### Dividers
- Use 1px solid `#e0e0e0` for all structural divisions. Vertical dividers should be used to separate adjacent data sets in a dashboard view.