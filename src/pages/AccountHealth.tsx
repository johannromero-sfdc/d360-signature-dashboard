import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HealthBadge } from '../components/HealthBadge'
import { getAllAccounts } from '../lib/data'
import { formatCurrency, formatDate } from '../lib/utils'
import type { Account } from '../types'

type SortKey = keyof Account
type FilterTier = 'all' | 'green' | 'yellow' | 'red'

export function AccountHealth() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<FilterTier>('all')
  const [sortKey, setSortKey] = useState<SortKey>('healthScore')
  const [sortAsc, setSortAsc] = useState(true)

  const accounts = getAllAccounts(
    undefined,
    filter === 'all' ? undefined : filter
  ).filter(a => a.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey]
      const cmp = typeof av === 'number' && typeof bv === 'number'
        ? av - bv
        : String(av).localeCompare(String(bv))
      return sortAsc ? cmp : -cmp
    })

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc(x => !x)
    else { setSortKey(key); setSortAsc(true) }
  }

  function SortHeader({ label, k }: { label: string; k: SortKey }) {
    return (
      <th
        className="text-left pb-2 font-semibold cursor-pointer select-none hover:text-[#0176D3] px-4"
        onClick={() => toggleSort(k)}
      >
        {label} {sortKey === k ? (sortAsc ? '↑' : '↓') : ''}
      </th>
    )
  }

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-[#032D60]">Account Health</h1>

      <div className="flex items-center gap-3 flex-wrap">
        <input
          className="border border-[#DDDBDA] rounded-[4px] px-3 py-1.5 text-[13px] w-64 focus:outline-none focus:border-[#0176D3]"
          placeholder="Search accounts…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {(['all', 'green', 'yellow', 'red'] as FilterTier[]).map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1.5 rounded-[4px] text-[12px] font-semibold border transition-colors ${
              filter === t
                ? 'bg-[#0176D3] text-white border-[#0176D3]'
                : 'bg-white text-[#706E6B] border-[#DDDBDA] hover:border-[#0176D3]'
            }`}
          >
            {t === 'all' ? 'All' : t === 'green' ? 'Healthy' : t === 'yellow' ? 'At Risk' : 'Critical'}
          </button>
        ))}
        <span className="text-[12px] text-[#706E6B] ml-auto">{accounts.length} accounts</span>
      </div>

      <div className="bg-white border border-[#DDDBDA] rounded-[4px]">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-[11px] text-[#706E6B] border-b border-[#DDDBDA]">
              <SortHeader label="Account" k="name" />
              <SortHeader label="Health Score" k="healthScore" />
              <SortHeader label="ARR" k="arr" />
              <SortHeader label="Renewal Date" k="renewalDate" />
              <SortHeader label="Open CTAs" k="openCtas" />
              <SortHeader label="Last Contact" k="lastContactDate" />
            </tr>
          </thead>
          <tbody>
            {accounts.map(a => (
              <tr
                key={a.id}
                className="border-b border-[#DDDBDA] last:border-0 hover:bg-[#EAF4FF] cursor-pointer"
                onClick={() => navigate(`/accounts/${a.id}`)}
              >
                <td className="px-4 py-2.5 font-medium text-[#0176D3]">{a.name}</td>
                <td className="px-4 py-2.5"><HealthBadge score={a.healthScore} /></td>
                <td className="px-4 py-2.5">{formatCurrency(a.arr)}</td>
                <td className="px-4 py-2.5 text-[#706E6B]">{formatDate(a.renewalDate)}</td>
                <td className="px-4 py-2.5 text-center">{a.openCtas}</td>
                <td className="px-4 py-2.5 text-[#706E6B]">{formatDate(a.lastContactDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
