import { useState } from 'react'
import { getRecentComms, getAccountName } from '../lib/data'
import { relativeTime } from '../lib/utils'

export function SlackPage() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const threads = getRecentComms('slack')

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-[#032D60]">Slack</h1>

      <div className="bg-white border border-[#DDDBDA] rounded-[4px] divide-y divide-[#DDDBDA]">
        {threads.map(t => (
          <div key={t.id}>
            <button
              className="w-full flex items-start gap-3 p-4 hover:bg-[#F3F3F3] text-left"
              onClick={() => setExpanded(expanded === t.id ? null : t.id)}
            >
              <span className="text-xl mt-0.5">💬</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[13px] font-semibold text-[#032D60]">{t.channel}</span>
                  <span className="text-[11px] text-[#706E6B]">· {getAccountName(t.accountId)}</span>
                </div>
                <p className="text-[12px] text-[#706E6B] truncate">
                  <span className="font-medium text-[#3E3E3C]">{t.sender}:</span> {t.preview}
                </p>
              </div>
              <span className="text-[11px] text-[#706E6B] shrink-0">{relativeTime(t.timestamp)}</span>
            </button>
            {expanded === t.id && (
              <div className="bg-[#F3F3F3] px-14 py-3 border-t border-[#DDDBDA]">
                <p className="text-[12px] text-[#706E6B] mb-2 font-semibold">THREAD PREVIEW</p>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <span className="font-semibold text-[12px] text-[#032D60] w-32 shrink-0">{t.sender}</span>
                    <span className="text-[12px] text-[#3E3E3C]">{t.preview}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold text-[12px] text-[#032D60] w-32 shrink-0">You</span>
                    <span className="text-[12px] text-[#706E6B] italic">Full thread available after Slack integration (phase 2)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
