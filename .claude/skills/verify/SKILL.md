---
name: verify
description: Build, launch and drive this itinerary web app to verify changes end-to-end.
---

# Verify: Berlin with Kids web app

Static React SPA (Vite 7 + React 19 + Tailwind 4 + Leaflet). No backend.

## Build & launch

```sh
npm install
npm run build
npm run preview -- --port 4173 --host 127.0.0.1   # serves dist/ — leave running
```

Dev server (`npm run dev`) works too, but preview exercises the production build.

## Drive (headless mobile Chromium)

Use playwright-core with the pre-installed browser — do NOT `playwright install`:

- `executablePath: '/opt/pw-browsers/chromium'`, `args: ['--no-sandbox']`
- Mobile context: `viewport: {width: 390, height: 844}, isMobile: true, hasTouch: true`
- Add a second context with `colorScheme: 'dark'` to check dark mode.

## Flows worth driving

- Plan tab loads; day chips switch the day (check the `h2` day title changes).
- "Show on map" on an activity card → Map tab opens with popup on that pin.
- Map "All days" filter → expect one `.pin` per activity with coords (23 as of writing).
- Info tab: toggle packing checkboxes, reload, confirm they persist (localStorage).
- `Directions` links: `google.com/maps/dir/?api=1&destination=…&travelmode=transit`.

## Gotchas

- Map tiles (cartocdn/OSM) are blocked by the sandbox proxy — pins/popups render
  on a gray background here. `ERR_TUNNEL_CONNECTION_FAILED` console errors for
  `basemaps.cartocdn.com` are environment noise, not app bugs.
- The map lives in a hidden tab; anything that repositions it must run after
  `map.invalidateSize()` (already handled in MapView's marker effect).
