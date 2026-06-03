import { useParams, useNavigate } from 'react-router-dom'
import { HealthBadge } from '../components/HealthBadge'
import { CTARow } from '../components/CTARow'
import { ActivityItem } from '../components/ActivityItem'
import { getAccountById, getOpenCtas, getRecentActivity } from '../lib/data'
import { formatCurrency, formatDate, daysUntil } from '../lib/utils'

export function AccountDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const account = getAccountById(id ?? '')

  if (!account) return (
    <div className="text-[#706E6B] p-8">
      Account not found.{' '}
      <button className="text-[#0176D3] underline" onClick={() => navigate('/health')}>Back to health</button>
    </div>
  )

  const ctas = getOpenCtas(account.id)
  const activities = getRecentActivity(account.id, 10)
  const daysToRenewal = daysUntil(account.renewalDate)

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <button className="text-[#0176D3] text-[13px] hover:underline" onClick={() => navigate('/health')}>
          ← Account Health
        </button>
        <span className="text-[#DDDBDA]">/</span>
        <h1 className="text-xl font-bold text-[#032D60]">{account.name}</h1>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-[#DDDBDA] rounded-[4px] p-4">
          <p className="text-[11px] text-[#706E6B] uppercase tracking-wide mb-2">Health Score</p>
          <HealthBadge score={account.healthScore} />
        </div>
        <div className="bg-white border border-[#DDDBDA] rounded-[4px] p-4">
          <p className="text-[11px] text-[#706E6B] uppercase tracking-wide mb-1">ARR</p>
          <p className="text-xl font-bold text-[#032D60]">{formatCurrency(account.arr)}</p>
        </div>
        <div className="bg-white border border-[#DDDBDA] rounded-[4px] p-4">
          <p className="text-[11px] text-[#706E6B] uppercase tracking-wide mb-1">Renewal Date</p>
          <p className="text-base font-semibold text-[#032D60]">{formatDate(account.renewalDate)}</p>
          <p className={`text-[11px] ${daysToRenewal <= 90 ? 'text-[#BA0517]' : 'text-[#706E6B]'}`}>{daysToRenewal} days away</p>
        </div>
        <div className="bg-white border border-[#DDDBDA] rounded-[4px] p-4">
          <p className="text-[11px] text-[#706E6B] uppercase tracking-wide mb-1">Last Contact</p>
          <p className="text-base font-semibold text-[#032D60]">{formatDate(account.lastContactDate)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-[#DDDBDA] rounded-[4px] p-4">
          <h2 className="text-[12px] font-semibold text-[#706E6B] uppercase tracking-wide mb-3">
            Open CTAs ({ctas.length})
          </h2>
          {ctas.length === 0
            ? <p className="text-[13px] text-[#706E6B]">No open CTAs.</p>
            : ctas.map(c => <CTARow key={c.id} cta={c} />)
          }
        </div>
        <div className="bg-white border border-[#DDDBDA] rounded-[4px] p-4">
          <h2 className="text-[12px] font-semibold text-[#706E6B] uppercase tracking-wide mb-3">Recent Activity</h2>
          {activities.length === 0
            ? <p className="text-[13px] text-[#706E6B]">No activity recorded.</p>
            : activities.map(a => <ActivityItem key={a.id} activity={a} />)
          }
        </div>
      </div>
    </div>
  )
}
