import { useEffect, useState } from 'react';
import { BOOKINGS, PACKING, TIPS } from '../data/itinerary';

const STORAGE_KEY = 'berlin-packing-v1';

function loadChecked() {
  try {
    return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));
  } catch {
    return new Set();
  }
}

function InfoView() {
  const [checked, setChecked] = useState(loadChecked);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...checked]));
  }, [checked]);

  const toggle = (item) =>
    setChecked((prev) => {
      const nxt = new Set(prev);
      if (nxt.has(item)) nxt.delete(item);
      else nxt.add(item);
      return nxt;
    });

  return (
    <div className="px-4 pb-8">
      <section className="mt-4">
        <h2 className="text-xs font-bold uppercase tracking-wide text-muted px-1 mb-2">
          📌 Book these now
        </h2>
        <div className="flex flex-col gap-3">
          {BOOKINGS.map((b) => (
            <div key={b.title} className="rounded-2xl border border-line bg-surface p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold leading-snug">
                    {b.emoji} {b.title}
                  </h3>
                  <p className="text-xs font-semibold text-muted mt-0.5">{b.when}</p>
                </div>
                <span
                  className={`shrink-0 text-[11px] font-bold rounded-full px-2.5 py-1 ${
                    b.url
                      ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                      : 'bg-surface-2 text-muted'
                  }`}
                >
                  {b.status}
                </span>
              </div>
              <p className="text-sm leading-relaxed mt-2">{b.detail}</p>
              {b.url && (
                <a
                  href={b.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-3 text-sm font-bold text-white bg-amber-600 rounded-xl px-4 py-2.5 active:scale-[0.98] transition-transform"
                >
                  Book tickets ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <div className="flex items-baseline justify-between px-1 mb-2">
          <h2 className="text-xs font-bold uppercase tracking-wide text-muted">
            🎒 Packing checklist
          </h2>
          <span className="text-xs font-bold text-muted">
            {checked.size}/{PACKING.length}
          </span>
        </div>
        <div className="rounded-2xl border border-line bg-surface divide-y divide-line overflow-hidden">
          {PACKING.map((item) => {
            const done = checked.has(item);
            return (
              <label
                key={item}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={done}
                  onChange={() => toggle(item)}
                  className="w-5 h-5 accent-emerald-600"
                />
                <span
                  className={`text-sm font-semibold ${done ? 'line-through text-muted' : ''}`}
                >
                  {item}
                </span>
              </label>
            );
          })}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-xs font-bold uppercase tracking-wide text-muted px-1 mb-2">
          💡 Good to know
        </h2>
        <div className="flex flex-col gap-3">
          {TIPS.map((t) => (
            <div key={t.title} className="rounded-2xl border border-line bg-surface p-4">
              <h3 className="font-bold">
                {t.emoji} {t.title}
              </h3>
              <p className="text-sm leading-relaxed mt-1.5 text-ink/90">{t.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default InfoView;
