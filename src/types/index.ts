export type Account = {
  id: string
  name: string
  arr: number
  healthScore: number
  renewalDate: string
  openCtas: number
  lastContactDate: string
  csm: string
}

export type CTA = {
  id: string
  accountId: string
  title: string
  dueDate: string
  status: 'open' | 'closed'
  priority: 'high' | 'medium' | 'low'
}

export type Activity = {
  id: string
  accountId: string
  type: 'email' | 'call' | 'note' | 'cta'
  title: string
  description: string
  timestamp: string
}

export type Communication = {
  id: string
  accountId: string
  source: 'slack' | 'gmail'
  sender: string
  preview: string
  timestamp: string
  channel: string
}

export type Meeting = {
  id: string
  accountId: string
  title: string
  startTime: string
  durationMin: number
}
