import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Header, Footer } from '../components/layout/SiteLayout'
import { About, Countdown, Experience, FinalCta, Scripture } from '../components/home/HomeSections'
import Panelists from '../features/speakers/Panelists'
import Testimonials from '../features/testimonials/Testimonials'
import { REGISTER_URL } from '../config/urls'

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  const heroVideoRef = useRef(null)
  const appRef = useRef(null)

  useEffect(() => {
    const video = heroVideoRef.current
    if (!video) return undefined

    video.muted = true
    video.defaultMuted = true
    video.playsInline = true
    video.playbackRate = 1

    const startPlayback = () => {
      if (document.visibilityState === 'hidden') return
      const playRequest = video.play()
      if (playRequest) playRequest.catch(() => undefined)
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') startPlayback()
    }

    startPlayback()
    video.addEventListener('loadeddata', startPlayback)
    video.addEventListener('canplay', startPlayback)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('pageshow', startPlayback)
    window.addEventListener('pointerdown', startPlayback, { once: true, passive: true })
    window.addEventListener('touchstart', startPlayback, { once: true, passive: true })

    return () => {
      video.removeEventListener('loadeddata', startPlayback)
      video.removeEventListener('canplay', startPlayback)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('pageshow', startPlayback)
      window.removeEventListener('pointerdown', startPlayback)
      window.removeEventListener('touchstart', startPlayback)
    }
  }, [])

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return undefined

    const context = gsap.context(() => {
      const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
      heroTimeline
        .from('.site-header', { y: -24, opacity: 0, duration: 0.65 })
        .from('.witnesses-art', { y: 45, opacity: 0, scale: 0.96, duration: 0.9 }, '-=0.35')
        .from('.tagline', { y: 24, opacity: 0, duration: 0.65 }, '-=0.55')
        .from('.discipline-strip', { y: 18, opacity: 0, duration: 0.55 }, '-=0.4')
        .from('.event-row > *', { y: 20, opacity: 0, duration: 0.55, stagger: 0.12 }, '-=0.35')
        .from('.countdown', { y: 30, opacity: 0, scale: 0.985, duration: 0.75 }, '-=0.25')

      gsap.to(heroVideoRef.current, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.page-shell',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.utils.toArray('.motion-section').forEach((section) => {
        const text = section.querySelectorAll('.section-kicker, h2, h3, blockquote')
        if (text.length) {
          gsap.from(text, {
            y: 42,
            opacity: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 78%', once: true },
          })
        }
      })

      gsap.utils.toArray('.motion-stagger').forEach((group) => {
        gsap.from(group.children, {
          y: 36,
          opacity: 0,
          duration: 0.7,
          stagger: 0.09,
          ease: 'power2.out',
          scrollTrigger: { trigger: group, start: 'top 82%', once: true },
        })
      })

      gsap.utils.toArray('.experience-moment').forEach((card) => {
        const image = card.querySelector('img')
        if (!image) return
        gsap.fromTo(image, { yPercent: -5, scale: 1.08 }, {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
        })
      })
    }, appRef)

    return () => context.revert()
  }, [])

  return (
    <div ref={appRef}>
      <main id="home" className="page-shell relative flex min-h-screen min-h-[100svh] items-center overflow-hidden bg-black pt-20 pb-4 text-white md:pt-24 md:pb-6">
      <div className="absolute inset-0" aria-hidden="true">
        <video
          ref={heroVideoRef}
          className="h-full w-full scale-105 object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/video/10HoursHouston-new.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/65 to-black/50" />
      </div>

      <div className="dot-field dot-field-left" aria-hidden="true" />
      <div className="dot-field dot-field-right" aria-hidden="true" />
      <Header />

      <section className="hero relative z-10 mx-auto w-full max-w-[1175px] mt-24 px-0" aria-labelledby="hero-title">
        <h1 id="hero-title" className="sr-only">Witnesses</h1>
        <img className="witnesses-art" src="/witnesses-white.png" alt="Witnesses" />

        <p className="tagline ml-[17px] mt-[18px] text-[28px] font-semibold tracking-[-0.8px]">
          10 hours of worship, prayer, consecration, and commissioning.
        </p>

        <div className="discipline-strip ml-[17px] mt-[28px]" aria-label="Featured fields">
          <span>Science</span>
          <i aria-hidden="true" />
          <span>Technology</span>
          <i aria-hidden="true" />
          <span>Media</span>
        </div>

        <div className="event-row ml-[17px] mt-10 flex items-center md:mt-14 md:mb-24">
          <div className="flex flex-col">
            <div className="text-[24px] font-semibold leading-[1.12]">Saturday, October 31, 2026</div>
            <span className="text-[18px] leading-[1.28] font-normal mt-2">10:00 AM – 8:00 PM · Houston, Texas</span>
          </div>
          <a id="register" className="primary-register ml-[77px] inline-flex shrink-0 items-center self-start bg-[#f73301] px-11 py-4 text-[12px] tracking-[0.2em] uppercase transition-colors duration-200 hover:bg-[#c42a01]" href={REGISTER_URL} target="_blank" rel="noreferrer">
            Register →
          </a>
        </div>

        <div className="countdown-transition relative mt-6 md:mt-8"><Countdown /></div>
      </section>
      </main>
      <Scripture />
      <About />
      <Experience />
      <Panelists />
      <Testimonials />
      <FinalCta />
      <Footer />
    </div>
  )
}

