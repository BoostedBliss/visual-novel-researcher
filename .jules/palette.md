## 2024-05-18 - Icon-Only Button Accessibility Pattern
**Learning:** Icon-only buttons (like modal closes or mute toggles) in this app often lack clear programmatic names, titles, or keyboard focus indicators, making them invisible to screen readers and difficult to use with keyboard navigation.
**Action:** Always apply `aria-label`, `title`, and `focus-visible` styles (`focus-visible:ring-2`, `focus-visible:outline-none`) to any icon-only button to ensure full accessibility and usability.
