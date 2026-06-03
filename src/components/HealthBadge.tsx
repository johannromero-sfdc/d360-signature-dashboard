import { healthTier } from '../lib/utils'

const styles = {
  green: 'bg-[#EDF7EE] text-[#2E7D32]',
  yellow: 'bg-[#FEF3C7] text-[#A16403]',
  red: 'bg-[#FEEEF0] text-[#BA0517]',
}

const labels = { green: 'Healthy', yellow: 'At Risk', red: 'Critical' }

export function HealthBadge({ score }: { score: number }) {
  const tier = healthTier(score)
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${styles[tier]}`}>
      <span>{score}</span>
      <span className="font-normal">· {labels[tier]}</span>
    </span>
  )
}
