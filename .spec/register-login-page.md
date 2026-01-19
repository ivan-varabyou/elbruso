🔐 Authentication & Registration Pages — Full Design Specification
These screens must feel clean, trustworthy, minimal, and aligned with your SaaS identity.
They follow the same visual language as your hero section: blue accents, soft neutrals, rounded shapes, and strong hierarchy.

1. General Layout (Both Pages)
Structure
Centered card layout

Full‑width background in background_subtle (#F5F5F5)

Authentication card centered both vertically and horizontally

Max card width: 420–480px

Padding inside card: 32–40px

Border radius: 12px

Border: border_light (#E0E0E0)

Shadow: subtle elevation (0 2px 8px rgba(0,0,0,0.06))

Branding
Logo centered at the top

Optional tagline:
“Secure access to your Codivoo workspace”

Typography
Title (H2): 26–32px, bold

Body: 14–16px

Labels: 13–14px, medium

Links: primary blue (#1A73E8)

2. Login Page (Authorization)
2.1 Content Structure
Title
“Sign in to your account”

Input Fields
Email

Password

Input height: 44px

Border: gray_100 (#E0E0E0)

Focus: 2px outline in primary_blue (#1A73E8)

Placeholder: gray_300 (#C4C4C4)

Actions
Primary Button:  
Label: “Sign In”
Color: button_primary (#1A73E8)
Hover: button_primary_hover (#1664C4)
Pressed: button_primary_pressed (#0F4C81)
Height: 44px
Radius: 8px

Secondary Links:

“Forgot password?” (right aligned)

“Don’t have an account? Create one” (centered below card)

Optional Elements
Divider with text “or continue with”

Social login buttons (Google, Microsoft)

Outline style

Icon + label

Height: 44px

3. Registration Page (Sign Up)
3.1 Content Structure
Title
“Create your account”

Input Fields
Full Name

Email

Password

Confirm Password

Optional: Organization Name

Same input styling as login page.

Password Requirements
Small caption text (12–13px):

At least 8 characters

One uppercase letter

One number

Color: gray_600 (#424242)

Primary Button
Label: “Create Account”

Same button styling as login page.

Secondary Link
“Already have an account? Sign in”

4. Adaptive Behavior
Desktop
Card centered with generous whitespace

Logo + title + form stacked vertically

Max width 480px

Tablet (≤1024px)
Card width reduces to 380–420px

Spacing reduces by 20%

Mobile (≤768px)
Card becomes full‑width minus 24px padding

Title reduces to 22–24px

Inputs remain 44px height

Buttons stack with 16px spacing

Social login buttons become full width

Accessibility
Touch targets ≥44px

Keyboard focus visible

WCAG AA contrast

Error messages in error_red (#EA4335)

Success states in success_green (#34A853)

5. Error & Validation States
Input Error
Border: error_red (#EA4335)

Caption text below field:
“Invalid email format” or “Passwords do not match”

Success
Border: success_green (#34A853)

Disabled Button
Background: gray_100

Text: gray_300

6. Micro‑Interactions
Input focus: smooth 150ms transition

Button hover: color shift 150ms

Error shake animation (optional, subtle)

Password visibility toggle icon

7. Tone & Style
Clean, minimal, trustworthy

No clutter

High readability

Soft rounded shapes

Consistent with Codivoo’s SaaS identity

If you want, I can now:

Generate the final agent prompt for these pages

Create Figma-ready component specs

Add dark mode rules

Or design the password reset flow

Just tell me where you want to go next.
