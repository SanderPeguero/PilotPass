## 2026-10-20 - [Use React 18's useId() instead of Math.random()]
**Learning:** Using Math.random() to generate unique IDs for form elements (<label htmlFor={...}> to <input id={...}>) creates an accessibility issue and causes React hydration mismatches if used in SSR, because the ID will be different on every render. This was discovered in Input.jsx and Select.jsx.
**Action:** Use React 18's useId() hook for generating stable, unique IDs that persist across renders and are SSR-safe.
