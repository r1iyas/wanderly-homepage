# Wanderly Homepage

A responsive homepage for **Wanderly**, a fictional travel company, built with plain HTML, CSS and JavaScript. No frameworks, build tools or backend.

## How to open it

Open `index.html` in a browser. Everything else (CSS, JavaScript, images) is loaded with relative paths, so no setup is needed.

To view it on a local server instead (for example with the VS Code Live Server extension, or Node):

```bash
npx http-server -p 5500
```

Then visit `http://localhost:5500`.

## Project structure

```
wanderly-homepage/
├── index.html          All page content and structure
├── css/
│   └── style.css       Design tokens, base styles, then one block per section
├── js/
│   └── main.js         Mobile menu, "coming soon" messages, footer year
└── assets/
    └── images/         Hero, destination and package photos
```

## Page sections

| Section | What it contains |
|---|---|
| Header | Letter logo, navigation, Plan Your Trip button. Sticky at the top; becomes a hamburger menu on phones. |
| Hero | Full-width photo with a dark overlay, the heading "Explore the World, Your Way" and two calls to action. |
| Popular Destinations | Four cards (Bali, Dubai, Maldives, Switzerland), each with an Explore button. |
| Travel Packages | Three packages with nights, inclusions, prices in Indian rupees and a Book button. |
| Why Choose Us | Three features with icons: Best Travel Deals, Hand Picked Destinations, 24/7 travel support. |
| Ready for Your Next Adventure? | Closing call to action with a Plan Your Trip button. |
| Footer | Brand, links, contact details, social media icons, copyright year and Back to top. |

## Design

- **Dark theme** on a near-black background (`#020105`), with coral (`#F26B4F`) for calls to action and teal for brand details.
- **Fonts** from Google Fonts: *Story Script* for headings and the logo, *Inter* for body text, buttons and prices.
- **Design tokens:** all colours, font sizes, spacing, radii and shadows are CSS custom properties at the top of `style.css`. Colours are named by their role (`--color-bg`, `--color-surface`, `--color-text`), so the theme can change in one place.
- **Responsive, mobile first:** base styles target phones, and `min-width` media queries add columns at 600px, 768px, 900px and 1024px. There is no horizontal scrolling at 375px.

## JavaScript

`js/main.js` holds three small, independent blocks, each wrapped in its own function so their variables don't clash:

1. **Mobile menu:** opens and closes the hamburger menu, keeps `aria-expanded` up to date, closes on Escape or when a link or button is chosen, and resets when the screen becomes wide.
2. **"Coming soon" messages:** one click listener on the page shows the text from any button's `data-coming-soon` attribute in a message box at the bottom of the screen. Explore, Book and Plan Your Trip all use it, so new buttons need no extra code.
3. **Footer year:** keeps the copyright year current.

## Accessibility

- Semantic structure: `header`, `nav`, `main`, `section`, `article` and `footer`, with one `h1` and headings in order.
- A "Skip to content" link for keyboard users and a visible coral focus outline on every interactive element.
- Repeated buttons have hidden extra text, so screen readers hear "Explore Bali" and "Book Island Escape" rather than identical labels.
- Decorative icons are hidden from screen readers with `aria-hidden`, and every photo has descriptive `alt` text.
- The message box uses `role="status"`, so screen readers announce it.
- Text colours meet WCAG AA contrast on the dark background. White text on the coral buttons is 3:1, below the 4.5:1 target for normal text, and is a known item to improve.
- Animations are reduced for users who set `prefers-reduced-motion`.

## Prototype notes

- **No backend.** Explore, Book and Plan Your Trip show a "coming soon" style message instead of booking or sending anything.
- **Placeholder details:** the email `hello@wanderly.example` uses a domain reserved for examples, and the social icons link to each platform's home page because Wanderly has no real accounts.
- **Sample content:** prices, inclusions and package details are made up for the prototype.
