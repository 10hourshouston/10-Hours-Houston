import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BinaryBg from './components/BinaryBg'

gsap.registerPlugin(ScrollTrigger)

const EVENT_TIME = new Date('2026-10-31T10:00:00-05:00').getTime()
const REGISTER_URL = 'https://luma.com/oe8cgk9v'

function timeRemaining() {
  const total = Math.max(0, Math.floor((EVENT_TIME - Date.now()) / 1000))

  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  }
}

function Countdown() {
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

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const links = [
    { label: 'About', href: '#about', target: 'about' },
    { label: 'The Burden', href: '#burden', target: 'burden' },
    { label: 'Schedule', href: '#schedule', target: 'schedule' },
    { label: 'Panelists', href: '#panelists', target: 'panelists' },
    { label: 'Sponsors', href: '/sponsors' },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (event, target) => {
    const section = document.getElementById(target)

    setMenuOpen(false)
    if (!section) return

    event.preventDefault()
    section.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    })
    window.history.replaceState(null, '', `#${target}`)
  }

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-50 flex h-16 w-full items-center justify-between px-6 transition-all duration-500 md:h-[72px] md:px-10 ${scrolled ? 'is-scrolled' : ''}`}
      style={{
        background: scrolled ? 'rgba(38, 24, 19, 0.88)' : menuOpen ? 'rgba(0, 0, 0, 0.97)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(247, 51, 1, 0.32)' : '1px solid transparent',
        boxShadow: scrolled ? '0 10px 32px rgba(247, 51, 1, 0.1)' : 'none',
      }}
    >
      <a href="#home" className="flex shrink-0 items-center" aria-label="10 Hours Houston home" onClick={(event) => scrollToSection(event, 'home')}>
        <img className="brand-logo block h-auto w-[120px]" src="/10-hours-houston-logo.svg" alt="10 Hours Houston" />
      </a>

      <button
        className="menu-button ml-auto hidden flex-col items-center justify-center gap-1.5 p-1"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((value) => !value)}
      >
        <span /><span /><span />
      </button>

      <nav className={`main-nav ml-auto flex items-center gap-8 ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        {links.map(({ label, href, target }, index) => (
          <a className={index === 4 ? 'nav-register' : ''} href={href} key={label} onClick={target ? (event) => scrollToSection(event, target) : undefined}>
            {label}
          </a>
        ))}
      </nav>

      <a className="header-register ml-8 inline-flex shrink-0 items-center bg-[#f73301] px-5 py-2.5 transition-colors hover:bg-[#c42a01]" href={REGISTER_URL} target="_blank" rel="noreferrer">
        Register
      </a>
    </header>
  )
}

