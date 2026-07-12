import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { DAYS, TRIP, directionsUrl } from '../data/itinerary';

const DARK = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
const TILE_URL = DARK
  ? 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png'
  : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function pinIcon(activity, day, focused) {
  return L.divIcon({
    className: `pin-wrap${focused ? ' pin--focus' : ''}`,
    html: `<div class="pin" style="--pin:${day.color}">${activity.emoji}</div>`,
    iconSize: [34, 41],
    iconAnchor: [17, 41],
    popupAnchor: [0, -38],
  });
}

function popupHtml(activity, day) {
  return `<div class="pop">
    <div class="pop-day" style="color:${day.color}">${day.short} July · ${esc(day.title)}</div>
    <div class="pop-name">${activity.emoji} ${esc(activity.name)}</div>
    ${activity.transit ? `<div class="pop-transit">🚇 ${esc(activity.transit)}</div>` : ''}
    <a class="pop-dir" style="--pin:${day.color}" href="${directionsUrl(activity)}" target="_blank" rel="noreferrer">Directions ↗</a>
  </div>`;
}

function MapView({ active, filter, setFilter, focus, clearFocus }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const layerRef = useRef(null);
  const markersRef = useRef({}); // activityId -> marker

  useEffect(() => {
    const map = L.map(containerRef.current, {
      center: TRIP.center,
      zoom: 11,
      zoomControl: false,
    });
    L.tileLayer(TILE_URL, {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    }).addTo(map);

    // Locate-me control
    const Locate = L.Control.extend({
      onAdd() {
        const btn = L.DomUtil.create('div', 'locate-btn');
        btn.textContent = '📍';
        btn.title = 'Show my location';
        btn.setAttribute('role', 'button');
        L.DomEvent.on(btn, 'click', (e) => {
          L.DomEvent.stopPropagation(e);
          map.locate({ setView: true, maxZoom: 15 });
        });
        return btn;
      },
    });
    new Locate({ position: 'bottomright' }).addTo(map);
    let youMarker = null;
    map.on('locationfound', (e) => {
      if (youMarker) youMarker.remove();
      youMarker = L.circleMarker(e.latlng, {
        radius: 8,
        color: '#fff',
        weight: 2,
        fillColor: '#2563eb',
        fillOpacity: 1,
      })
        .addTo(map)
        .bindPopup('You are here');
    });

    mapRef.current = map;
    layerRef.current = L.layerGroup().addTo(map);
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Rebuild markers whenever the day filter or focus changes
  useEffect(() => {
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!map || !layer) return;

    // The map may have just been unhidden in this same commit — refresh its
    // size first so fitBounds/autoPan math uses the real viewport.
    map.invalidateSize();

    layer.clearLayers();
    markersRef.current = {};
    const bounds = [];

    DAYS.forEach((day, di) => {
      if (filter !== 'all' && filter !== di) return;
      day.activities.forEach((a) => {
        if (!a.coords) return;
        const focused = focus?.activityId === a.id;
        const m = L.marker(a.coords, {
          icon: pinIcon(a, day, focused),
          zIndexOffset: focused ? 1000 : 0,
        }).bindPopup(popupHtml(a, day), { autoPanPadding: [24, 24] });
        layer.addLayer(m);
        markersRef.current[a.id] = m;
        bounds.push(a.coords);
      });
    });

    if (focus && markersRef.current[focus.activityId]) {
      const m = markersRef.current[focus.activityId];
      map.setView(m.getLatLng(), 14, { animate: false });
      m.openPopup();
    } else if (bounds.length) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  }, [filter, focus]);

  // Leaflet needs a size refresh when the tab becomes visible
  useEffect(() => {
    if (active) mapRef.current?.invalidateSize();
  }, [active]);

  const pick = (value) => {
    clearFocus();
    setFilter(value);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="shrink-0 bg-bg/90 backdrop-blur border-b border-line">
        <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-2.5">
          <button
            onClick={() => pick('all')}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-bold border transition-colors ${
              filter === 'all'
                ? 'bg-ink text-bg border-transparent'
                : 'bg-surface border-line'
            }`}
          >
            All days
          </button>
          {DAYS.map((d, i) => (
            <button
              key={d.id}
              onClick={() => pick(i)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-bold border transition-colors ${
                filter === i
                  ? 'text-white border-transparent'
                  : 'bg-surface border-line'
              }`}
              style={filter === i ? { background: d.color } : undefined}
            >
              <span
                className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle"
                style={{ background: filter === i ? '#fff' : d.color }}
              />
              {d.short}
            </button>
          ))}
        </div>
      </div>
      <div ref={containerRef} className="flex-1 min-h-0 z-0" />
    </div>
  );
}

export default MapView;
