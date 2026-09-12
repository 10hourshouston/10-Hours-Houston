import HomePage from './pages/HomePage'
import SchedulePage from './pages/SchedulePage'
import SpeakersPage from './pages/SpeakersPage'
import SponsorPage from './pages/SponsorPage'

export default function App() {
  const currentPath = window.location.pathname.replace(/\/+$/, '')
  const isSpeakersPage = currentPath === '/speakers'
    || new URLSearchParams(window.location.search).get('view') === 'speakers'

  if (currentPath === '/schedule') return <SchedulePage />
  if (currentPath === '/sponsors') return <SponsorPage />
  return isSpeakersPage ? <SpeakersPage /> : <HomePage />
}