function Scripture() {
  return (
    <section className="motion-section bg-white px-6 py-24 md:py-36" aria-labelledby="scripture-heading">
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

function About() {
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

function Burden() {
  return (
    <section id="burden" className="motion-section linked-section relative overflow-hidden bg-[#e8e3da] px-6 py-24 text-[#171717] md:py-36" aria-labelledby="burden-heading">
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40" aria-hidden="true">
        <div className="select-none break-all text-[10px] leading-6 tracking-[0.4em] text-black/[0.035]">
          {'010110010100100101010001001001010011010101'.repeat(120)}
        </div>
      </div>

      <div className="relative mx-auto max-w-5xl">
        <p className="section-kicker mb-8 text-[11px] font-medium uppercase tracking-[0.3em] text-black/45">The Burden</p>
        <h2 id="burden-heading" className="mb-12 text-4xl font-bold leading-none tracking-tighter text-[#171717] md:text-6xl lg:text-7xl">
          Formed at the Altar.<br />
          <span className="text-[#f73301]">Sent to every Sphere.</span>
        </h2>
        <div className="grid max-w-2xl gap-6 text-base font-normal leading-relaxed text-black/65 md:text-lg">
          <p>10 Hours Houston was born out of a burden to see a generation return to God's presence and rise with clarity, fire, and conviction, formed at the altar before being sent into systems, industries, cultures, and nations. It is 10 hours set apart to seek the Lord, recover ancient wells, and receive strength for new frontiers, in culture, technology, leadership, and the emerging age of AI.</p>
        </div>
      </div>
    </section>
  )
}

const scheduleSteps = [
  { id: 'arrive', label: 'ARRIVE', desc: 'Doors open. Come as you are.' },
  { id: 'worship', label: 'WORSHIP', desc: 'Immersive praise and adoration.' },
  { id: 'word', label: 'WORD', desc: 'Prophetic teaching for the moment.' },
  { id: 'prayer', label: 'PRAYER', desc: 'Corporate intercession and consecration.' },
  { id: 'conversations', label: 'CONVERSATIONS', desc: 'Dialogue across disciplines and callings.' },
  { id: 'commissioning', label: 'COMMISSIONING', desc: 'Sent with fire into every sphere.' },
]

const experienceMoments = [
  { src: 'https://images.unsplash.com/photo-1588103715093-4937adcaa4e3?w=900&h=1200&fit=crop&auto=format&q=85', label: 'Prayer & Worship' },
  { src: '/ai-media-panel-v5.png', label: 'AI & Media Panel' },
  { src: '/documentary-projector-v2.png', label: 'Documentary' },
  { src: 'https://images.unsplash.com/photo-1775163560631-6ff15eb2fa1f?w=900&h=1200&fit=crop&auto=format&q=85', label: 'Networking' },
]

function Schedule() {
  const [active, setActive] = useState(0)
  const [shareStatus, setShareStatus] = useState('')
  const siteUrl = `${window.location.origin}/`
  const shareText = `You're invited to 10 Hours Houston — 10 hours of worship, prayer, consecration, and commissioning. Join us Saturday, October 31, 2026, from 10:00 AM–8:00 PM at Dominion Chapel Houston, Stafford, TX.`
  const shareMessage = `${shareText}\n\nRegister and learn more: ${siteUrl}`

  const sharePoster = async () => {
    try {
      const response = await fetch('/witnesses-event-poster.jpg')
      const blob = await response.blob()
      const poster = new File([blob], '10-hours-houston-poster.jpg', { type: blob.type })

      if (navigator.share && navigator.canShare?.({ files: [poster] })) {
        await navigator.share({ title: '10 Hours Houston', text: shareMessage, files: [poster] })
        setShareStatus('Shared')
      } else if (navigator.share) {
        await navigator.share({ title: '10 Hours Houston', text: shareMessage })
        setShareStatus('Shared without image')
      } else {
        await navigator.clipboard.writeText(shareMessage)
        setShareStatus('Sharing unavailable — message copied')
      }
    } catch (error) {
      if (error?.name !== 'AbortError') setShareStatus('Unable to share')
    }
  }

  return (
    <section id="schedule" className="motion-section linked-section bg-[#f7f5f0] px-6 py-24 text-[#171717] md:py-32" aria-labelledby="schedule-heading">
      <div className="mx-auto max-w-7xl">
        <p className="section-kicker mb-6 text-[11px] font-medium uppercase tracking-[0.3em] text-black/45">The Experience</p>
        <h2 id="schedule-heading" className="text-5xl font-bold leading-none tracking-tighter text-[#171717] md:text-7xl lg:text-8xl">
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

        <p className="mx-auto mt-10 max-w-xl text-center text-lg text-black/45">
          Prayer &amp; Worship. Documentary. AI &amp; Media Panel. Networking. Houston.
        </p>

        <div className="mt-20 border-t border-black/10 pt-20 md:mt-28 md:pt-28">
          <p className="section-kicker mb-6 text-[11px] font-medium uppercase tracking-[0.3em] text-black/45">The Schedule</p>
          <h3 className="mb-16 text-4xl font-bold leading-none tracking-tighter text-[#171717] md:text-6xl">
            Ten Hours.<br />One Encounter.
          </h3>
        </div>

        <div className="motion-stagger grid items-start gap-12 md:grid-cols-2 md:gap-20">
          <div className="space-y-0">
            {scheduleSteps.map((step, index) => (
              <button
                type="button"
                key={step.id}
                className={`timeline-step group flex w-full cursor-pointer gap-6 pb-8 text-left ${active === index ? 'active' : ''}`}
                onClick={() => setActive(index)}
                aria-pressed={active === index}
              >
                <span className="flex flex-col items-center">
                  <span
                    className="step-dot mt-1 h-3 w-3 shrink-0 rounded-full border-2 transition-all duration-300"
                    style={{
                      borderColor: active === index ? '#f73301' : 'rgba(0,0,0,0.2)',
                      background: active === index ? '#f73301' : 'transparent',
                    }}
                  />
                  {index < scheduleSteps.length - 1 && <span className="mt-2 w-px flex-1 bg-black/10" />}
                </span>
                <span className="pb-4">
                  <span className={`mb-1 block text-xs font-semibold tracking-[0.25em] transition-colors duration-300 ${active === index ? 'text-[#f73301]' : 'text-black/45'}`}>
                    {step.label}
                  </span>
                  <span className={`block text-sm leading-relaxed transition-colors duration-300 ${active === index ? 'text-black/75' : 'text-black/35'}`}>
                    {step.desc}
                  </span>
                </span>
              </button>
            ))}
          </div>

          <div className="relative aspect-[4/5] overflow-hidden bg-[#111] shadow-[0_24px_70px_rgba(0,0,0,0.18)]">
            <img
              src="/witnesses-event-poster.jpg"
              alt="10 Hours Houston Witnesses event poster"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-x-3 bottom-3 border border-white/20 bg-black/55 p-4 text-white shadow-xl backdrop-blur-md sm:inset-x-5 sm:bottom-5 sm:p-5">
              <p className="max-w-xs text-base font-semibold leading-snug sm:text-lg">Know someone who should be at this event?</p>
              <div className="mt-4 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={sharePoster}
                  className="inline-flex items-center gap-3 border border-white/50 bg-white/10 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-colors hover:border-[#f73301] hover:bg-[#f73301]"
                >
                  Share poster <span className="text-base leading-none">↗</span>
                </button>
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/65" aria-live="polite">{shareStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const panelistProfiles = [
  {
    id: '1',
    name: 'Temitope Ezekiel Ajibola',
    role: 'Founder & Convener',
    org: 'Every Sphere · 10 Hours Houston',
    discipline: 'Convener',
    bio: `Temitope Ezekiel Ajibola is the founder of Every Sphere and convener of 10 Hours Houston, a gathering devoted to prayer, worship, consecration, and bearing witness to Christ in every sphere of society.

He is a technologist, researcher, and entrepreneur whose work spans applied artificial intelligence, blockchain, energy systems, and business transformation. Temitope is a Ph.D. candidate in Electrical and Computer Engineering at Morgan State University, where he researches artificial intelligence and future energy systems.

He has built ventures and platforms, advised on emerging technologies, and created opportunities for students and emerging builders to develop ideas into practical solutions. His work reflects a continuing interest in how faith, technical excellence, and responsible leadership can wisely shape institutions and serve society.

Through Every Sphere and 10 Hours Houston, Temitope seeks to help create spaces where believers can encounter God, recover spiritual depth, and receive clarity for faithful service in their respective fields.`,
    photo: '/temitope-ajibola.png',
    frameColor: '#d8e0e8',
    session: 'Session details coming soon.',
  },
  {
    id: '2',
    name: 'Bola Aloba',
    role: 'Manager, Data Analytics',
    org: 'Deloitte',
    discipline: 'Technology',
    bio: `Bola Aloba is a Manager in Data Analytics at Deloitte, where she leads AI-enabled analytics solutions for major financial services clients and helps teams across the firm adopt generative AI tools responsibly and effectively.

A Certified Fraud Examiner with a master's degree in Business Analytics from Duke University, she combines technical expertise with a passion for mentorship and clear communication, making her uniquely equipped to guide today's conversation on technology and artificial intelligence.`,
    photo: '/bola-aloba.jpg',
    frameColor: '#eeeae1',
    session: 'Session details coming soon.',
  },
  {
    id: '3',
    name: 'Lady VJ',
    role: 'Serial Founder',
    org: '',
    discipline: 'Entrepreneurship',
    bio: 'Biography coming soon.',
    photo: '/lady-vj.png',
    frameColor: '#d8d5dc',
    session: 'Session details coming soon.',
  },
  {
    id: '4',
    name: 'Oyinkansola Oni',
    role: 'AI Strategy & Transformation Leader',
    org: 'StratNovate AI',
    discipline: 'AI & Strategy',
    bio: `Oyinkansola Oni is an AI Strategy and Transformation Leader, speaker, and entrepreneur with over a decade of experience driving innovation, business transformation, and strategic growth across technology, healthcare, financial services, and retail.

She currently serves as a Senior AI & Automation Solutions Partner at Inovalon, where she leads initiatives focused on applying AI and automation to business transformation and customer growth. Previously at Microsoft, she led strategy and go-to-market initiatives across the Azure AI and Applications portfolio, contributing to programs that generated more than $500 million in monetized cloud consumption.

Oyinkansola is also the founder of StratNovate AI, a strategic AI consultancy that helps service-based businesses identify high-value AI opportunities and deploy practical AI and automation solutions that improve efficiency, customer experience, and business growth.

She holds an MBA in Strategy and Information Systems from Morgan State University and is a Microsoft Certified: Azure AI Engineer Associate. She is also a Certified Management Consultant (CMC) and Fellow of the Institute of Management Consultants (FIMC), with recognitions including the CIBN Next Generation Award and Innovative Entrepreneur of the Year at the Global Entrepreneurship Festival.

Beyond enterprise AI, Oyinkansola is passionate about democratizing access to technology and opportunity. She founded the Hayes Initiative for Educational Advancement, which has reached more than 50,000 young people through career development, technology, entrepreneurship, and AI education programs.

Her work has taken her to global platforms including the World Bank Youth Summit, AFS UN Youth Assembly, and United Nations ECOSOC Youth Forum. With more than a decade of public-speaking experience, she is known for translating complex AI concepts into practical, actionable strategies that help professionals and organizations create measurable value.`,
    photo: '/oyinkansola-oni.jpg',
    frameColor: '#ccd9e8',
    session: 'Session details coming soon.',
  },
  {
    id: '5',
    name: 'Dinma Akor-Akinola',
    role: 'Senior Manager',
    org: 'American Express',
    discipline: 'AI & Data',
    bio: `Dr. Dinma Ruth Akor-Akinola is an AI and data professional whose career spans over a decade across machine learning, AI, data science, economics research, and public policy, with deep expertise in fintech and regulated financial environments. She is currently a Senior Manager at American Express, where she leads the design and deployment of high-impact machine learning strategies for fraud detection across banking products, integrating advanced analytics with real-time decision systems.

Dinma began her career as an analyst working directly with the former Minister of Finance, Nigeria, and has since held roles across the public and private sectors, including the International Monetary Fund, the United Nations, and PYXERA Global. She holds a doctorate in Artificial Intelligence and Machine Learning, a Master's degree in Applied Economics and Data Science from The George Washington University, and a Bachelor's degree in Economics from the University of Ibadan, Nigeria.

She also serves as an Academic Advisor for GWU's Artificial Intelligence and Machine Learning Doctor of Engineering program, where she works closely with doctoral students on their research and helps prepare them for their dissertation defense. She is the founder of DatawithDinma, where she creates content on data and AI—driven by the belief that AI skills should be accessible to everyone.

Outside of work, Dinma enjoys sharing knowledge, travelling to new places and spending time with family.`,
    photo: '/dinma-akor-akinola.jpg',
    frameColor: '#d9cbe3',
    session: 'Session details coming soon.',
  },
  {
    id: '6',
    name: 'Olamide Charles Akinola',
    role: 'Product & Technology Leader',
    org: 'Former Co-Founder, Mainstack',
    discipline: 'Technology',
    bio: `Olamide Charles Akinola is a product and technology leader, proud Christian, and husband with over a decade of experience building and scaling platforms across fintech, cybersecurity, e-commerce, and the creator economy. He most recently served as Chief Product and Technology Officer and co-founder of Mainstack, a Techstars-backed creator commerce platform used by creators across several countries including the US, UK, Canada, and Nigeria, where he led product strategy and engineering infrastructure through the development of the Mainstack all-in-one platform.

Earlier in his career, he worked at Google, helping develop the Chronicle SecOps platform, and held cybersecurity consulting roles at PwC. Olamide speaks on the intersection of product, security, and AI, and recently joined a panel at New York Tech Week on the existential risks of agentic AI. He brings this same lens to conversations on what it means to build, create, and witness faithfully in an AI-driven world.`,
    photo: '/olamide-charles-akinola.jpg',
    frameColor: '#dfc5ae',
    session: 'Session details coming soon.',
  },
  {
    id: '7',
    name: 'Toun Fadugba',
    role: 'Convener & Host',
    org: 'Fearless Women’s Conference – Houston',
    discipline: 'Ministry',
    bio: `Pastor Toun Fadugba is a multi-faceted leader and the visionary Convener & Host of the Fearless Women’s Conference – Houston. With over 25 years of success in the Oil & Gas industry as an engineer and IT professional, she also channels her creativity as founder of Éclante, a contemporary interior design firm celebrated for its elegance and excellence.

An ordained minister and passionate teacher of the Word, Pastor Toun is admired for her authenticity, insight, and empowering voice. She has ministered at women’s conferences across the U.S. and internationally, challenging women of all ages to rise above limitations and pursue their God-given purpose with bold faith and excellence.

She shares life and ministry with her college sweetheart and husband of over 30 years, Bayo Fadugba, Lead Pastor of RCCG Dominion Chapel Houston (DCH), and together they are blessed with three wonderful sons.`,
    photo: '/toun-fadugba-headshot.jpeg',
    frameColor: '#cbdacb',
    session: 'Session details coming soon.',
  },
  {
    id: '8',
    name: 'Opeyemi Adeniran',
    role: 'PhD Researcher, Computer Science & AI',
    org: 'Morgan State University, CEAMLS',
    discipline: 'AI Research',
    bio: `Opeyemi “Yemi” Adeniran is a PhD researcher in computer science and artificial intelligence at Morgan State University, where she works within the Center for Equitable AI and Machine Learning Systems (CEAMLS). Her research explores how AI systems that combine language and video can analyze forensic footage and follow specific people across crowded scenes even when they are briefly out of view, with a focus on when and why these models get things wrong so they can be made more trustworthy.

She has been featured in Forbes, recently had her research accepted at IEEE ICDM 2026, one of the world's leading conferences in artificial intelligence and data science, and was named a 2026 Technical.ly RealLIST Innovator. She is also an IBM Master Fellowship recipient and a co-inventor on two university inventions.

Beyond the lab, Yemi is the Founder and Lead Director of Morgan TechFest, an annual student technology innovation conference she launched in 2022. A woman of deep faith, she brings that conviction into all she builds, using technology as a tool to teach, serve, and uplift.`,
    photo: '/opeyemi-adeniran.png',
    frameColor: '#d7d7d5',
    session: 'Session details coming soon.',
  },
  {
    id: '9',
    name: 'Dee Jones',
    role: 'Pastor',
    org: '',
    discipline: 'Ministry',
    bio: 'Biography coming soon.',
    photo: '/dee-jones.jpg',
    frameColor: '#d9c8b7',
    session: 'Session details coming soon.',
  },
  {
    id: '10',
    name: 'Yewande Ifanse',
    role: 'Panelist',
    org: '',
    discipline: 'Panelist',
    bio: 'Biography coming soon.',
    photo: '/yewande-ifanse.jpg',
    frameColor: '#e9dfd2',
    emphasizePhoto: true,
    session: 'Session details coming soon.',
  },
]

const panelistOrder = ['1', '7', '3', '9', '4', '8', '2', '6', '5', '10']
const panelists = panelistOrder
  .map((id) => panelistProfiles.find((panelist) => panelist.id === id))
  .filter(Boolean)

const panelistCardColors = ['#edf3f3', '#f6c9b9', '#d9e2f5', '#e8e4d9', '#dce8cf', '#f2d6c9']

function PanelistPortraitFrame({ panelist, className = '', children }) {
  return (
    <span className={`relative block aspect-[4/5] overflow-hidden bg-black/10 ${className}`}>
      <img
        src={panelist.photo}
        alt={panelist.name}
        className={`h-full w-full object-cover object-top transition-transform duration-700 ${panelist.emphasizePhoto ? 'scale-[1.2] group-hover:scale-[1.235]' : 'group-hover:scale-[1.035]'}`}
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
      aria-label={`View ${panelist.name} profile`}
    >
      <PanelistPortraitFrame panelist={panelist} className="w-full" />

      <span className="flex min-h-[142px] flex-1 flex-col px-1 pb-1 pt-5 md:min-h-[154px]">
        <strong className="block text-xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-2xl">{panelist.name}</strong>
        <span className="mt-3 block text-sm font-medium leading-snug text-black/65">{panelist.role}</span>
        <span className="mt-0.5 block text-xs leading-snug text-black/45">{panelist.org}</span>
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
    <div ref={modalRef} className="fixed inset-0 z-[100] flex items-end justify-center md:items-center" role="dialog" aria-modal="true" aria-labelledby="panelist-modal-title">
      <button type="button" className="modal-backdrop absolute inset-0 bg-[#171717]/55 backdrop-blur-sm" onClick={onClose} aria-label="Close profile" />
      <div className="modal-panel linked-section relative z-10 h-[92vh] max-h-[720px] w-full overflow-hidden border border-black/10 bg-[#f7f5f0] text-[#171717] shadow-2xl md:mx-8 md:h-[min(85vh,640px)] md:max-h-none md:max-w-4xl">
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
                <h2 id="panelist-modal-title" className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">{panelist.name}</h2>
                <p className="mt-2 text-sm font-medium text-[#f73301]">{panelist.role}</p>
                <p className="mt-0.5 text-sm text-black/50">{panelist.org}</p>
                <div className="mt-8 border-t border-black/10 pt-8">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">Biography</p>
                  <p className="whitespace-pre-line text-sm leading-relaxed text-black/70">{panelist.bio}</p>
                </div>
                <div className="mt-8 border-t border-black/10 pt-8">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">Session</p>
                  <p className="font-medium leading-snug text-black">{panelist.session}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Panelists({ showAll = false }) {
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

const testimonials = [
  {
    quote: 'This gathering changed how I understood my responsibility as a believer. I left knowing my career was my calling.',
    name: 'Marcus B.',
    role: 'Software Engineer',
    city: 'Atlanta, GA',
  },
  {
    quote: 'For the first time I sat in a room that believed what I believed — that excellence in my field was an act of faith.',
    name: 'Danielle W.',
    role: 'Physician',
    city: 'Dallas, TX',
  },
  {
    quote: '10 Hours gave me language for something I had felt my whole life. I am a witness. My work is my witness.',
    name: 'Jordan K.',
    role: 'Film Director',
    city: 'Los Angeles, CA',
  },
  {
    quote: "The conversations in that room were the most important I've had in years. This is the church showing up to the future.",
    name: 'Ife A.',
    role: 'Venture Capitalist',
    city: 'Houston, TX',
  },
]

function Testimonials() {
  return (
    <section id="testimonials" className="motion-section linked-section overflow-hidden border-t border-black/10 bg-[#f4f1eb] py-24 text-[#171717] md:py-32" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-7xl px-6">
        <p className="section-kicker text-[11px] font-medium uppercase tracking-[0.3em] text-black/45">
          From Previous Gatherings
        </p>
        <h2 id="testimonials-heading" className="mt-6 max-w-3xl text-4xl font-bold leading-none tracking-tighter md:text-6xl">
          Stories from<br />other Rooms
        </h2>
      </div>

      <div
        className="testimonial-scroll mt-14 flex gap-3 overflow-x-auto px-6 pb-4 md:mt-20"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="motion-stagger mx-auto flex w-max max-w-none gap-3 md:pl-[max(0px,calc((100vw-80rem)/2))]">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="flex min-h-[330px] w-[min(82vw,480px)] shrink-0 flex-col justify-between border border-black/10 bg-white p-8 shadow-[0_12px_35px_rgba(0,0,0,0.04)] md:p-12"
            >
              <div>
                <p className="text-5xl font-bold leading-none text-[#f73301]" aria-hidden="true">“</p>
                <blockquote className="mt-4 text-xl font-normal leading-snug text-black/80 md:text-2xl">
                  {testimonial.quote}
                </blockquote>
              </div>
              <footer className="mt-10 border-t border-black/10 pt-6">
                <p className="text-sm font-semibold text-black">{testimonial.name}</p>
                <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.15em] text-black/40">
                  {testimonial.role} — {testimonial.city}
                </p>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="motion-section linked-section relative overflow-hidden border-t border-white/[0.06] bg-black px-6 py-36 text-center text-white md:py-52" aria-labelledby="final-cta-heading">
      <BinaryBg opacity={0.035} rows={50} cols={100} speed={50} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <h2
          id="final-cta-heading"
          className="font-bold leading-none tracking-tighter text-white"
          style={{ fontSize: 'clamp(2.75rem, 8vw, 7rem)' }}
        >
          TAKE YOUR<br />PLACE IN<br />
          <span className="text-[#f73301]">THE ROOM.</span>
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

function SocialIcon({ name }) {
  const commonProps = {
    className: 'h-5 w-5',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    'aria-hidden': true,
  }

  if (name === 'Instagram') {
    return (
      <svg {...commonProps}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
      </svg>
    )
  }

  if (name === 'X') {
    return (
      <svg {...commonProps} fill="currentColor" stroke="none">
        <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.39L6.48 22H3.36l7.26-8.3L2.98 2h6.4l4.42 5.84L18.9 2Zm-1.1 17.84h1.73L8.44 4.05H6.58L17.8 19.84Z" />
      </svg>
    )
  }

  if (name === 'YouTube') {
    return (
      <svg {...commonProps}>
        <path d="M21.2 7.1a2.8 2.8 0 0 0-2-2C17.45 4.6 12 4.6 12 4.6s-5.45 0-7.2.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2.3 12a29 29 0 0 0 .5 4.9 2.8 2.8 0 0 0 2 2c1.75.5 7.2.5 7.2.5s5.45 0 7.2-.5a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .5-4.9 29 29 0 0 0-.5-4.9Z" />
        <path d="m10 15.2 5-3.2-5-3.2v6.4Z" fill="currentColor" stroke="none" />
      </svg>
    )
  }

  return (
    <svg {...commonProps} fill="currentColor" stroke="none">
      <path d="M5.4 7.8A1.8 1.8 0 1 0 5.4 4a1.8 1.8 0 0 0 0 3.8ZM3.8 9.3H7V20H3.8V9.3ZM9 9.3h3v1.46h.04c.42-.8 1.45-1.65 2.98-1.65 3.18 0 3.77 2.1 3.77 4.82V20h-3.16v-5.38c0-1.28-.02-2.94-1.79-2.94-1.8 0-2.07 1.4-2.07 2.85V20H9V9.3Z" />
    </svg>
  )
}

function Footer() {
  const socialLinks = ['Instagram', 'X', 'YouTube', 'LinkedIn']

  return (
    <footer className="border-t border-white/8 bg-black px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <img src="/10-hours-houston-logo.svg" alt="10 Hours Houston" className="mb-4 h-10 w-auto object-contain brightness-0 invert" />
            <img src="/witnesses-white.png" alt="Witnesses" className="mb-6 h-8 w-auto object-contain opacity-60" />
          </div>

          <div>
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-white/30">Where</p>
            <p className="text-sm leading-relaxed text-white/65">
              Dominion Chapel Houston<br />
              1203 Cravens Rd<br />
              Stafford, TX 77477
            </p>
            <a
              href="https://maps.google.com/?q=1203+Cravens+Rd+Stafford+TX"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-xs uppercase tracking-widest text-[#f73301] transition-opacity hover:opacity-80"
            >
              Open in Maps →
            </a>
          </div>

          <div>
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-white/30">When</p>
            <p className="text-sm text-white/65">Saturday, October 31, 2026</p>
            <p className="text-sm text-white/65">10:00 AM — 8:00 PM</p>
          </div>

          <div>
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-white/30">Contact</p>
            <a href="mailto:hello@10hourshouston.com" className="mb-6 block text-sm text-white/50 transition-colors hover:text-white">
              hello@10hourshouston.com
            </a>
            <a href="/sponsors" className="mb-6 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f73301] transition-opacity hover:opacity-75">
              Partner with us →
            </a>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  title={social}
                  className="text-white/30 transition-colors hover:text-white"
                >
                  <SocialIcon name={social} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/6 pt-8 sm:flex-row sm:items-center">
          <p className="text-[11px] tracking-wide text-white/20">© 2026 10 Hours Houston. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

function HomePage() {
  const heroVideoRef = useRef(null)
  const appRef = useRef(null)

  useEffect(() => {
    const video = heroVideoRef.current
    if (!video) return undefined

    video.muted = true
    video.defaultMuted = true
    video.playsInline = true
    video.playbackRate = 0.65

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
      <main id="home" className="page-shell relative flex min-h-screen min-h-[100svh] items-center overflow-hidden bg-black py-24 text-white md:py-28">
      <div className="absolute inset-0" aria-hidden="true">
        <video
          ref={heroVideoRef}
          className="h-full w-full scale-[1.9] object-cover opacity-60"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/video/houston-2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/65 to-black/50" />
      </div>

      <div className="dot-field dot-field-left" aria-hidden="true" />
      <div className="dot-field dot-field-right" aria-hidden="true" />
      <Header />

      <section className="hero relative z-10 mx-auto w-full max-w-[1175px] px-0" aria-labelledby="hero-title">
        <h1 id="hero-title" className="sr-only">Witnesses</h1>
        <img className="witnesses-art" src="/witnesses-logo-white-clean.png" alt="Witnesses" />

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

        <div className="event-row ml-[17px] mt-[96px] flex items-center">
          <div className="flex flex-col">
            <div className="text-[24px] font-semibold leading-[1.12]">Saturday, October 31, 2026</div>
            <span className="text-[18px] leading-[1.28] font-normal mt-2">10:00 AM – 8:00 PM · Houston, Texas</span>
          </div>
          <a id="register" className="primary-register ml-[77px] inline-flex shrink-0 items-center self-start bg-[#f73301] px-11 py-4 text-[12px] tracking-[0.2em] uppercase transition-colors duration-200 hover:bg-[#c42a01]" href={REGISTER_URL} target="_blank" rel="noreferrer">
            Register →
          </a>
        </div>

        <div className="countdown-transition relative mt-[51px] translate-y-24"><Countdown /></div>
      </section>
      </main>
      <Scripture />
      <About />
      <Burden />
      <Schedule />
      <Panelists />
      <Testimonials />
      <FinalCta />
      <Footer />
    </div>
  )
}

function SpeakersPage() {
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

const partnershipOptions = [
  'Event Sponsorship — $10,000',
  'Church & Ministry Partnership — $5,000',
  'Vendor & Community Partnership — $2,500',
  'Other',
]

function SponsorPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="sponsor-page min-h-screen bg-[#f5f6f7] text-[#171717]">
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-[#f73301]/35 bg-[#261813]/95 px-6 shadow-[0_10px_32px_rgba(247,51,1,0.10)] backdrop-blur-md md:h-[72px] md:px-10">
        <a href="/" className="flex shrink-0 items-center" aria-label="10 Hours Houston home">
          <img className="sponsor-brand block h-auto w-[120px]" src="/10-hours-houston-logo.svg" alt="10 Hours Houston" />
        </a>
        <div className="flex items-center gap-5">
          <a href="/" className="sponsor-back-link text-[10px] font-semibold uppercase tracking-[0.16em] transition-opacity hover:opacity-75">
            ← Back to website
          </a>
          <a className="sponsor-register hidden bg-[#f73301] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#c42a01] sm:inline-flex" href={REGISTER_URL} target="_blank" rel="noreferrer">
            Register
          </a>
        </div>
      </header>

      <main>
        <section className="px-6 pb-24 pt-10 md:pb-32 md:pt-14" aria-labelledby="sponsor-heading">
          <div className="mx-auto max-w-7xl">
            <a href="/" className="mb-14 inline-flex text-sm text-black/70 transition-colors hover:text-black md:mb-20">← &nbsp; BACK TO WEBSITE</a>
            <div className="grid gap-16 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-24">
              <div>
                <h1 id="sponsor-heading" className="max-w-md text-[clamp(2.8rem,5vw,4.5rem)] font-normal leading-[1.05] tracking-[-0.055em]">
                  We appreciate<br />your interest in<br />partnering<br />with 10 Hours Houston
                </h1>
                <p className="mt-12 max-w-sm text-2xl font-normal leading-[1.5] tracking-[-0.025em] text-black/85">
                  For all partnership opportunities with 10 Hours Houston, please fill out this form.
                </p>
                <div className="mt-16 max-w-sm border-t border-black/70 pt-10">
                  <p className="text-base leading-relaxed text-black/65">For general partnership questions:</p>
                  <a href="mailto:hello@10hourshouston.com" className="mt-3 inline-flex text-lg font-semibold underline decoration-1 underline-offset-4 transition-colors hover:text-[#f73301]">
                    hello@10hourshouston.com
                  </a>
                </div>
              </div>

              <form
                className="sponsor-form w-full bg-white px-6 py-9 shadow-[0_2px_20px_rgba(0,0,0,0.035)] md:px-12 md:py-12"
                onSubmit={(event) => {
                  event.preventDefault()
                  const data = new FormData(event.currentTarget)
                  const subject = encodeURIComponent(`10 Hours Houston Partnership Inquiry — ${data.get('partnershipType')}`)
                  const body = encodeURIComponent([
                    `First Name: ${data.get('firstName')}`,
                    `Last Name: ${data.get('lastName')}`,
                    `Title: ${data.get('title')}`,
                    `Company: ${data.get('company')}`,
                    `Email: ${data.get('email')}`,
                    `Partnership Type: ${data.get('partnershipType')}`,
                  ].join('\n'))
                  window.location.href = `mailto:hello@10hourshouston.com?subject=${subject}&body=${body}`
                }}
              >
                <div className="grid gap-9">
                  <label className="grid gap-2 text-lg">
                    <span>First Name</span>
                    <input required name="firstName" type="text" placeholder="First Name" className="h-14 border-b border-black/35 bg-transparent px-0 text-lg outline-none transition-colors placeholder:text-black/35 focus:border-[#f73301]" />
                  </label>
                  <label className="grid gap-2 text-lg">
                    <span>Last Name</span>
                    <input required name="lastName" type="text" placeholder="Last Name" className="h-14 border-b border-black/35 bg-transparent px-0 text-lg outline-none transition-colors placeholder:text-black/35 focus:border-[#f73301]" />
                  </label>
                  <label className="grid gap-2 text-lg">
                    <span>Title</span>
                    <input required name="title" type="text" placeholder="Title" className="h-14 border-b border-black/35 bg-transparent px-0 text-lg outline-none transition-colors placeholder:text-black/35 focus:border-[#f73301]" />
                  </label>
                  <label className="grid gap-2 text-lg">
                    <span>Company</span>
                    <input required name="company" type="text" placeholder="Company" className="h-14 border-b border-black/35 bg-transparent px-0 text-lg outline-none transition-colors placeholder:text-black/35 focus:border-[#f73301]" />
                  </label>
                  <label className="grid gap-2 text-lg">
                    <span>Email</span>
                    <input required name="email" type="email" placeholder="Email" className="h-14 border-b border-black/35 bg-transparent px-0 text-lg outline-none transition-colors placeholder:text-black/35 focus:border-[#f73301]" />
                  </label>
                  <label className="grid gap-3 text-lg">
                    <span>Partnership Type</span>
                    <span className="relative block">
                      <select required name="partnershipType" defaultValue="" className="h-14 w-full appearance-none border border-black/20 bg-white px-4 pr-12 text-lg outline-none transition-colors focus:border-[#f73301]">
                        <option value="" disabled>Select a partnership</option>
                        {partnershipOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                      </select>
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm" aria-hidden="true">⌄</span>
                    </span>
                  </label>
                </div>

                <div className="mt-12 flex justify-center">
                  <button type="submit" className="min-w-44 bg-[#f73301] px-8 py-4 text-[12px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#c42a01]">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  const currentPath = window.location.pathname.replace(/\/+$/, '')
  const isSpeakersPage = currentPath === '/speakers'
    || new URLSearchParams(window.location.search).get('view') === 'speakers'
  if (currentPath === '/sponsors') return <SponsorPage />
  return isSpeakersPage ? <SpeakersPage /> : <HomePage />
}
