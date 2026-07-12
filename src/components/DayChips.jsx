import { useEffect, useRef } from 'react';
import { DAYS, todayDayIndex } from '../data/itinerary';

function DayChips({ dayIdx, setDayIdx }) {
  const refs = useRef([]);
  const today = todayDayIndex();

  useEffect(() => {
    refs.current[dayIdx]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }, [dayIdx]);

  return (
    <div
      className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-2.5 snap-x"
      role="tablist"
      aria-label="Trip days"
    >
      {DAYS.map((d, i) => {
        const active = i === dayIdx;
        return (
          <button
            key={d.id}
            ref={(el) => (refs.current[i] = el)}
            role="tab"
            aria-selected={active}
            onClick={() => setDayIdx(i)}
            className={`snap-center shrink-0 flex flex-col items-center rounded-2xl px-3.5 py-1.5 border transition-colors ${
              active
                ? 'text-white border-transparent'
                : 'bg-surface border-line text-ink'
            }`}
            style={active ? { background: d.color } : undefined}
          >
            <span className="text-[10px] font-bold uppercase tracking-wide opacity-80">
              {i === today ? 'Today' : d.weekday}
            </span>
            <span className="text-base font-extrabold leading-tight">
              {d.dayNum}
            </span>
            <span className="text-xs leading-tight" aria-hidden="true">
              {d.emoji}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default DayChips;
