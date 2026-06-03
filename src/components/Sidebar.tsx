import { NavLink } from 'react-router-dom'

const sections = [
  {
    label: 'OVERVIEW',
    items: [
      { to: '/', icon: '🏠', label: "Today's Focus", end: true },
      { to: '/portfolio', icon: '📊', label: 'Portfolio', end: false },
    ],
  },
  {
    label: 'ACCOUNTS',
    items: [
      { to: '/health', icon: '❤️', label: 'Account Health', end: false },
      { to: '/activity', icon: '📋', label: 'Activity Log', end: false },
    ],
  },
  {
    label: 'COMMUNICATIONS',
    items: [
      { to: '/slack', icon: '💬', label: 'Slack', end: false },
      { to: '/gmail', icon: '✉️', label: 'Gmail', end: false },
    ],
  },
]

export function Sidebar() {
  return (
    <aside className="w-56 bg-white border-r border-[#DDDBDA] flex flex-col shrink-0 h-full overflow-y-auto">
      <nav className="flex-1 py-4">
        {sections.map(s => (
          <div key={s.label} className="mb-4">
            <p className="px-4 text-[10px] font-semibold text-[#706E6B] tracking-widest mb-1">{s.label}</p>
            {s.items.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-4 py-2 text-[13px] border-l-2 transition-colors ${
                    isActive
                      ? 'border-[#0176D3] bg-[#EAF4FF] text-[#032D60] font-semibold'
                      : 'border-transparent text-[#3E3E3C] hover:bg-[#F3F3F3]'
                  }`
                }
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
      <div className="border-t border-[#DDDBDA] p-4 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-[#0176D3] flex items-center justify-center text-white text-xs font-bold shrink-0">JR</div>
        <div className="min-w-0">
          <p className="text-[12px] font-semibold text-[#032D60] truncate">Johann Romero</p>
          <p className="text-[11px] text-[#706E6B] truncate">CSM — Signature Success</p>
        </div>
      </div>
    </aside>
  )
}
