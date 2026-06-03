import type { Account, CTA, Activity, Communication, Meeting } from '../types'
import accountsRaw from '../mock-data/accounts.json'
import ctasRaw from '../mock-data/ctas.json'
import activitiesRaw from '../mock-data/activities.json'
import commsRaw from '../mock-data/communications.json'
import meetingsRaw from '../mock-data/meetings.json'

const accounts = accountsRaw as Account[]
const ctas = ctasRaw as CTA[]
const activities = activitiesRaw as Activity[]
const communications = commsRaw as Communication[]
const meetings = meetingsRaw as Meeting[]

const TODAY = '2026-06-03'

export function getCtasDueToday(): CTA[] {
  return ctas.filter(c => c.status === 'open' && c.dueDate === TODAY)
}

export function getOverdueCtas(): CTA[] {
  return ctas.filter(c => c.status === 'open' && c.dueDate < TODAY)
}

export function getOpenCtas(accountId?: string): CTA[] {
  const open = ctas.filter(c => c.status === 'open')
  return accountId ? open.filter(c => c.accountId === accountId) : open
}

export function getAtRiskAccounts(): Account[] {
  return accounts.filter(a => a.healthScore < 65).sort((a, b) => a.healthScore - b.healthScore)
}

export function getRenewalsWithin(days: number): Account[] {
  const cutoff = new Date(TODAY)
  cutoff.setDate(cutoff.getDate() + days)
  return accounts.filter(a => new Date(a.renewalDate) <= cutoff && new Date(a.renewalDate) >= new Date(TODAY))
}

export function getTodaysMeetings(): Meeting[] {
  return meetings.filter(m => m.startTime.startsWith(TODAY))
}

export function getRecentActivity(accountId?: string, limit = 10): Activity[] {
  const filtered = accountId ? activities.filter(a => a.accountId === accountId) : activities
  return [...filtered].sort((a, b) => b.timestamp.localeCompare(a.timestamp)).slice(0, limit)
}

export function getRecentComms(source?: 'slack' | 'gmail', accountId?: string): Communication[] {
  let filtered = communications
  if (source) filtered = filtered.filter(c => c.source === source)
  if (accountId) filtered = filtered.filter(c => c.accountId === accountId)
  return [...filtered].sort((a, b) => b.timestamp.localeCompare(a.timestamp))
}

export function getAccountById(id: string): Account | undefined {
  return accounts.find(a => a.id === id)
}

export function getAllAccounts(sortBy?: keyof Account, filterTier?: 'green' | 'yellow' | 'red'): Account[] {
  let result = [...accounts]
  if (filterTier) {
    const ranges: Record<string, [number, number]> = { green: [75, 100], yellow: [50, 74], red: [0, 49] }
    const [min, max] = ranges[filterTier]
    result = result.filter(a => a.healthScore >= min && a.healthScore <= max)
  }
  if (sortBy) {
    result.sort((a, b) => {
      const av = a[sortBy], bv = b[sortBy]
      if (typeof av === 'number' && typeof bv === 'number') return av - bv
      return String(av).localeCompare(String(bv))
    })
  }
  return result
}

export function getAllCtasSorted(): CTA[] {
  const priority: Record<string, number> = { high: 0, medium: 1, low: 2 }
  return ctas
    .filter(c => c.status === 'open')
    .sort((a, b) => {
      const aOverdue = a.dueDate < TODAY, bOverdue = b.dueDate < TODAY
      const aToday = a.dueDate === TODAY, bToday = b.dueDate === TODAY
      if (aOverdue !== bOverdue) return aOverdue ? -1 : 1
      if (aToday !== bToday) return aToday ? -1 : 1
      if (a.dueDate !== b.dueDate) return a.dueDate.localeCompare(b.dueDate)
      return priority[a.priority] - priority[b.priority]
    })
}

export function getAccountName(id: string): string {
  return getAccountById(id)?.name ?? id
}
