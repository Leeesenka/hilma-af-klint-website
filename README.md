# Hilma af Klint: Paintings for the Temple

**Educational portfolio project** — a single-page website portal about Hilma af Klint and her series *Paintings for the Temple*.  
This site is **not affiliated** with the [Hilma af Klint Foundation](https://hilmaafklint.se) or any museum. It was built for learning and demonstration purposes only.

## About this project

This is a **student / learning project** (учебный проект): an exploration of modern front-end layout, animation, and interaction design inspired by museum and editorial websites. Content is for educational use; image rights belong to the Hilma af Klint Foundation and respective museums where noted.

## Website structure

Single-page layout with anchor navigation:

| Section | Description |
|--------|-------------|
| **Home** | Hero and introductory grid of key series |
| **About** | Biography and context blocks with hover interactions |
| **The Temple** | Temple concept, levels, and architecture |
| **Ten Largest** | Four life stages with artwork cards |
| **Timeline** | Interactive timeline 1862–1944 |
| **Sources** | Museums, publications, and external links |
| **Footer** | Credits, explore links, and contact |

## Technologies

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router

## Installation

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## Features

- One-page site with smooth scroll and anchor links
- Sticky / mobile full-screen navigation
- `AnimatedTitle` character reveals
- Grid and section blocks with hover color changes and marquee titles
- Custom cursor (circle + arrow) on desktop hover
- Responsive layout (`useMedia` hooks for mobile and touch)
- Ten Largest paintings from Wikimedia Commons (`public/images/ten-largest/`)

## Project structure

```
src/
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── GridSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── TempleSection.tsx
│   │   ├── TenLargestSection.tsx
│   │   ├── TimelineSection.tsx
│   │   └── SourcesSection.tsx
│   ├── Navigation.tsx
│   ├── AnimatedTitle.tsx
│   └── Footer.tsx
├── hooks/
│   └── useMedia.ts
├── pages/
│   └── HomePage.tsx
├── App.tsx
├── main.tsx
└── index.css
public/
└── images/ten-largest/   # No. 1–10 artwork images
```

## Design

- Palette: `#403B37`, `#FBEFDF`, `#C1C0B6`, `#829EB1`, `#ED740C`, `#F1BC3E`, `#394A8B`, `#E7E0D2`
- Typography: Inter, Playfair Display (serif headings)
- Rounded block corners, blur navigation, scroll-driven sticky menu

## Contact

- [LinkedIn — Alesya Frolova](https://www.linkedin.com/in/alesya-frolova/)
- [alesya.vashurova@gmail.com](mailto:alesya.vashurova@gmail.com)

## Disclaimer

© Educational portfolio project. Not an official Hilma af Klint or museum website.  
Images via [Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:Paintings_by_Hilma_af_Klint) where noted. For publication or commercial use of artworks, contact the Hilma af Klint Foundation.

## License

For educational and portfolio purposes only.
