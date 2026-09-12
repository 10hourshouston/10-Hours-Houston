import { useEffect, useState } from 'react'
import BinaryBg from '../components/BinaryBg'
import { Footer, InnerPageHeader } from '../components/layout/SiteLayout'
import { REGISTER_URL } from '../config/urls'

import { scheduleItems, scheduleMovements } from '../data/schedule'

export default function SchedulePage() {
  const [movement, setMovement] = useState('all')
  const [query, setQuery] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const normalizedQuery = query.trim().toLowerCase()
  const filteredItems = scheduleItems.filter((item) => {
    const matchesMovement = movement === 'all' || item.movement === movement
    const matchesQuery = !normalizedQuery || [item.title, item.type, item.description]
      .some((value) => value.toLowerCase().includes(normalizedQuery))
    return matchesMovement && matchesQuery
  })

  return (
    <div className="schedule-page min-h-screen bg-[#f4f1eb] text-[#171717]">
      <InnerPageHeader />

      <main>
        <section className="relative overflow-hidden bg-black px-6 pb-20 pt-16 text-white md:pb-28 md:pt-24" aria-labelledby="schedule-page-heading">
          <BinaryBg opacity={0.045} rows={40} cols={90} speed={60} />
          <div className="relative mx-auto max-w-7xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#f73301]">Program of the Day</p>
            <div className="mt-7 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <h1 id="schedule-page-heading" className="text-[clamp(3.8rem,10vw,8.5rem)] font-bold leading-[0.82] tracking-[-0.07em]">
                  The<br /><span className="text-[#f73301]">Schedule.</span>
                </h1>
                <p className="mt-10 max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl">
                  Ten hours. Four movements. One encounter — from worship and consecration to conversation, impartation, and commissioning.
                </p>
              </div>
              <div className="border-l border-white/15 pl-6 text-sm leading-7 text-white/60 lg:mb-2 lg:min-w-72">
                <p className="font-semibold text-white">Saturday, October 31, 2026</p>
                <p>10:00 AM — 8:00 PM</p>
                <p>Dominion Chapel Houston</p>
                <p>Stafford, Texas</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:py-24" aria-label="Event schedule">
          <div className="mx-auto max-w-7xl">
            <div className="border-b border-black/15 pb-10">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/40">Find a session</p>
                  <p className="mt-2 text-sm text-black/55">Search by session name, type, or topic.</p>
                </div>
                <label className="relative block w-full md:max-w-md">
                  <span className="sr-only">Search the schedule</span>
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search the program"
                    className="h-14 w-full border border-black/20 bg-white px-5 pr-12 text-base outline-none transition-colors placeholder:text-black/35 focus:border-[#f73301]"
                  />
                  <svg
                    className="pointer-events-none absolute right-4 top-1/2 h-[22px] w-[22px] -translate-y-1/2 text-black/40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <circle cx="10.75" cy="10.75" r="6.75" />
                    <path d="m16 16 4.25 4.25" />
                  </svg>
                </label>
              </div>

              <div className="schedule-filters mt-8 flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Filter by movement">
                <button type="button" onClick={() => setMovement('all')} aria-pressed={movement === 'all'} className={`schedule-filter ${movement === 'all' ? 'is-active' : ''}`}>All program</button>
                {Object.entries(scheduleMovements).map(([key, item]) => (
                  <button key={key} type="button" onClick={() => setMovement(key)} aria-pressed={movement === key} className={`schedule-filter ${movement === key ? 'is-active' : ''}`}>
                    {item.numeral} · {item.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 flex items-center justify-between gap-6">
              <p className="text-sm font-semibold">Showing {filteredItems.length} {filteredItems.length === 1 ? 'entry' : 'entries'}</p>
              <p className="text-right text-xs text-black/45">Times are indicative and may shift as the day unfolds.</p>
            </div>

            <div className="mt-12">
              {filteredItems.length === 0 ? (
                <div className="border border-black/10 bg-white px-6 py-16 text-center">
                  <p className="text-2xl font-semibold">No sessions found.</p>
                  <button type="button" onClick={() => { setQuery(''); setMovement('all') }} className="mt-5 text-sm font-semibold text-[#f73301] underline underline-offset-4">Clear filters</button>
                </div>
              ) : Object.keys(scheduleMovements).map((movementKey) => {
                const movementItems = filteredItems.filter((item) => item.movement === movementKey)
                if (!movementItems.length) return null
                const details = scheduleMovements[movementKey]
                return (
                  <section key={movementKey} className="mb-16" aria-labelledby={`movement-${movementKey}`}>
                    <div className="mb-5 grid gap-4 border-t-2 border-black pt-5 md:grid-cols-[80px_1fr_auto] md:items-end">
                      <p className="text-lg font-bold text-[#f73301]">{details.numeral}</p>
                      <div>
                        <h2 id={`movement-${movementKey}`} className="text-3xl font-bold tracking-[-0.035em] md:text-4xl">{details.title}</h2>
                        <p className="mt-1 font-serif italic text-black/50">{details.subtitle}</p>
                      </div>
                      <div className="text-sm md:text-right">
                        <p className="font-semibold">{details.time}</p>
                        <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-black/40">{details.count}</p>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      {movementItems.map((item, index) => (
                        <article key={`${item.time}-${item.title}`} className={`schedule-card grid gap-6 border border-black/10 p-6 md:grid-cols-[170px_1fr] md:p-8 ${item.interval ? 'is-interval' : ''} ${item.featured ? 'is-featured' : ''}`}>
                          <div>
                            <p className="text-sm font-bold tabular-nums">{item.time}</p>
                            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/40">{item.duration}</p>
                          </div>
                          <div className="relative md:border-l md:border-black/10 md:pl-8">
                            <p className={`text-[10px] font-semibold uppercase tracking-[0.24em] ${item.featured ? 'text-[#f73301]' : 'text-black/40'}`}>{item.type}</p>
                            <h3 className="mt-2 text-xl font-semibold leading-tight tracking-[-0.02em] md:text-2xl">{item.title}</h3>
                            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-black/60 md:text-base">{item.description}</p>
                            {item.featured && <span className="absolute -left-[5px] top-0 hidden size-[9px] rounded-full bg-[#f73301] md:block" aria-hidden="true" />}
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#f73301] px-6 py-16 text-white md:py-20">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/65">Take your place</p>
              <h2 className="mt-3 text-4xl font-bold tracking-[-0.045em] md:text-5xl">Be in the room.</h2>
            </div>
            <a href={REGISTER_URL} target="_blank" rel="noreferrer" className="schedule-register-cta inline-flex self-start border border-white px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors">Register now →</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}


