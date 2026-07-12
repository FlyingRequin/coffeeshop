import { useState } from 'react';
import { TRIP, todayDayIndex } from './data/itinerary';
import PlanView from './components/PlanView';
import MapView from './components/MapView';
import InfoView from './components/InfoView';
import TabBar from './components/TabBar';

function App() {
  const [tab, setTab] = useState('plan');
  const [dayIdx, setDayIdx] = useState(() => {
    const t = todayDayIndex();
    return t >= 0 ? t : 0;
  });
  const [mapFilter, setMapFilter] = useState('all'); // 'all' | day index
  const [focus, setFocus] = useState(null); // { dayIdx, activityId }

  const showOnMap = (di, activityId) => {
    setMapFilter(di);
    setFocus({ dayIdx: di, activityId });
    setTab('map');
  };

  return (
    <div className="h-dvh flex flex-col max-w-3xl mx-auto bg-bg">
      <header className="shrink-0 flex items-baseline justify-between gap-3 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-2.5 border-b border-line">
        <h1 className="text-lg font-extrabold tracking-tight whitespace-nowrap">
          🐻 {TRIP.title}
        </h1>
        <p className="text-[11px] font-semibold text-muted whitespace-nowrap">
          {TRIP.subtitle}
        </p>
      </header>

      <main className="flex-1 min-h-0 relative">
        <div
          className={`absolute inset-0 overflow-y-auto ${tab === 'plan' ? '' : 'hidden'}`}
        >
          <PlanView dayIdx={dayIdx} setDayIdx={setDayIdx} showOnMap={showOnMap} />
        </div>
        <div className={`absolute inset-0 ${tab === 'map' ? '' : 'hidden'}`}>
          <MapView
            active={tab === 'map'}
            filter={mapFilter}
            setFilter={setMapFilter}
            focus={focus}
            clearFocus={() => setFocus(null)}
          />
        </div>
        <div
          className={`absolute inset-0 overflow-y-auto ${tab === 'info' ? '' : 'hidden'}`}
        >
          <InfoView />
        </div>
      </main>

      <TabBar tab={tab} setTab={setTab} />
    </div>
  );
}

export default App;
