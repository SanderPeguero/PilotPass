## 2023-10-27 - Screen Reader Accessibility in Navbar
**Learning:** Icon-only buttons and search inputs without visible labels often lack necessary ARIA attributes for screen readers. The `aria-expanded` and `aria-haspopup` attributes are particularly crucial for communicating the state and function of dropdown menus.
**Action:** When working on navigation components or search inputs, always verify that icon-only buttons have descriptive `aria-label`s and that dropdown triggers properly use `aria-expanded` and `aria-haspopup`.
