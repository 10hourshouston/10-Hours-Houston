import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { BLUR_SPEAKER_DETAILS } from '../../config/feature_flags'
import { SocialIcon } from '../../components/layout/SiteLayout'

import { panelists } from '../../data/panelists'

const panelistCardColors = ['#edf3f3', '#f6c9b9', '#d9e2f5', '#e8e4d9', '#dce8cf', '#f2d6c9']

function PanelistPortraitFrame({ panelist, className = '', children }) {
  return (
    <span className={`relative block aspect-[4/5] overflow-hidden bg-black/10 ${className}`}>
      <img
        src={panelist.photo}
        alt={BLUR_SPEAKER_DETAILS ? '' : panelist.name}
        className={`h-full w-full object-cover object-top transition-[filter,transform] duration-700 ${BLUR_SPEAKER_DETAILS ? 'speaker-photo-blurred' : (panelist.emphasizePhoto ? 'scale-[1.2] group-hover:scale-[1.235]' : 'group-hover:scale-[1.035]')}`}
        loading="lazy"
      />
      {children}
    </span>
  )
}

function PanelistCard({ panelist, onSelect, index }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="panelist-card group flex min-w-0 flex-col p-3 text-left text-[#171717] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(0,0,0,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f73301] md:p-4"
      style={{ backgroundColor: panelist.frameColor ?? panelistCardColors[index % panelistCardColors.length] }}
      aria-label={BLUR_SPEAKER_DETAILS ? 'View speaker profile' : `View ${panelist.name} profile`}
    >
      <PanelistPortraitFrame panelist={panelist} className="w-full" />

      <span className="flex min-h-[142px] flex-1 flex-col px-1 pb-1 pt-5 md:min-h-[154px]">
        <strong className={`block text-xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-2xl ${BLUR_SPEAKER_DETAILS ? 'speaker-detail-blurred' : ''}`} aria-hidden={BLUR_SPEAKER_DETAILS}>{panelist.name}</strong>
        <span className={`mt-3 block text-sm font-medium leading-snug text-black/65 ${BLUR_SPEAKER_DETAILS ? 'speaker-detail-blurred' : ''}`} aria-hidden={BLUR_SPEAKER_DETAILS}>{panelist.role}</span>
        <span className={`mt-0.5 block text-xs leading-snug text-black/45 ${BLUR_SPEAKER_DETAILS ? 'speaker-detail-blurred' : ''}`} aria-hidden={BLUR_SPEAKER_DETAILS}>{panelist.org}</span>
        <span className="mt-auto flex items-center justify-between border-t border-black/10 pt-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/60">
          View profile <span className="text-base leading-none text-[#f73301] transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </span>
    </button>
  )
}

