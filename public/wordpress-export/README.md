# TravelBuzzy — WordPress Integration Guide

This folder contains standalone, production-ready HTML/CSS/JS files for the TravelBuzzy homepage.
They are designed to be integrated into WordPress + Elementor with minimal effort.

---

## 1. Section Structure

| File area              | Section                | Notes                                         |
|------------------------|------------------------|-----------------------------------------------|
| `<header>`             | Sticky Header          | Logo, nav, CTA button, mobile menu            |
| `<section.tb-hero>`    | Hero                   | Full-bleed background, H1, dual CTAs          |
| `<section.tb-categories>` | Category Grid       | 4 clickable category cards                    |
| `<section.tb-deals>`   | Featured Deal Cards    | 3 affiliate cards with badges and pricing     |
| `<section.tb-guides>`  | Destination Guides     | 3 editorial guide cards                       |
| `<section.tb-newsletter>` | Email Capture       | Email form + trust note                       |
| `<footer.tb-footer>`   | Footer                 | 4-col links + affiliate disclaimer            |

---

## 2. How to Integrate into WordPress

### Option A — Full Page (Recommended first pass)
1. Create a new WordPress **Page** and set the template to **Elementor Canvas** (no header/footer from theme).
2. Add an **HTML widget** and paste the entire `index.html` content.
3. Upload images to WordPress Media Library and replace `src="images/..."` paths with your WordPress media URLs.
4. Upload `styles.css` and `scripts.js` to your theme's `/assets/` folder.
5. Enqueue them in `functions.php`:
   ```php
   function travelbuzzy_enqueue() {
       wp_enqueue_style( 'tb-styles', get_template_directory_uri() . '/assets/styles.css', [], '1.0' );
       wp_enqueue_script( 'tb-scripts', get_template_directory_uri() . '/assets/scripts.js', [], '1.0', true );
   }
   add_action( 'wp_enqueue_scripts', 'travelbuzzy_enqueue' );
   ```

### Option B — Section by Section (Best for Elementor workflow)
Copy any individual section block (see section comments in `index.html`) into an Elementor **HTML widget**. Each section is self-contained with its CSS class.

### Option C — Child Theme Override
Copy `styles.css` content into your child theme's `style.css` (at the end, after existing rules), and include `scripts.js` via the enqueue method above.

---

## 3. Best Parts for Elementor Templates

| Section              | Elementor Approach                                                              |
|----------------------|---------------------------------------------------------------------------------|
| **Header**           | Theme Builder → Header template. Recreate using Nav Menu + Button widgets.     |
| **Hero**             | Elementor Section → Background image + Text + Button widgets. Set parallax.    |
| **Category Grid**    | 4-column Section → each column: Icon Box widget. Link each to category page.   |
| **Deal Cards**       | 3-column Section → each column: Image + Heading + Text + Button. Save as block.|
| **Guide Cards**      | Use Elementor **Posts Widget** if using WP posts. Or HTML widget per card.     |
| **Newsletter**       | Elementor **Form widget** (or Mailchimp/ConvertKit form embed) + Text widget.  |
| **Footer**           | Theme Builder → Footer template. Nav Menu + Text widgets.                      |

**Pro tip:** Save the Deal Card columns as a **Global Widget** — you can then reuse the styled card throughout the site by just changing content.

---

## 4. Where to Insert Affiliate Blocks and Disclosure Text

### Affiliate Links
Look for this comment in `index.html`:
```html
<!-- [AFFILIATE LINK: Replace # with your booking affiliate URL] -->
<a href="#" class="tb-btn tb-btn--primary" rel="noopener sponsored" target="_blank">
```
Replace `#` with your actual affiliate tracking URL (Booking.com, Hotels.com, etc.).
Always include `rel="noopener sponsored"` for affiliate links per Google's guidelines.

### Affiliate Disclosure
- **In-section disclosure** appears below the deals grid as small print.
- **Footer disclosure** is inside `<div class="tb-footer__bottom">` — already included.
- **Header disclosure link** is a small `*Affiliate Disclosure` link in the nav — already included.

For WordPress, you can add the FTC-required disclosure via a plugin like **WP Affiliate Disclosure** or by adding it to your theme's header template.

### Adding New Affiliate Deal Cards
Duplicate any `<article class="tb-deal-card">` block and:
1. Update the image, hotel name, destination, description, and pricing.
2. Update badge class: `tb-badge--editor`, `tb-badge--value`, or `tb-badge--top`.
3. Replace the CTA href with your affiliate tracking URL.

---

## 5. Design Token Reference (CSS Variables)

All colors, fonts, and spacing are controlled by CSS custom properties in `:root` inside `styles.css`. Change these to rebrand instantly:

```css
--tb-primary:      #0F4C81;   /* Navy — brand primary */
--tb-secondary:    #1F6F8B;   /* Steel blue — secondary */
--tb-accent:       #FF6F7D;   /* Coral — CTAs */
--tb-accent-hover: #E85D6A;   /* Coral hover */
--tb-bg:           #F7F6F2;   /* Warm off-white background */
--tb-surface:      #FBFAF7;   /* Card surface */
--tb-border:       #DED9D2;   /* Borders */
--tb-text:         #1F2933;   /* Main text */
--tb-muted:        #667085;   /* Secondary text */
```

---

## 6. SEO Notes

- There is exactly **one `<h1>`** on the page (in the Hero section). Do not add another.
- All sections use semantic HTML5 (`<header>`, `<main>`, `<section>`, `<footer>`, `<article>`).
- Images include descriptive `alt` attributes for accessibility and image SEO.
- Deal cards include `itemscope itemtype="https://schema.org/Hotel"` microdata ready for extension.
- A `WebSite` JSON-LD schema block is included in `<head>`.
- Add a `<link rel="canonical">` tag for each page when integrating into WordPress.

---

## 7. Files

| File           | Purpose                                              |
|----------------|------------------------------------------------------|
| `index.html`   | Complete homepage — paste into WordPress or Elementor|
| `styles.css`   | Full style system with CSS variables                 |
| `scripts.js`   | Minimal JS: sticky header, smooth scroll, mobile nav |
| `favicon.svg`  | Square traveler icon favicon                         |
| `README.md`    | This file                                            |
