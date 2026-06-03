import type { Communication } from '../types'
import { relativeTime } from '../lib/utils'
import { getAccountName } from '../lib/data'

export function CommRow({ comm }: { comm: Communication }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-[#DDDBDA] last:border-0">
      <span className="text-base mt-0.5">{comm.source === 'slack' ? '💬' : '✉️'}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${comm.source === 'slack' ? 'bg-[#4A154B] text-white' : 'bg-[#EA4335] text-white'}`}>
            {comm.source}
          </span>
          <span className="text-[12px] font-medium text-[#032D60]">{getAccountName(comm.accountId)}</span>
        </div>
        <p className="text-[11px] text-[#706E6B] line-clamp-2">{comm.preview}</p>
      </div>
      <span className="text-[11px] text-[#706E6B] shrink-0">{relativeTime(comm.timestamp)}</span>
    </div>
  )
}
