## 2024-10-02 - Enhancing Form Accessibility with Dynamic ARIA attributes

**Learning:** When using dynamic form validation frameworks, `aria-invalid` and `aria-describedby` are critical but often overlooked because visual cues (like red borders) are usually the first step for developers. Specifically in React apps where state manages invalid status (like `valid: false` or `true`), toggling `aria-invalid` based on state `false` only explicitly connects validation with screen reader announcements without firing when the input is untouched.

**Action:** Whenever adding or fixing inline field validation, ensure that:
1. Native `required` is applied where appropriate.
2. `aria-invalid` evaluates specifically to the `false` state (avoiding `undefined` or untouched initial states).
3. The element containing the error message has an `id` that matches the `aria-describedby` attribute on the input field dynamically.
