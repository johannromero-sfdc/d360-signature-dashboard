type Props = {
  label: string
  value: string | number
  sub?: string
  accent?: 'blue' | 'red' | 'yellow' | 'green'
}

const accentMap = {
  blue: 'border-t-[#0176D3]',
  red: 'border-t-[#BA0517]',
  yellow: 'border-t-[#A16403]',
  green: 'border-t-[#2E7D32]',
}

export function StatCard({ label, value, sub, accent = 'blue' }: Props) {
  return (
    <div className={`bg-white border border-[#DDDBDA] rounded-[4px] p-4 border-t-2 ${accentMap[accent]}`}>
      <p className="text-[11px] text-[#706E6B] uppercase tracking-wide mb-1">{label}</p>
      <p className="text-2xl font-bold text-[#032D60]">{value}</p>
      {sub && <p className="text-[11px] text-[#706E6B] mt-1">{sub}</p>}
    </div>
  )
}
