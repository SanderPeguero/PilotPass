## 2024-10-24 - Accessibility for Snackbars
**Learning:** Found an accessibility issue where dynamic alerts did not have `role="alert"` and `aria-live="assertive"`, and icon-only close buttons only had an `sr-only` class.
**Action:** When adding accessibility to alert components, ensure to add `role="alert"`, `aria-live="assertive"`, `aria-label`, and `title` to the relevant elements to improve screen reader feedback. Always update all duplicate component instances (e.g. `src/utils` and `src/New Structure/utils`).
