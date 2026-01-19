📘 Design System Documentation
A unified visual and interaction framework for building consistent, scalable, and accessible interfaces across all products.

1. Foundations
1.1 Color System
A consistent color palette used across dashboards, marketing pages, document workflows, and analytics tools.

Brand Colors
Used for primary actions, navigation, and key interactive elements.

Token	Hex	Usage
primary_blue	#1A73E8	Primary buttons, links, highlights
primary_blue_dark	#0F4C81	Pressed states, dark mode accents
primary_blue_light	#4285F4	Charts, secondary accents
Status Colors
Semantic colors for system feedback and data indicators.

Token	Hex	Meaning
success_green	#34A853	Positive metrics, success states
success_green_dark	#0F9D58	Strong positive emphasis
warning_orange	#FB8C00	Alerts, attention
warning_yellow	#FBBC05	Soft warnings, highlights
error_red	#EA4335	Errors, negative metrics
error_red_dark	#D32F2F	Critical errors
neutral_gray	#9E9E9E	Neutral states, placeholders
Neutrals
Used for backgrounds, borders, typography, and layout structure.

Token	Hex	Usage
white	#FFFFFF	Main background
gray_50	#F5F5F5	Subtle background, table rows
gray_100	#E0E0E0	Borders, dividers
gray_300	#C4C4C4	Secondary text
gray_600	#424242	Primary text
black	#000000	High‑contrast text
Data Visualization Colors
Optimized for charts, dashboards, and analytics.

Token	Hex	Usage
chart_blue	#4285F4	Primary data line
chart_green	#0F9D58	Positive trend line
chart_orange	#F39C12	Secondary metrics
chart_red	#D32F2F	Negative trend line
chart_yellow	#F4B400	Highlighted data
UI Elements
Tokens for interactive components.

Token	Hex	Usage
button_primary	#1A73E8	Default CTA
button_primary_hover	#1664C4	Hover state
button_primary_pressed	#0F4C81	Active state
border_light	#E0E0E0	Light borders
border_dark	#424242	Strong dividers
background_default	#FFFFFF	Main canvas
background_subtle	#F5F5F5	Cards, sections
2. Typography
A clean, modern sans‑serif typeface optimized for dashboards and dense data layouts.

2.1 Font Family
Sans‑serif (geometric, high readability)

Works well across marketing, product UI, and analytics

2.2 Type Scale
Style	Size	Weight	Usage
H1	28–32 px	Bold	Page titles, hero sections
H2	22–26 px	Semi‑bold	Section headers
H3	18–20 px	Medium	Card titles, table headers
Body	14–16 px	Regular	Main text, table content
Caption	12–13 px	Regular	Metadata, timestamps
2.3 Typography Rules
Line height: 1.4–1.6

Titles use bold, body uses regular

Left alignment for data, center alignment for marketing cards

Avoid excessive uppercase; use sparingly for labels

3. Spacing & Layout
A consistent 4‑point grid ensures visual rhythm and clarity.

3.1 Spacing Scale
4 px — micro spacing (icon gaps)

8 px — default spacing between small elements

12–16 px — padding inside cards, table rows

24–32 px — spacing between sections

48–64 px — hero areas, large blocks

3.2 Layout Structure
12‑column grid for content areas

Left sidebar navigation (≈240 px)

Top navigation bar (≈64 px)

Cards arranged in responsive grids (2–4 columns)

Tables stretch full width with clear column separation

4. Components
4.1 Buttons
Height: 40–44 px

Border radius: 6–8 px

Primary: solid blue

Secondary: gray outline

Disabled: light gray background + gray text

States
Hover: darker blue

Pressed: deep navy

Focus: blue outline with 2 px ring

4.2 Cards
Background: white

Border: light gray or subtle shadow

Radius: 8–12 px

Padding: 16–24 px

Structure: title → description → action

4.3 Tables
Alternating row backgrounds (white / gray_50)

Column spacing: 16–24 px

Status indicators:

Green ↑ for positive

Red ↓ for negative

Compact typography for dense data

4.4 Forms
Input height: 40 px

Border: gray_100

Placeholder: gray_300

Focus: blue border + subtle glow

4.5 Charts
Smooth curves, rounded data points

High contrast between series

Consistent color mapping:

Blue = primary metric

Green = positive trend

Red = negative trend

Orange/Yellow = secondary metrics

5. Iconography
5.1 Style
Minimalistic

Rounded corners

Consistent stroke width

Outline or duotone

5.2 Usage
Navigation icons in sidebar

Status icons (success, warning, error)

Action icons (edit, add, filter, search)

6. Visual Tone & Style
Clean, modern, professional

Soft rounded shapes

High contrast for data‑heavy screens

Generous whitespace to avoid clutter

Balanced between enterprise and SaaS aesthetics

7. Accessibility
Contrast meets WCAG AA

Status colors always paired with icons or text

Minimum touch target: 44 px

Keyboard focus states clearly visible

Typography readable even in dense tables

8. Design Tokens (Summary)
The system uses tokens for:

Colors

Typography

Spacing

Radii

Shadows

Component states
