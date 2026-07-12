import { directionsUrl } from '../data/itinerary';

function ActivityCard({ activity: a, day, dayIdx, showOnMap }) {
  const optional = a.kind === 'optional';

  return (
    <article
      className={`rounded-2xl border bg-surface p-4 ${
        optional ? 'border-dashed border-line' : 'border-line'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className="shrink-0 grid place-items-center w-11 h-11 rounded-xl text-xl"
          style={{ background: `${day.color}1f` }}
          aria-hidden="true"
        >
          {a.emoji}
        </div>
        <div className="min-w-0">
          <h3 className="font-bold leading-snug">
            {a.name}
            {optional && (
              <span className="ml-2 align-middle text-[10px] font-bold uppercase tracking-wide text-muted border border-line rounded-full px-2 py-0.5">
                Optional
              </span>
            )}
          </h3>
          {(a.transit || a.area) && (
            <p className="text-xs font-semibold text-muted mt-0.5">
              {[a.area, a.transit].filter(Boolean).join(' · ')}
            </p>
          )}
        </div>
      </div>

      <p className="text-sm leading-relaxed mt-2.5 text-ink/90">{a.desc}</p>

      {(a.tags?.length || a.duration) && (
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {a.duration && (
            <span className="text-[11px] font-bold rounded-full bg-surface-2 px-2.5 py-1">
              ⏱ {a.duration}
            </span>
          )}
          {a.tags?.map((t) => (
            <span
              key={t}
              className="text-[11px] font-bold rounded-full bg-surface-2 px-2.5 py-1"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {a.coords && (
        <div className="flex gap-2 mt-3">
          <a
            href={directionsUrl(a)}
            target="_blank"
            rel="noreferrer"
            className="flex-1 text-center text-sm font-bold text-white rounded-xl py-2.5 active:scale-[0.98] transition-transform"
            style={{ background: day.color }}
          >
            Directions ↗
          </a>
          <button
            onClick={() => showOnMap(dayIdx, a.id)}
            className="flex-1 text-center text-sm font-bold rounded-xl py-2.5 bg-surface-2 active:scale-[0.98] transition-transform"
          >
            Show on map
          </button>
        </div>
      )}
    </article>
  );
}

export default ActivityCard;
