# Project Journal: Pivot.mate Authentication Experience

## September 20, 2026

### What Was Worked On
- **Sign Up Page (`signup.html`)**: Built a registration page maintaining the exact visual identity, layout proportions, and custom inline SVGs of the sign-in page.
- **Registration Fields**: Added inputs for Full Name, Work Email, Team Name, and Team Size (a dropdown with 5 ranges: `1-5`, `6-20`, `21-50`, `51-200`, `201+ members`), alongside Password and Confirm Password.
- **Client-Side Validation (`signup.js`)**:
  - Implemented real-time validation (evaluating on `blur`, clearing on `input`/`change`).
  - Added password length checking (minimum 8 characters) and dynamic password confirmation matching.
  - Implemented independent password visibility toggles for both the password and confirm password inputs.
  - Added double-submission prevention and loading spinner feedback.
- **Styles & Custom Select (`styles.css`)**:
  - Styled native `<select>` controls with a custom inline SVG chevron and placeholder state management.
  - Added vertical rhythm rules (`.signup-form .form-group`) to comfortably fit the 6 fields within laptop viewports.
- **Navigation Flow**: Connected the footer links across both pages (`index.html` -> `signup.html` and `signup.html` -> `index.html`) and simulated post-registration redirection.

### Key Decisions
- **Design Parity**: Reused the exact sidebar typography, SVG assets, and card containers so the transition between signing in and registering feels unified and cohesive.
- **Native Select with Bespoke Styling**: Used a native `<select>` element paired with `appearance: none` and SVG background iconography to preserve accessibility (screen reader compatibility, mobile OS picker integration) while maintaining design fidelity.
- **Independent Password Toggles**: Gave both password fields their own toggles so users can unmask either or both fields when diagnosing a mismatch error.
- **Dynamic Confirm Password Evaluation**: Configured the primary password field to automatically re-verify the confirm password field if a mismatch error was already active, removing friction immediately when the user fixes the typo.

---

## August 30, 2026

### What Was Worked On
- **HTML & Semantic Structure**: Created the responsive 2-column page layout with full accessibility compliance (labels associated via `for`/`id`, `role="alert"`, and proper `autocomplete` values).
- **CSS Styling & Polish**: Set up design tokens (Navy `#0A1C3E` and Mint `#C3F7E7`), imported typography (Inter/Outfit), configured media queries for virtual keyboard optimization on mobile, and created hover transitions.
- **SVGs**: Crafted custom, responsive inline SVGs for the Pivot.mate branding, padlock container, and decorative globe background.
- **JavaScript & Validation**: Implemented password visibility toggle, non-intrusive validation (checking on `blur` and clearing on `input`), and submit-loading state simulation to prevent double-posting.
- **Git Repo Setup**: Reconfigured repository bounds to initialize a localized Git profile at `/Users/mac/Desktop/Login Page` rather than pushing from the user's home directory.

### Key Decisions
- **Zero-Dependency Core**: Chose vanilla technologies (HTML, CSS, JS) over utility frameworks to keep initial load times near-zero and avoid technical debt.
- **ValidityState API**: Leveraged native validity checks for robust validation rather than relying on heavy custom regex.
- **Validation Event Timing**: Configured validation to trigger on `blur` and clear on `input` so errors are only displayed when the user is done with a field, keeping the UI helpful and non-intrusive.
- **Mobile Input Isolation**: Stacked inputs upper-most on mobile viewports so virtual keyboards do not obstruct the primary submission button.
