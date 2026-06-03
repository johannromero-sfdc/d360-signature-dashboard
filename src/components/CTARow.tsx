import type { CTA } from '../types'
import { PriorityBadge } from './PriorityBadge'
import { getAccountName } from '../lib/data'

const TODAY = '2026-06-03'

function ctaDotColor(cta: CTA): string {
  if (cta.dueDate < TODAY) return 'bg-[#BA0517]'
  if (cta.dueDate === TODAY) return 'bg-[#A16403]'
  return 'bg-[#0176D3]'
}

function ctaDateLabel(cta: CTA): string {
  if (cta.dueDate < TODAY) return `Overdue · ${cta.dueDate}`
  if (cta.dueDate === TODAY) return 'Due today'
  return `Due ${cta.dueDate}`
}

export function CTARow({ cta }: { cta: CTA }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-[#DDDBDA] last:border-0">
      <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${ctaDotColor(cta)}`} />
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-[#032D60] truncate">{cta.title}</p>
        <p className="text-[11px] text-[#706E6B]">{getAccountName(cta.accountId)} · {ctaDateLabel(cta)}</p>
      </div>
      <PriorityBadge priority={cta.priority} />
    </div>
  )
}
