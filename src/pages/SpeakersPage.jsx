import { useEffect } from 'react'
import { Footer } from '../components/layout/SiteLayout'
import Panelists from '../features/speakers/Panelists'
import { REGISTER_URL } from '../config/urls'

export default function SpeakersPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-white/10 bg-black/95 px-6 backdrop-blur-md md:h-[72px] md:px-10">
        <a href="/" className="flex shrink-0 items-center" aria-label="10 Hours Houston home">
          <img className="block h-auto w-[120px]" src="/10-hours-houston-logo.svg" alt="10 Hours Houston" />
        </a>
        <div className="flex items-center gap-5">
          <a href="/#panelists" className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/60 transition-colors hover:text-white">
            ← Back home
          </a>
          <a className="hidden bg-[#f73301] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors hover:bg-[#c42a01] sm:inline-flex" href={REGISTER_URL} target="_blank" rel="noreferrer">
            Register
          </a>
        </div>
      </header>

      <main>
        <Panelists showAll />
      </main>
      <Footer />
    </div>
  )
}

