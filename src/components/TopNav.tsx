export function TopNav() {
  return (
    <header className="h-12 bg-[#032D60] flex items-center px-4 gap-3 shrink-0 z-20">
      <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2a8 8 0 110 16A8 8 0 0112 4zm-1 3v5l4 2.5-.75 1.23L10 13V7h1z"/>
      </svg>
      <span className="text-white font-semibold text-sm tracking-wide">Signature Success</span>
      <div className="ml-auto flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-[#0176D3] flex items-center justify-center text-white text-xs font-bold">JR</div>
      </div>
    </header>
  )
}
