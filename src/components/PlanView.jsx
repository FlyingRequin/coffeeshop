import { useRef } from 'react';
import { DAYS } from '../data/itinerary';
import DayChips from './DayChips';
import ActivityCard from './ActivityCard';

function PlanView({ dayIdx, setDayIdx, showOnMap }) {
  const day = DAYS[dayIdx];
  const main = day.activities.filter((a) => a.kind !== 'rain');
  const rain = day.activities.filter((a) => a.kind === 'rain');
  const touch = useRef(null);

  const prev = () => setDayIdx(Math.max(0, dayIdx - 1));
  const next = () => setDayIdx(Math.min(DAYS.length - 1, dayIdx + 1));

  // Swipe left/right to change day; ignore mostly-vertical gestures.
  const onTouchStart = (e) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e) => {
    if (!touch.current) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    const dy = e.changedTouches[0].clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) > 60 && Math.abs(dy) < 40) (dx < 0 ? next : prev)();
  };

  return (
    <div>
      <div className="sticky top-0 z-20 bg-bg/90 backdrop-blur border-b border-line">
        <DayChips dayIdx={dayIdx} setDayIdx={setDayIdx} />
      </div>

      <div
        key={day.id}
        className="day-in px-4 pb-8"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <section
          className="rounded-2xl mt-4 p-4 text-white"
          style={{ background: day.color }}
        >
          <p className="text-xs font-bold uppercase tracking-wide opacity-90">
            {day.weekday} {day.dayNum} July · {day.area}
          </p>
          <h2 className="text-xl font-extrabold leading-tight mt-1">
            {day.emoji} {day.title}
          </h2>
          <p className="text-sm leading-relaxed mt-2 opacity-95">{day.summary}</p>
          {day.packing && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {day.packing.map((p) => (
                <span
                  key={p}
                  className="text-[11px] font-bold rounded-full bg-white/20 px-2.5 py-1"
                >
                  🎒 {p}
                </span>
              ))}
            </div>
          )}
        </section>

        {day.bookingNote && (
          <p className="mt-3 rounded-2xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm font-semibold">
            ⚠️ {day.bookingNote}
          </p>
        )}

        <div className="flex flex-col gap-3 mt-4">
          {main.map((a) => (
            <ActivityCard
              key={a.id}
              activity={a}
              day={day}
              dayIdx={dayIdx}
              showOnMap={showOnMap}
            />
          ))}
        </div>

        {rain.length > 0 && (
          <div className="mt-5">
            <h3 className="text-xs font-bold uppercase tracking-wide text-muted px-1 mb-2">
              ☔ If it rains
            </h3>
            <div className="flex flex-col gap-3">
              {rain.map((a) => (
                <ActivityCard
                  key={a.id}
                  activity={a}
                  day={day}
                  dayIdx={dayIdx}
                  showOnMap={showOnMap}
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between gap-3 mt-6">
          <button
            onClick={prev}
            disabled={dayIdx === 0}
            className="flex-1 rounded-xl border border-line bg-surface py-3 text-sm font-bold disabled:opacity-40"
          >
            ← {dayIdx > 0 ? DAYS[dayIdx - 1].short : ''}
          </button>
          <button
            onClick={next}
            disabled={dayIdx === DAYS.length - 1}
            className="flex-1 rounded-xl border border-line bg-surface py-3 text-sm font-bold disabled:opacity-40"
          >
            {dayIdx < DAYS.length - 1 ? DAYS[dayIdx + 1].short : ''} →
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlanView;
