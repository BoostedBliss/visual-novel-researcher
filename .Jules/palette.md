## 2026-11-08 - Accessible Modal Close Buttons
**Learning:** Icon-only close buttons (like 'X' icons in modals) throughout the app lacked screen reader labels (`aria-label`) and titles, making them inaccessible. Additionally, they missed clear keyboard focus indicators.
**Action:** Applied `aria-label`, `title`, and `focus-visible:ring-2 focus:outline-none focus-visible:ring-[color]` to all modal close buttons. Always add these attributes and styles to any new icon-only buttons introduced to ensure accessibility.
