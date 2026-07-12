# 🐻 Berlin with Kids · 12–19 July 2026

A mobile-first website for a family week in Berlin (kids 11 & 13): day-by-day
itinerary, an interactive map of every stop, and a packing checklist.

## Features

- **Plan tab** — one day per screen with swipe or chip navigation, activity
  cards with transit hints, booking alerts, rain plans, and one-tap Google Maps
  transit directions for every stop.
- **Map tab** — Leaflet map with day-colored emoji pins, per-day filtering,
  a "show my location" button, and popups that link straight to directions.
- **Info tab** — booking reminders, a packing checklist that persists on the
  device (localStorage), and practical tips (WelcomeCard, Monday closures…).
- Auto-selects **today** while the trip is running, dark mode follows the
  system, safe-area aware layout, installable to the home screen (web manifest).

## Stack

React 19 · Vite 7 · Tailwind CSS 4 · Leaflet 1.9 (CARTO/OpenStreetMap tiles)

## Develop

```sh
npm install
npm run dev       # local dev server
npm run build     # production build to dist/
npm run preview   # serve the production build
```
