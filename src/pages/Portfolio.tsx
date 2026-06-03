import type { ReactNode } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { StatCard } from '../components/StatCard'
import { HealthBadge } from '../components/HealthBadge'
import { getAllAccounts, getRenewalsWithin } from '../lib/data'
import { formatCurrency, formatDate, healthTier } from '../lib/utils'

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-white border border-[#DDDBDA] rounded-[4px] p-4">
      <h2 className="text-[12px] font-semibold text-[#706E6B] uppercase tracking-wide mb-3">{title}</h2>
      {children}
    </div>
  )
}

export function Portfolio() {
  const accounts = getAllAccounts('renewalDate')
  const totalArr = accounts.reduce((s, a) => s + a.arr, 0)
  const renewals90 = getRenewalsWithin(90)
  const renewalArr = renewals90.reduce((s, a) => s + a.arr, 0)
  const escalations = accounts.filter(a => a.healthScore < 35).length

  const greenCount = accounts.filter(a => healthTier(a.healthScore) === 'green').length
  const yellowCount = accounts.filter(a => healthTier(a.healthScore) === 'yellow').length
  const redCount = accounts.filter(a => healthTier(a.healthScore) === 'red').length

  const pieData = [
    { name: 'Healthy', value: greenCount, color: '#2E7D32' },
    { name: 'At Risk', value: yellowCount, color: '#A16403' },
    { name: 'Critical', value: redCount, color: '#BA0517' },
  ]

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-[#032D60]">Portfolio</h1>

      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Total ARR" value={formatCurrency(totalArr)} accent="blue" />
        <StatCard label="Accounts" value={accounts.length} accent="blue" />
        <StatCard label="Open Escalations" value={escalations} accent={escalations > 0 ? 'red' : 'green'} />
        <StatCard label="Renewal Pipeline (<90d)" value={formatCurrency(renewalArr)} sub={`${renewals90.length} accounts`} accent="yellow" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <Card title="Renewal Timeline">
            <div className="space-y-0">
              {accounts.map(a => {
                const days = Math.ceil((new Date(a.renewalDate).getTime() - new Date('2026-06-03').getTime()) / 86_400_000)
                return (
                  <div key={a.id} className="flex items-center gap-3 py-2 border-b border-[#DDDBDA] last:border-0">
                    <div className="w-24 text-[11px] text-[#706E6B] shrink-0">{formatDate(a.renewalDate)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-[#032D60]">{a.name}</p>
                      <p className="text-[11px] text-[#706E6B]">{formatCurrency(a.arr)}</p>
                    </div>
                    <HealthBadge score={a.healthScore} />
                    <span className={`text-[12px] font-semibold w-12 text-right shrink-0 ${days <= 90 ? 'text-[#BA0517]' : 'text-[#706E6B]'}`}>{days}d</span>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>

        <Card title="Health Distribution">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={3}>
                {pieData.map(entry => <Cell key={entry.name} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v: number, n: string) => [`${v} accounts`, n]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-1.5 mt-2">
            {pieData.map(d => (
              <div key={d.name} className="flex items-center gap-2 text-[12px]">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ background: d.color }} />
                <span className="text-[#032D60]">{d.name}</span>
                <span className="ml-auto font-semibold text-[#706E6B]">{d.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="All Accounts">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-[11px] text-[#706E6B] border-b border-[#DDDBDA]">
              <th className="text-left pb-2 font-semibold">Account</th>
              <th className="text-right pb-2 font-semibold">ARR</th>
              <th className="text-left pb-2 font-semibold">Health</th>
              <th className="text-left pb-2 font-semibold">Renewal</th>
              <th className="text-right pb-2 font-semibold">Open CTAs</th>
              <th className="text-left pb-2 font-semibold">Last Contact</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map(a => (
              <tr key={a.id} className="border-b border-[#DDDBDA] last:border-0 hover:bg-[#F3F3F3]">
                <td className="py-2 font-medium text-[#032D60]">{a.name}</td>
                <td className="py-2 text-right">{formatCurrency(a.arr)}</td>
                <td className="py-2"><HealthBadge score={a.healthScore} /></td>
                <td className="py-2 text-[#706E6B]">{formatDate(a.renewalDate)}</td>
                <td className="py-2 text-right">{a.openCtas}</td>
                <td className="py-2 text-[#706E6B]">{formatDate(a.lastContactDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
