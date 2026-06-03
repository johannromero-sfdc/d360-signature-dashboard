const styles = {
  high: 'bg-[#FEEEF0] text-[#BA0517]',
  medium: 'bg-[#FEF3C7] text-[#A16403]',
  low: 'bg-[#EDF7EE] text-[#2E7D32]',
}

export function PriorityBadge({ priority }: { priority: 'high' | 'medium' | 'low' }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${styles[priority]}`}>
      {priority}
    </span>
  )
}
