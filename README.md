# Hilma af Klint: Paintings for the Temple

A website portal dedicated to the work of Hilma af Klint and her series "Paintings for the Temple".

## Website Structure

- **Home / Portal** — Landing page with Hero section, navigation, and mini gallery
- **The Temple** — Temple concept with levels and architecture
- **Ten Largest** — Exploration of the series with four life stages
- **Symbols & Language** — Dictionary of symbols and forms
- **Timeline** — Timeline from 1862–1944
- **Sources** — Links to museums and sources
- **Gallery** — Separate page with artwork gallery and filters

## Technologies

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion (animations)
- React Router (navigation)

## Installation and Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Features

- One-page structure with anchor links
- Smooth animations and parallax effects
- Responsive design
- Interactive elements (filters, tabs, hover effects)
- Modern minimalist design
- Custom cursor animations
- Animated text reveals
- Grid layout with hover interactions

## Project Structure

```
src/
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── GridSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── TempleSection.tsx
│   │   ├── TenLargestSection.tsx
│   │   ├── SymbolsSection.tsx
│   │   ├── TimelineSection.tsx
│   │   └── SourcesSection.tsx
│   ├── Navigation.tsx
│   └── AnimatedTitle.tsx
├── pages/
│   ├── HomePage.tsx
│   └── GalleryPage.tsx
├── App.tsx
├── main.tsx
└── index.css
```

## Design

The website features a minimalist design with:
- Color palette: #403B37 (dark brown), #FBEFDF (cream), #C1C0B6 (beige)
- Custom typography using Inter and Playfair Display fonts
- Smooth animations and transitions
- Interactive hover effects with custom cursor
- Responsive mobile-first approach

## License

This project is created for educational and portfolio purposes.
