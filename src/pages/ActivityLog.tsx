import { useState } from 'react'
import { ActivityItem } from '../components/ActivityItem'
import { getRecentActivity, getAllAccounts } from '../lib/data'
import type { Activity } from '../types'

type TypeFilter = 'all' | Activity['type']

export function ActivityLog() {
  const [accountFilter, setAccountFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all')

  const accounts = getAllAccounts()
  let activities = getRecentActivity(accountFilter === 'all' ? undefined : accountFilter, 100)
  if (typeFilter !== 'all') activities = activities.filter(a => a.type === typeFilter)

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-[#032D60]">Activity Log</h1>

      <div className="flex items-center gap-3 flex-wrap">
        <select
          className="border border-[#DDDBDA] rounded-[4px] px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#0176D3] bg-white"
          value={accountFilter}
          onChange={e => setAccountFilter(e.target.value)}
        >
          <option value="all">All Accounts</option>
          {accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
        </select>

        {(['all', 'email', 'call', 'note', 'cta'] as TypeFilter[]).map(t => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`px-3 py-1.5 rounded-[4px] text-[12px] font-semibold border transition-colors ${
              typeFilter === t
                ? 'bg-[#0176D3] text-white border-[#0176D3]'
                : 'bg-white text-[#706E6B] border-[#DDDBDA] hover:border-[#0176D3]'
            }`}
          >
            {t === 'all' ? 'All Types' : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
        <span className="text-[12px] text-[#706E6B] ml-auto">{activities.length} items</span>
      </div>

      <div className="bg-white border border-[#DDDBDA] rounded-[4px] p-4">
        {activities.length === 0
          ? <p className="text-[13px] text-[#706E6B]">No activities match the selected filters.</p>
          : activities.map(a => <ActivityItem key={a.id} activity={a} />)
        }
      </div>
    </div>
  )
}
