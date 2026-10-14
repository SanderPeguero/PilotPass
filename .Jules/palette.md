## 2024-05-24 - Profile Dropdown Accessibility
**Learning:** The profile dropdown trigger in the navigation bar relied solely on visual cues (an icon or initial) and lacked semantic meaning for screen readers.
**Action:** Added `aria-label`, `aria-haspopup`, and dynamic `aria-expanded` attributes to ensure screen readers correctly interpret the element as a menu trigger.
