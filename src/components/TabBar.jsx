const TABS = [
  { id: 'plan', emoji: '🗓️', label: 'Plan' },
  { id: 'map', emoji: '🗺️', label: 'Map' },
  { id: 'info', emoji: '🎒', label: 'Info' },
];

function TabBar({ tab, setTab }) {
  return (
    <nav
      className="shrink-0 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)]"
      aria-label="Main"
    >
      <div className="grid grid-cols-3">
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              aria-current={active ? 'page' : undefined}
              className={`flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-bold transition-colors ${
                active ? 'text-ink' : 'text-muted'
              }`}
            >
              <span
                className={`text-xl leading-none transition-transform ${active ? 'scale-110' : 'opacity-70'}`}
                aria-hidden="true"
              >
                {t.emoji}
              </span>
              {t.label}
              <span
                className={`h-1 w-8 rounded-full ${active ? 'bg-ink' : 'bg-transparent'}`}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default TabBar;
