import type { Activity } from '../types'
import { relativeTime } from '../lib/utils'
import { getAccountName } from '../lib/data'

const iconMap: Record<Activity['type'], string> = {
  email: '✉️',
  call: '📞',
  note: '📝',
  cta: '🔔',
}

export function ActivityItem({ activity }: { activity: Activity }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-[#DDDBDA] last:border-0">
      <span className="text-base mt-0.5">{iconMap[activity.type]}</span>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-[#032D60]">{activity.title}</p>
        <p className="text-[11px] text-[#706E6B] truncate">{getAccountName(activity.accountId)} · {activity.description}</p>
      </div>
      <span className="text-[11px] text-[#706E6B] shrink-0">{relativeTime(activity.timestamp)}</span>
    </div>
  )
}
