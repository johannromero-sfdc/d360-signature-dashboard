import { Routes, Route } from 'react-router-dom'
import { TopNav } from './components/TopNav'
import { Sidebar } from './components/Sidebar'
import { TodaysFocus } from './pages/TodaysFocus'
import { Portfolio } from './pages/Portfolio'
import { AccountHealth } from './pages/AccountHealth'
import { AccountDetail } from './pages/AccountDetail'
import { ActivityLog } from './pages/ActivityLog'
import { SlackPage } from './pages/SlackPage'
import { GmailPage } from './pages/GmailPage'

export default function App() {
  return (
    <div className="flex flex-col h-screen bg-[#F3F3F3]">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<TodaysFocus />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/health" element={<AccountHealth />} />
            <Route path="/accounts/:id" element={<AccountDetail />} />
            <Route path="/activity" element={<ActivityLog />} />
            <Route path="/slack" element={<SlackPage />} />
            <Route path="/gmail" element={<GmailPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
