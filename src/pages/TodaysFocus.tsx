import type { ReactNode } from 'react'
import { StatCard } from '../components/StatCard'
import { CTARow } from '../components/CTARow'
import { ActivityItem } from '../components/ActivityItem'
import { CommRow } from '../components/CommRow'
import { HealthBadge } from '../components/HealthBadge'
import {
  getCtasDueToday, getOverdueCtas, getAtRiskAccounts, getRenewalsWithin,
  getTodaysMeetings, getRecentActivity, getRecentComms, getAllCtasSorted, getAccountName
} from '../lib/data'
import { formatCurrency } from '../lib/utils'

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-white border border-[#DDDBDA] rounded-[4px] p-4">
      <h2 className="text-[12px] font-semibold text-[#706E6B] uppercase tracking-wide mb-3">{title}</h2>
      {children}
    </div>
  )
}

export function TodaysFocus() {
  const ctasToday = getCtasDueToday()
  const overdue = getOverdueCtas()
  const atRisk = getAtRiskAccounts()
  const renewalsSoon = getRenewalsWithin(90)
  const meetings = getTodaysMeetings()
  const topCtas = getAllCtasSorted().slice(0, 8)
  const recentActivity = getRecentActivity(undefined, 4)
  const recentSlack = getRecentComms('slack').slice(0, 5)
  const recentGmail = getRecentComms('gmail').slice(0, 5)

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-[#032D60]">Today's Focus</h1>

      <div className="grid grid-cols-4 gap-4">
        <StatCard
          label="CTAs Due Today"
          value={ctasToday.length}
          sub={`${overdue.length} overdue`}
          accent={overdue.length > 0 ? 'red' : 'blue'}
        />
        <StatCard label="Meetings Today" value={meetings.length} accent="blue" />
        <StatCard
          label="At-Risk Accounts"
          value={atRisk.length}
          sub="health score < 65"
          accent="yellow"
        />
        <StatCard
          label="Renewals <90 Days"
          value={renewalsSoon.length}
          sub={renewalsSoon.length > 0 ? `Next: ${renewalsSoon[0].name}` : undefined}
          accent="green"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card title="Open CTAs">
          {topCtas.map(cta => <CTARow key={cta.id} cta={cta} />)}
        </Card>

        <Card title="Today's Meetings">
          {meetings.length === 0 && <p className="text-[13px] text-[#706E6B]">No meetings today.</p>}
          {meetings.map(m => (
            <div key={m.id} className="flex items-start gap-3 py-2.5 border-b border-[#DDDBDA] last:border-0">
              <div className="text-[#0176D3] font-bold text-[12px] w-16 shrink-0 pt-0.5">
                {new Date(m.startTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
              </div>
              <div>
                <p className="text-[13px] font-medium text-[#032D60]">{m.title}</p>
                <p className="text-[11px] text-[#706E6B]">{getAccountName(m.accountId)} · {m.durationMin} min</p>
                <p className="text-[11px] text-[#DDDBDA] mt-1 italic">Post-call notes available after meeting (phase 2)</p>
              </div>
            </div>
          ))}
        </Card>
      </div>

      <Card title="Account Health Snapshot — Most At Risk">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-[11px] text-[#706E6B] border-b border-[#DDDBDA]">
              <th className="text-left pb-2 font-semibold">Account</th>
              <th className="text-left pb-2 font-semibold">Health</th>
              <th className="text-right pb-2 font-semibold">ARR</th>
              <th className="text-right pb-2 font-semibold">Renewal In</th>
            </tr>
          </thead>
          <tbody>
            {atRisk.slice(0, 5).map(a => {
              const days = Math.ceil((new Date(a.renewalDate).getTime() - new Date('2026-06-03').getTime()) / 86_400_000)
              return (
                <tr key={a.id} className="border-b border-[#DDDBDA] last:border-0">
                  <td className="py-2 font-medium">{a.name}</td>
                  <td className="py-2"><HealthBadge score={a.healthScore} /></td>
                  <td className="py-2 text-right">{formatCurrency(a.arr)}</td>
                  <td className={`py-2 text-right font-medium ${days <= 90 ? 'text-[#BA0517]' : 'text-[#032D60]'}`}>{days}d</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Card>

      <Card title="Recent Activity">
        {recentActivity.map(a => <ActivityItem key={a.id} activity={a} />)}
      </Card>

      <Card title="Recent Communications">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-[11px] font-semibold text-[#706E6B] mb-2">SLACK</p>
            {recentSlack.map(c => <CommRow key={c.id} comm={c} />)}
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#706E6B] mb-2">GMAIL</p>
            {recentGmail.map(c => <CommRow key={c.id} comm={c} />)}
          </div>
        </div>
      </Card>
    </div>
  )
}