function PanelistModal({ panelist, onClose }) {
  const modalRef = useRef(null)

  useEffect(() => {
    if (!panelist) return undefined

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [panelist, onClose])

  useLayoutEffect(() => {
    if (!panelist || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const context = gsap.context(() => {
      gsap.from('.modal-backdrop', { opacity: 0, duration: 0.3, ease: 'power1.out' })
      gsap.from('.modal-panel', { y: 48, opacity: 0, duration: 0.55, ease: 'power3.out' })
    }, modalRef)

    return () => context.revert()
  }, [panelist])

  if (!panelist) return null

  const panelistIndex = panelists.findIndex(({ id }) => id === panelist.id)
  const frameColor = panelist.frameColor ?? panelistCardColors[(panelistIndex < 0 ? 0 : panelistIndex) % panelistCardColors.length]

  return (
    <div
      ref={modalRef}
      className="modal-viewport fixed inset-x-0 top-0 z-[100] flex items-end justify-center md:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={BLUR_SPEAKER_DETAILS ? 'Speaker profile' : undefined}
      aria-labelledby={BLUR_SPEAKER_DETAILS ? undefined : 'panelist-modal-title'}
    >
      <button type="button" className="modal-backdrop absolute inset-0 bg-[#171717]/55 backdrop-blur-sm" onClick={onClose} aria-label="Close profile" />
      <div className="modal-panel linked-section relative z-10 w-full overflow-hidden border border-black/10 bg-[#f7f5f0] text-[#171717] shadow-2xl md:mx-8 md:max-w-4xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close speaker profile"
          className="absolute right-4 top-4 z-20 grid size-10 place-items-center rounded-full border border-black/10 bg-white/85 text-[#171717] shadow-sm backdrop-blur-md transition-all hover:border-[#f73301]/30 hover:bg-[#f73301] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f73301] md:right-5 md:top-5"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <div className="grid h-full min-h-0 grid-cols-1 grid-rows-[17rem_minmax(0,1fr)] md:grid-cols-2 md:grid-rows-1">
          <div
            className="flex h-full min-h-0 items-center justify-center p-3 md:p-4"
            style={{ backgroundColor: frameColor }}
          >
            <PanelistPortraitFrame panelist={panelist} className="h-full w-auto max-w-full md:h-auto md:w-full">
              <span className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#f73301]">{panelist.discipline}</span>
            </PanelistPortraitFrame>
          </div>
          <div className="flex min-h-0 px-8 py-10 md:px-10 md:py-14">
            <div className="panelist-modal-scroll flex min-h-0 flex-1 flex-col justify-between overflow-y-auto pr-2">
              <div>
                <h2 id="panelist-modal-title" className={`text-3xl font-bold leading-tight tracking-tight md:text-4xl ${BLUR_SPEAKER_DETAILS ? 'speaker-detail-blurred' : ''}`} aria-hidden={BLUR_SPEAKER_DETAILS}>{panelist.name}</h2>
                <p className={`mt-2 text-sm font-medium text-[#f73301] ${BLUR_SPEAKER_DETAILS ? 'speaker-detail-blurred' : ''}`} aria-hidden={BLUR_SPEAKER_DETAILS}>{panelist.role}</p>
                {panelist.org && <p className={`mt-0.5 text-sm text-black/50 ${BLUR_SPEAKER_DETAILS ? 'speaker-detail-blurred' : ''}`} aria-hidden={BLUR_SPEAKER_DETAILS}>{panelist.org}</p>}
                <div className="mt-8 border-t border-black/10 pt-8">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">Biography</p>
                  <p className={`whitespace-pre-line text-sm leading-relaxed text-black/70 ${BLUR_SPEAKER_DETAILS ? 'speaker-detail-blurred' : ''}`} aria-hidden={BLUR_SPEAKER_DETAILS}>{panelist.bio}</p>
                </div>
                <div className="mt-8 border-t border-black/10 pt-8">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">Session</p>
                  <p className="font-medium leading-snug text-black">{panelist.session}</p>
                </div>
                {panelist.instagram && (
                  <div className="mt-8 border-t border-black/10 pt-6">
                    <a
                      href={`https://instagram.com/${panelist.instagram.replace(/^@/, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group inline-flex items-center gap-2 text-sm font-medium text-black/15 transition-colors duration-200 hover:text-black/35 ${BLUR_SPEAKER_DETAILS ? 'speaker-detail-blurred' : ''}`}
                      aria-hidden={BLUR_SPEAKER_DETAILS}
                      title={panelist.instagram}
                      aria-label={`${panelist.name} on Instagram (${panelist.instagram})`}
                    >
                      <SocialIcon name="Instagram" className="size-5 shrink-0 text-black/45 transition-colors duration-200 group-hover:text-black/75" />
                      <span className="text-black/45 transition-colors duration-200 group-hover:text-black/75">{panelist.instagram}</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Panelists({ showAll = false }) {
  const [selectedPanelist, setSelectedPanelist] = useState(null)
  const visiblePanelists = showAll ? panelists : panelists.slice(0, 4)

  return (
    <>
      <section id="panelists" className="motion-section linked-section relative overflow-hidden bg-black px-6 py-24 text-white md:py-32" aria-labelledby="panelists-heading">
        <div className="pointer-events-none absolute -right-24 top-16 size-[420px] rounded-full border-[72px] border-white/[0.035]" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-36 bottom-10 size-[360px] rounded-full border-[64px] border-[#f73301]/[0.06]" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 border-b border-white/15 pb-10 md:flex-row md:items-end md:justify-between md:pb-12">
            <div>
              {!showAll && (
                <p className="section-kicker mb-5 text-[11px] font-medium uppercase tracking-[0.3em] text-white/45">The Lineup</p>
              )}
              <h2 id="panelists-heading" className="text-[48px] font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-[84px]">
                {showAll ? <>All <span className="text-[#f73301]">Speakers</span></> : <>Speakers/<span className="text-[#f73301]">Panelists</span></>}
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/55 md:pb-2 md:text-base">
              Voices shaping faith, science, technology, media, and culture.
            </p>
          </div>

          <div id="speaker-grid" className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-14 lg:grid-cols-3 xl:grid-cols-4">
            {visiblePanelists.map((panelist, index) => (
              <PanelistCard
                key={panelist.id}
                panelist={panelist}
                index={index}
                onSelect={() => setSelectedPanelist(panelist)}
              />
            ))}
          </div>

          {!showAll && (
            <div className="mt-10 flex justify-center md:mt-14">
              <a
                href="/?view=speakers"
                className="inline-flex items-center gap-8 border border-white/25 px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-[#f73301] hover:bg-[#f73301]"
              >
                View all speakers <span className="text-lg leading-none">→</span>
              </a>
            </div>
          )}
        </div>
      </section>
      <PanelistModal panelist={selectedPanelist} onClose={() => setSelectedPanelist(null)} />
    </>
  )
}


