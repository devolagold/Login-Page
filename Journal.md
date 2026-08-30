# Project Journal: Pivot.mate Login Page

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
