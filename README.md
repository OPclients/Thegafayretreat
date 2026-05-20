# The Agafay Retreat

Static rebuild of the live homepage using only HTML, CSS, and vanilla JavaScript.

## Important Source Rule

The visible English content and media are taken from the existing live website. Do not replace them with invented copy or outside media.

## Structure

```text
/index.html
about.html
/the-experience.html
/contact.html
/css/style.css
/js/main.js
/js/translations.js
/assets/images/
```

## Media

The page uses local copies of the same media found on the live website, including:

- `assets/images/logo.png`
- `assets/images/hero-desert.jpg`
- Existing retreat, experience, villa, and transfer images copied into `assets/images/`

When replacing media, use only approved website media or local optimized copies of those same files in `assets/images/`.

## Translations

The language switcher reads strings from `js/translations.js` and stores the selected language in `localStorage`.

Supported language codes:

- `en`
- `fr`
- `ar`
- `de`
- `it`
- `pt`

Arabic switches the page to `dir="rtl"`.

## Business details

Current contact details used by the site:

```text
WhatsApp: +212633049321
Phone: +212600111768
Email: serenity@agafayretreat.com
Location: Commune d'Agafay, Marrakech-Safi Region, Morocco
```
