import { Fragment, useEffect, useState } from 'react'
import BinaryBg from '../BinaryBg'
import { EVENT_TIME, REGISTER_URL } from '../../config/urls'

function timeRemaining() {
  const total = Math.max(0, Math.floor((EVENT_TIME - Date.now()) / 1000))

  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  }
}

export function Countdown() {
  const [remaining, setRemaining] = useState(timeRemaining)

  useEffect(() => {
    const interval = window.setInterval(() => setRemaining(timeRemaining()), 1000)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <section
      className="countdown ml-[17px] grid max-w-[1000px] items-center rounded-[48px] border border-white/90 px-[8%] py-6 text-white"
      aria-label="Countdown to 10 Hours Houston"
    >
      {Object.entries(remaining).map(([label, value], index) => (
        <Fragment key={label}>
          {index > 0 && <span className="countdown-colon" aria-hidden="true">:</span>}
          <div className="countdown-unit flex min-w-0 flex-col items-center text-center">
            <strong className="countdown-number block w-full text-center font-bold leading-none tabular-nums">
              {String(value).padStart(2, '0')}
            </strong>
            <span className="countdown-label mt-1 uppercase">{label}</span>
          </div>
        </Fragment>
      ))}
    </section>
  )
}

export function Scripture() {
  return (
    <section className="motion-section bg-white px-6 pt-12 pb-16 md:pt-16 md:pb-24" aria-labelledby="scripture-heading">
      <div className="mx-auto max-w-5xl">
        <p id="scripture-heading" className="mb-10 text-[11px] font-medium uppercase tracking-[0.3em] text-black/30">
          Acts 1:8
        </p>
        <blockquote>
          <p className="text-2xl font-medium leading-tight tracking-tight text-black md:text-4xl lg:text-5xl">
            &quot;But you will receive power when the Holy Spirit has come upon you, and you will be My{' '}
            <em className="not-italic font-bold text-[#f73301]">witnesses</em>.&quot;
          </p>
        </blockquote>
        <div className="mt-10 h-px w-16 bg-[#f73301]" />
      </div>
    </section>
  )
}

export function About() {
  return (
    <section id="about" className="motion-section linked-section bg-black px-6 py-24 text-white md:py-32" aria-labelledby="about-heading">
      <div className="mx-auto max-w-7xl">
        <p className="section-kicker mb-6 text-[11px] font-medium uppercase tracking-[0.3em] text-white/45">About</p>
        <h2 id="about-heading" className="text-[42px] font-bold leading-[1.04] tracking-[-0.045em] text-white md:text-6xl lg:text-[68px]">
          <span className="block md:whitespace-nowrap">Bearing witness to</span>
          <span className="block md:whitespace-nowrap"><span className="text-[#f73301]">Christ</span> in every sphere.</span>
        </h2>

        <div className="mt-14 grid gap-12 border-t border-white/15 pt-10 md:mt-20 md:grid-cols-[1.4fr_.6fr] md:gap-24 md:pt-12">
          <div className="max-w-3xl">
            <p className="mb-6 text-base font-normal leading-relaxed text-white/65 md:text-lg">
              10 Hours Houston is a 10-hour gathering of prayer, worship, and consecration, calling believers to encounter God, return to the altar, and rise as witnesses of Christ in every sphere of life.
            </p>
            <p className="text-base font-normal leading-relaxed text-white/65 md:text-lg">
              The theme is <strong className="font-semibold text-[#f73301]">Witnesses</strong>, with special emphasis on science, technology, and media, a call to know Christ deeply, carry His presence faithfully, and bear witness to Him in families, campuses, workplaces, cities, and nations.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:border-l md:border-white/15 md:pl-12">
            <div>
              <p className="text-4xl font-bold tabular-nums text-[#f73301]">10</p>
              <p className="mt-1 text-sm tracking-wide text-white/50">Hours of Encounter</p>
            </div>
            <div>
              <p className="text-4xl font-bold tabular-nums text-[#f73301]">4</p>
              <p className="mt-1 text-sm tracking-wide text-white/50">Pillars of Purpose</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const experienceMoments = [
  { src: 'https://images.unsplash.com/photo-1588103715093-4937adcaa4e3?w=900&h=1200&fit=crop&auto=format&q=85', label: 'Prayer & Worship' },
  { src: '/ai-media-panel-v5.png', label: 'AI & Media Panel' },
  { src: '/documentary-projector-v2.png', label: 'Documentary' },
  { src: 'https://images.unsplash.com/photo-1775163560631-6ff15eb2fa1f?w=900&h=1200&fit=crop&auto=format&q=85', label: 'Networking' },
]

export function Experience() {
  return (
    <section id="experience" className="motion-section linked-section bg-[#f7f5f0] px-6 py-24 text-[#171717] md:py-32" aria-labelledby="experience-heading">
      <div className="mx-auto max-w-7xl">
        <p className="section-kicker mb-6 text-[11px] font-medium uppercase tracking-[0.3em] text-black/45">The Experience</p>
        <h2 id="experience-heading" className="text-5xl font-bold leading-none tracking-tighter text-[#171717] md:text-7xl lg:text-8xl">
          10 Hours.<br />
          One Room.<br />
          <span className="text-black/25">One Generation.</span>
        </h2>

        <div className="motion-stagger mt-16 grid grid-cols-2 gap-2 md:mt-20 md:grid-cols-4">
          {experienceMoments.map((moment) => (
            <div key={moment.label} className="experience-moment group relative aspect-[3/4] overflow-hidden bg-black/10">
              <img
                src={moment.src}
                alt={moment.label}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <p className="absolute bottom-4 left-4 text-[12px] font-semibold tracking-[0.08em] text-white/75">
                {moment.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="/schedule"
            className="experience-schedule-link inline-flex items-center border border-[#171717] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors hover:border-[#f73301] hover:bg-[#f73301]"
          >
            View Schedule →
          </a>
        </div>

      </div>
    </section>
  )
}

export function FinalCta() {
  return (
    <section className="motion-section linked-section relative overflow-hidden border-t border-white/[0.06] bg-black px-6 py-36 text-center text-white md:py-52" aria-labelledby="final-cta-heading">
      <BinaryBg opacity={0.035} rows={50} cols={100} speed={50} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <h2
          id="final-cta-heading"
          className="font-bold leading-none tracking-tighter text-white"
          style={{ fontSize: 'clamp(2.75rem, 8vw, 7rem)' }}
        >
          Take Your<br />Place in<br />
          <span className="text-[#f73301]">the Room.</span>
        </h2>

        <div className="mt-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/45">
            Saturday, October 31, 2026 · 10:00 AM — 8:00 PM
          </p>
          <p className="mb-12 mt-2 text-[11px] font-medium uppercase tracking-[0.3em] text-white/30">
            Dominion Chapel Houston · Stafford, Texas
          </p>
          <a
            className="inline-flex bg-[#f73301] px-10 py-5 text-[13px] font-semibold uppercase tracking-[0.25em] text-white transition-colors duration-200 hover:bg-[#c42a01]"
            href={REGISTER_URL}
            target="_blank"
            rel="noreferrer"
          >
            Reserve Your Place
          </a>
        </div>
      </div>
    </section>
  )
}

