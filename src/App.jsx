import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BinaryBg from './components/BinaryBg'
import { BLUR_SPEAKER_DETAILS } from './config/feature_flags'

gsap.registerPlugin(ScrollTrigger)

const EVENT_TIME = new Date('2026-10-31T10:00:00-05:00').getTime()
const REGISTER_URL = 'https://luma.com/oe8cgk9v'
const DONATION_URL = 'https://www.zeffy.com/en-US/donation-form/donate-and-partner'
const SPONSOR_FORM_RESPONSE_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSd6NQId6OcJSy3z4Kg-08EDYg96X_QVHAr8ltp1bodgK2NK_A/formResponse'
const SPONSOR_FORM_FIELDS = {
  firstName: 'entry.626849409',
  lastName: 'entry.1939388449',
  company: 'entry.1307811072',
  title: 'entry.1653343231',
  sponsorshipTier: 'entry.973936506',
}

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
    { label: 'Schedule', href: '/schedule' },
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

const experienceMoments = [
  { src: 'https://images.unsplash.com/photo-1588103715093-4937adcaa4e3?w=900&h=1200&fit=crop&auto=format&q=85', label: 'Prayer & Worship' },
  { src: '/ai-media-panel-v5.png', label: 'AI & Media Panel' },
  { src: '/documentary-projector-v2.png', label: 'Documentary' },
  { src: 'https://images.unsplash.com/photo-1775163560631-6ff15eb2fa1f?w=900&h=1200&fit=crop&auto=format&q=85', label: 'Networking' },
]

function Experience() {
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

const panelistProfiles = [
  {
    id: '1',
    name: 'Temitope E. Ajibola',
    role: 'Convener & Technology Leader',
    org: '10 Hours Houston',
    discipline: 'Convener',
    bio: `Temitope Ajibola is a faith and technology leader, researcher and entrepreneur working across artificial intelligence, blockchain, energy systems and business transformation.

He is a doctoral researcher in Electrical and Computer Engineering, where his current work explores AI, blockchain-enabled coordination and distributed energy systems, including peer-to-peer energy markets. His broader research includes explainable AI and smart-contract security, with peer-reviewed publications and intellectual property.

Beyond research, Temitope has built and led technology, education and entrepreneurship initiatives that have impacted more than 1,000 students. Participants and alumni from these ecosystems have gone on to opportunities at organizations including Microsoft and Cloudflare, while others have built startups and technical projects.

Through Timeless Venture Group, he also works with organizations on AI, blockchain and business transformation.

His leadership has been recognized through honors including HBCUniverse’s 30 Under 30, the Thurgood Marshall College Fund/Hennessy Fellowship and the Stanford University Innovation Fellowship. His work and perspective have also been featured in God Bless Bitcoin, a documentary exploring faith, money and technology.

Temitope is the founder of Every Sphere and convener of 10 Hours Houston, a Christ-centered gathering calling believers to faithful witness across technology, science, business, media and culture. His work is driven by a conviction that technological advancement and spiritual formation should not develop as separate conversations, but should together shape a generation prepared to enter new frontiers with wisdom, excellence and conviction.`,
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
    name: 'LADY VJ',
    role: 'Serial Founder',
    org: '',
    discipline: 'Entrepreneurship',
    instagram: '@jokotadeofficial',
    bio: `LADY VJ is a faith-led serial founder, executive coach, and refinement expert whose work has impacted leaders across more than 100 countries. For over two decades, her journey has allowed her to pioneer multiple thriving ventures across distinct cultural spheres, spanning luxury commerce, modern refinement education, and international media—most notably as the visionary behind NOTIQ, which was later licensed to Target stores nationwide.

Having personally overcome the label of being a "Jack of all trades" to serve leaders at the highest levels, she uses her experience to coach and inspire others to boldly embrace their diverse talents. Lady VJ is deeply passionate about equipping audiences to bridge the gap between technical skill and refined presence, empowering them to step into the marketplace with faith, excellence, and authentic confidence.`,
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
    org: 'Former CPTO, Mainstack',
    discipline: 'Technology',
    bio: `Olamide Charles Akinola is a product and technology leader, proud Christian, and husband with over a decade of experience building and scaling platforms across fintech, cybersecurity, e-commerce, and the creator economy. He most recently served as Chief Product and Technology Officer (CPTO) of Mainstack, a Techstars-backed creator commerce platform used by creators across several countries including the US, UK, Canada, and Nigeria, where he led product strategy and engineering infrastructure through the development of the Mainstack all-in-one platform.

Earlier in his career, he worked at Google, helping develop the Chronicle SecOps platform, and held cybersecurity consulting roles at PwC. Olamide speaks on the intersection of product, security, and AI, and recently joined a panel at New York Tech Week on the existential risks of agentic AI. He brings this same lens to conversations on what it means to build, create, and witness faithfully in an AI-driven world.`,
    photo: '/olamide-charles-akinola.jpg',
    frameColor: '#dfc5ae',
    session: 'Session details coming soon.',
  },
  {
    id: '7',
    name: 'Toun Fadugba',
    role: 'Faith Leader & Host',
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
    name: 'Daniel “Dee” Jones',
    role: 'Lead Pastor & Media Executive',
    org: 'The Gathering Houston',
    discipline: 'Ministry',
    bio: `Pastor Daniel “Dee” Jones is a pastor, media executive, worship leader, recording artist, songwriter, music producer and creative director whose work spans ministry, music, media and global culture. He serves as Lead Pastor of The Gathering Houston and Worship Pastor at Dominion Chapel Houston.

Beginning his musical journey at nine, Pastor Dee went on to study Sound Engineering and Music Production at SAE Institute and Middlesex University in the United Kingdom. Over more than two decades, his ministry and creative work have taken him across Africa, Europe, Asia and North America. He has collaborated with internationally recognized artists and ministers, including Sinach, Israel Houghton, Donnie McClurkin, Tye Tribbett and Todd Dulaney.

Pastor Dee produced Sinach’s live recording of the global worship anthem Way Maker and currently serves as Brand Manager for Africa at MultiTracks.com. Through pastoral leadership and creative production, he demonstrates how spiritual conviction, technical excellence and thoughtful communication can work together to carry a message across cultures and generations.`,
    photo: '/dee-jones.jpg',
    frameColor: '#d9c8b7',
    session: 'Session details coming soon.',
  },
  {
    id: '11',
    name: 'Erezi Umuakpero',
    role: 'Administrative Pastor & Worship Leader',
    org: 'The Gathering Houston · TEDx Speaker',
    discipline: 'Ministry',
    bio: `Pastor Erezi Umuakpero is a pastor, worship minister, teacher, TEDx speaker and certified life coach committed to helping people encounter God, discover their voices and grow into mature followers of Christ. He serves as Administrative Pastor at The Gathering Houston, contributing to the spiritual formation, pastoral care and development of its community.

His ministry is grounded in the conviction that worship is more than music—it is a life of surrender, reverence and wholehearted devotion to God. Whether leading worship, teaching Scripture or speaking publicly, Pastor Erezi communicates with sincerity, clarity and a desire to move people toward meaningful transformation.

In his TEDxRiceU talk, Break the Silence, he challenged individuals to overcome fear and find the courage to speak up. Across both ministry and public communication, his work reflects a passion for helping people live with faith, purpose and conviction.`,
    photo: '/erezi-umuakpero.jpg',
    frameColor: '#d8d2d0',
    session: 'Session details coming soon.',
  },
  {
    id: '10',
    name: 'Yewande Ifanse',
    role: 'Speaker | Spoken Word Artist',
    org: '',
    discipline: 'Spoken Word',
    bio: `Yewande is a spoken word artist, licensed financial professional, health care professional and serial entrepreneur- CEO of Yumbyye Cake Artistry and Audacious Legacy LLC. With her background in healthcare she understands how fragile life is and is devoted to helping others live boldly and intentionally. Yewande empowers individuals and families through financial literacy and practical action steps to create a financially resilient life they love. At the heart of everything Yewande does is a deep passion for people, purpose, and impact. She believes everyone deserves the freedom to create a life they truly love—and should have the audacity to pursue it, live it, and leave a legacy that inspires generations.`,
    photo: '/yewande-ifanse.jpg',
    frameColor: '#e9dfd2',
    session: 'Session details coming soon.',
  },
  {
    id: '12',
    name: 'John Alimi',
    role: 'Serial Founder',
    org: 'Stanford PhD Candidate',
    discipline: 'Entrepreneurship',
    bio: `John Alimi holds a bachelor's degree in mechanical engineering from the University of Bradford and a master of philosophy in industrial systems, manufacture and management from the University of Cambridge, where he received the Frederick Alfred Warren Prize for academic excellence. He is now a PhD candidate in Management Science and Engineering at Stanford.

His work has spanned affordable healthcare innovations and smart water systems built to address global water scarcity. He co-founded Loopify to equip underserved African small businesses with digital tools, and launched the UK government-backed Young Innovators programme, building digital and entrepreneurial skills among at-risk youth in London. He is currently building in AI.

He is the son of pastors, and grew up behind a keyboard in his parents' church.`,
    photo: '/john-alimi.jpeg',
    frameColor: '#d4dce4',
    session: 'Session details coming soon.',
  },
  {
    id: '13',
    name: 'Joy Uyo Adejo',
    role: 'Founder | Worship Leader',
    org: 'Light-ED Africa · You Can Heal Global',
    discipline: 'Ministry',
    bio: `Joy Uyo Adejo is a Communications Consultant by profession, an award winning singer-songwriter and an Author. She is the founder of Light-ED Africa, Co-Founder of Safe and Whole Maternal Wellness and the Steward over You Can Heal Global, a ministry dedicated to revealing the Love of Jesus Christ and the Power of The Holy Spirit in bringing healing and restoration to the total man, spirit, soul and body. This is through programs such as The Healing Ground, You Can Heal Conference as well as platforms like The Prayer Partners and Healing Streams podcast on YouTube.

Joy is committed to the work of The Gospel of Jesus Christ, a worshipper, a woman of prayer and a student of The Word.`,
    photo: '/joy-uyo-adejo.jpg',
    frameColor: '#dde7d8',
    session: 'Session details coming soon.',
  },
  {
    id: '14',
    name: 'Manji Dandam',
    role: 'Worship Leader | Registered Nurse',
    org: '',
    discipline: 'Ministry',
    bio: `Manji Dandam is a worship minister and registered nurse whose life is shaped by a single, consuming conviction: to make Jesus proud, and to draw all men into Him with everything her hands have been blessed to do.

Born in Jos and raised in Lagos, Nigeria, and now based in Houston, Manji carries both a healer's heart and a worshipper's spirit into everything she does. By profession, she cares for patients as a Registered Nurse; by calling, she leads God's people into His presence through worship, a ministry marked by a posture of humility and reverence that consistently draws attention away from the platform and fixes it on Christ.

As the middle of three girls, Manji often points to that upbringing as the root of the servant's heart now visible in her ministry — one shaped as much in hospital rooms as on the worship stage, and equally at home in both.`,
    photo: '/manji-dandam.png',
    frameColor: '#e3d9cc',
    session: 'Session details coming soon.',
  },
  {
    id: '15',
    name: 'Oreoluwa Otunbanjo',
    role: 'Creator',
    org: 'Makeup Classes by Ore',
    discipline: 'Media',
    bio: `Oreoluwa Otunbanjo, known to her audience as Ore Otun, is a creator and makeup artist based in Houston, Texas.

Her work reaches more than 150,000 people and has been watched and shared millions of times. She built it in the beauty space, teaching technique in plain language to women who wanted to learn properly rather than be impressed. She has since turned that into a school, teaching one-to-one, in groups and online through Makeup Classes by Ore.

Alongside the tutorials she publishes on church, faith, dating and ordinary life.`,
    photo: '/oreoluwa-otunbanjo.JPEG',
    frameColor: '#e8dce0',
    session: 'Session details coming soon.',
  },
]

// Convener first, then flyer order (top-left → bottom-right), then remaining speakers
const panelistOrder = ['1', '7', '9', '3', '11', '8', '4', '2', '5', '6', '12', '15', '10', '13', '14']
const panelists = panelistOrder
  .map((id) => panelistProfiles.find((panelist) => panelist.id === id))
  .filter(Boolean)

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
    quote:
      'These days of prayer are activating a different me. I can feel the change in my peace, confidence and spiritual awareness, and even people around me are saying something is different about me. This journey is not just changing how I pray — it is changing who I am becoming.',
    name: 'Gideon N.',
    role: 'Startup Founder',
    city: 'San Francisco, California',
    program: 'SHIFT 90 Days',
  },

  {
    quote:
      'During the 120 days, God gave me a revelation that shifted something deeply within me and drew me into a new level of prayer. Since then, I have seen His faithfulness in remarkable ways — renewed boldness to serve Him, the blessing of a car, graduating at the top of my graduate class, and receiving a new job. This journey has strengthened my faith and reminded me that God is truly faithful.',
    name: 'Okelue C.',
    role: 'Engineer',
    city: 'Houston',
    program: 'SHIFT 120 Days',
  },

  {
    quote:
      'Because of SHIFT, my prayer life has taken a leap! I’ve grown in intensity, consistency, and perseverance in prayer. I’ve also experienced the joy of standing in the gap for others and witnessing incredible breakthroughs—doors that had been delayed for several years suddenly opening. SHIFT has deepened my faith and transformed how I approach prayer, intercession, and trusting God.',
    name: 'Omasan O.',
    role: 'Administrator',
    city: 'Houston',
    program: '24 Hours Stretch',
  },

  {
    quote:
      'The 48 Hours Retreat was definitely a God-orchestrated moment that redefined my entrance into 2026. It restored hope in specific areas of my life where I had lost it, reignited my hunger for fervent, heartfelt prayer and sharpened my prophetic sensitivity to see and hear more clearly. It became my personal crossover — a spiritual reset that propelled me forward, confirmed through a series of dreams afterward.',
    name: 'Gift O.',
    role: 'Medical Laboratory Scientist',
    city: 'Houston',
    program: '48 Hours Stretch',
  },

  {
    quote:
      'The 48 hours of prayer became a powerful turning point in my life. God opened doors and opportunities I never expected, connected me with the right mentors and people, and gave me the wisdom and clarity to start two growing companies. I experienced breakthroughs, chains were broken, and my vision became clearer. This journey didn’t just change my prayers — it changed my direction and deepened my trust in God.',
    name: 'Precious O.',
    role: '',
    city: 'Houston, Texas',
    program: '48 Hours Stretch',
  },

  {
    quote:
      'SHIFT 120 became a foundation for my year. I joined at a time when I felt overwhelmed and my prayer life had grown weak, but through the journey, God revived my hunger for Him and deepened my spiritual sensitivity. My relationship with God has been transformed, and I also found a community of people who have become family. I am deeply grateful to have been part of SHIFT 120.',
    name: 'Linda O.',
    role: 'Healthcare Professional',
    city: 'New Jersey',
    program: 'SHIFT 120 Days',
  },
];

function TestimonialModal({ testimonial, onClose }) {
  if (!testimonial) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Testimonial from ${testimonial.name}`}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white p-10 shadow-2xl md:p-14"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center text-black/40 transition-colors hover:text-black"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <p className="text-5xl font-bold leading-none text-[#f73301]" aria-hidden="true">"</p>
        <blockquote className="mt-4 text-lg font-normal leading-relaxed text-black/80 md:text-xl">
          {testimonial.quote}
        </blockquote>
        <footer className="mt-8 border-t border-black/10 pt-6">
          <p className="text-sm font-semibold text-black">{testimonial.name}</p>
          <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.15em] text-black/40">
            {testimonial.role}{testimonial.role && ' — '}{testimonial.city}
          </p>
          {testimonial.program && (
            <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.15em] text-[#f73301]/70">
              {testimonial.program}
            </p>
          )}
        </footer>
      </div>
    </div>
  );
}

function Testimonials() {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => { if (e.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  return (
    <>
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
                onClick={() => setSelected(testimonial)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelected(testimonial); }}
                aria-label={`Read full testimonial from ${testimonial.name}`}
                className="group flex min-h-[330px] w-[min(82vw,480px)] shrink-0 cursor-pointer flex-col justify-between border border-black/10 bg-white p-8 shadow-[0_12px_35px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_16px_45px_rgba(0,0,0,0.1)] md:p-12"
              >
                <div className="min-h-0 flex-1 overflow-hidden">
                  <p className="text-5xl font-bold leading-none text-[#f73301]" aria-hidden="true">"</p>
                  <blockquote
                    className="mt-4 text-xl font-normal leading-snug text-black/80 md:text-2xl"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {testimonial.quote}
                  </blockquote>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-[#f73301] opacity-0 transition-opacity group-hover:opacity-100">
                    Read more →
                  </p>
                </div>
                <footer className="mt-10 border-t border-black/10 pt-6">
                  <p className="text-sm font-semibold text-black">{testimonial.name}</p>
                  <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.15em] text-black/40">
                    {testimonial.role}{testimonial.role && ' — '}{testimonial.city}
                  </p>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>
      <TestimonialModal testimonial={selected} onClose={() => setSelected(null)} />
    </>
  );
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

function SocialIcon({ name, className = 'h-5 w-5' }) {
  const commonProps = {
    className,
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

  if (name === 'TikTok') {
    return (
      <svg {...commonProps} fill="currentColor" stroke="none">
        <path d="M15.6 3c.32 2.22 1.57 3.55 3.74 3.69v3.15a8.4 8.4 0 0 1-3.7-.86v6.1a5.92 5.92 0 1 1-5.1-5.87v3.2a2.75 2.75 0 1 0 1.91 2.67V3h3.15Z" />
      </svg>
    )
  }

  if (name === 'Facebook') {
    return (
      <svg {...commonProps} fill="currentColor" stroke="none">
        <path d="M13.7 21v-8h2.7l.4-3.1h-3.1V7.93c0-.9.25-1.51 1.56-1.51h1.67V3.63a22.3 22.3 0 0 0-2.43-.13c-2.4 0-4.05 1.47-4.05 4.16V9.9H7.73V13h2.72v8h3.25Z" />
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
  const socialLinks = [
    { name: 'Instagram', href: 'https://www.instagram.com/10hourshouston' },
    { name: 'Facebook', href: 'https://www.facebook.com/share/1J3EpML7BD/?mibextid=wwXIfr' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/10-hours-houston/' },
    { name: 'YouTube', href: '#' },
    { name: 'TikTok', href: 'https://www.tiktok.com/@10hourshouston' },
  ]

  return (
    <footer className="border-t border-white/8 bg-black px-6 py-16 text-white">
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
            <a href="/schedule" className="mt-4 inline-flex text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f73301] transition-opacity hover:opacity-75">View full schedule →</a>
          </div>

          <div>
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-white/30">Contact</p>
            <a href="mailto:contact@10hourshouston.com" className="mb-6 block text-sm text-white/50 transition-colors hover:text-white">
              contact@10hourshouston.com
            </a>
            <a href="/sponsors" className="mb-6 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f73301] transition-opacity hover:opacity-75">
              Partner with us →
            </a>
            <div className="flex gap-4">
              {socialLinks.map(({ name, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  title={name}
                  className="text-white/30 transition-colors hover:text-white"
                >
                  <SocialIcon name={name} />
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

function InnerPageHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-[#f73301]/35 bg-[#261813]/95 px-6 shadow-[0_10px_32px_rgba(247,51,1,0.10)] backdrop-blur-md md:h-[72px] md:px-10">
      <a href="/" className="flex shrink-0 items-center" aria-label="10 Hours Houston home">
        <img className="sponsor-brand block h-auto w-[120px]" src="/10-hours-houston-logo.svg" alt="10 Hours Houston" />
      </a>
      <div className="flex items-center gap-5">
        <a href="/" className="sponsor-back-link text-[10px] font-semibold uppercase tracking-[0.16em] transition-opacity hover:opacity-75">
          ← Back Home
        </a>
        <a className="sponsor-register hidden bg-[#f73301] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#c42a01] sm:inline-flex" href={REGISTER_URL} target="_blank" rel="noreferrer">
          Register
        </a>
      </div>
    </header>
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

const sponsorshipTiers = [
  'Bronze — $2,000',
  'Silver — $3,000',
  'Gold — $5,000',
  'Diamond — $15,000+',
]

const sponsorTitles = [
  'Mr.',
  'Mrs.',
  'Ms.',
  'Miss',
  'Dr.',
  'Pastor',
  'Reverend',
  'Professor',
]

const sponsorNamePattern = /^[\p{L}\p{M}][\p{L}\p{M}\s.'’\-]*$/u
const sponsorEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function cleanSponsorValue(value) {
  return String(value ?? '').trim().replace(/\s+/g, ' ')
}

function validateSponsorForm(values) {
  const errors = {}

  if (values.firstName.length < 2 || !sponsorNamePattern.test(values.firstName)) {
    errors.firstName = 'Enter a valid first name.'
  }
  if (values.lastName.length < 2 || !sponsorNamePattern.test(values.lastName)) {
    errors.lastName = 'Enter a valid last name.'
  }
  if (!sponsorTitles.includes(values.title)) errors.title = 'Select a title.'
  if (values.company.length < 2) errors.company = 'Enter your company or organization.'
  if (values.email.length > 254 || !sponsorEmailPattern.test(values.email)) {
    errors.email = 'Enter a valid email address.'
  }
  if (!sponsorshipTiers.includes(values.sponsorshipTier)) {
    errors.sponsorshipTier = 'Select a sponsorship level.'
  }

  return errors
}

const scheduleMovements = {
  encounter: { numeral: 'I', title: 'Encounter', subtitle: 'Fire and consecration', time: '10:00 AM — 11:45 AM', count: '6 segments' },
  revelation: { numeral: 'II', title: 'Revelation', subtitle: 'Vision for the mountains', time: '12:05 PM — 1:35 PM', count: '4 segments' },
  engagement: { numeral: 'III', title: 'Engagement', subtitle: 'Witnessing in the age', time: '2:20 PM — 6:40 PM', count: '8 segments' },
  commissioning: { numeral: 'IV', title: 'Commissioning', subtitle: 'Deployment into the city', time: '6:40 PM — 8:00 PM', count: '6 segments' },
}

const scheduleItems = [
  { movement: 'encounter', time: '10:00 — 10:10 AM', duration: '10 min', type: 'Opening', title: 'Opening Prayer & Call to Worship', description: 'Welcome, theme declaration, and the setting of the spiritual atmosphere.' },
  { movement: 'encounter', time: '10:10 — 10:35 AM', duration: '25 min', type: 'Worship', title: 'Intense Worship I', description: 'Deep worship, surrender, hunger, and baptism of fire.' },
  { movement: 'encounter', time: '10:35 — 10:40 AM', duration: '5 min', type: 'Teaching', title: 'Vision & Mission', description: 'Give clarity and establish the mandate for the day.' },
  { movement: 'encounter', time: '10:40 — 11:10 AM', duration: '30 min', type: 'Prayer', title: 'Consecration', description: 'Repentance, purification, and personal rededication.' },
  { movement: 'encounter', time: '11:10 — 11:40 AM', duration: '30 min', type: 'Prayer', title: 'Alignment', description: 'Alignment with God’s will for one’s life.' },
  { movement: 'encounter', time: '11:40 — 11:45 AM', duration: '5 min', type: 'Spoken Word', title: 'Spoken Word', description: 'A creative proclamation of the Witnesses theme through poetry.' },
  { movement: 'encounter', time: '11:45 AM — 12:05 PM', duration: '20 min', type: 'Interval', title: 'Exhibit Booths · Networking · Coffee', description: 'Explore partner exhibits, build meaningful connections, and enjoy coffee.', interval: true },
  { movement: 'revelation', time: '12:05 — 12:15 PM', duration: '10 min', type: 'Film', title: 'Documentary', description: 'Explore Christianity’s historical contribution to science and technology, and the Church’s mandate in the modern age.' },
  { movement: 'revelation', time: '12:15 — 12:35 PM', duration: '20 min', type: 'Teaching', title: 'Introduction — Witnesses', description: 'Establish the theological and cultural meaning of being a witness, and introduce the Spheres of Influence framework.' },
  { movement: 'revelation', time: '12:35 — 1:05 PM', duration: '30 min', type: 'Prayer', title: 'Prayer Session I — Re-digging Ancient Wells I', description: 'Targeted intercession over selected spheres of influence.' },
  { movement: 'revelation', time: '1:05 — 1:35 PM', duration: '30 min', type: 'Prayer', title: 'Prayer Session II — Re-digging Ancient Wells II', description: 'Targeted intercession over selected spheres of influence.' },
  { movement: 'revelation', time: '1:35 — 2:20 PM', duration: '45 min', type: 'Interval', title: 'Lunch', description: 'A shared meal and rest before the afternoon sessions.', interval: true },
  { movement: 'engagement', time: '2:20 — 2:40 PM', duration: '20 min', type: 'Worship', title: 'Worship II', description: 'Recenter hearts on God and prepare the atmosphere for the afternoon conversations and impartation.' },
  { movement: 'engagement', time: '2:40 — 3:40 PM', duration: '1 hour', type: 'Panel', title: 'Panel Session I — Witnessing in the AI Age', description: 'Explore how artificial intelligence is reshaping society, and how believers can respond with wisdom, ethics, excellence, and conviction.', featured: true },
  { movement: 'engagement', time: '3:40 — 3:55 PM', duration: '15 min', type: 'Q & A', title: 'Panel Session I — Questions', description: 'An interactive audience question-and-answer session with the panelists.' },
  { movement: 'engagement', time: '3:55 — 4:25 PM', duration: '30 min', type: 'Prayer', title: 'Wisdom for the Age', description: 'Prayers for divine wisdom in engaging this age.' },
  { movement: 'engagement', time: '4:25 — 4:55 PM', duration: '30 min', type: 'Prayer', title: 'Boldness and Audacity', description: 'Prayers for boldness and audacity to thrive in this age.' },
  { movement: 'engagement', time: '4:55 — 5:15 PM', duration: '20 min', type: 'Interval', title: 'Exhibit Booths · Networking · Coffee', description: 'Explore partner exhibits, build meaningful connections, and enjoy coffee.', interval: true },
  { movement: 'engagement', time: '5:15 — 5:25 PM', duration: '10 min', type: 'Worship', title: 'Worship III', description: 'A focused moment of worship to renew spiritual attention and prepare hearts for the next session.' },
  { movement: 'engagement', time: '5:25 — 6:25 PM', duration: '1 hour', type: 'Panel', title: 'Panel Session II — Witnessing with Content', description: 'Examine how media, storytelling, communication, and digital content can communicate truth and shape culture.', featured: true },
  { movement: 'engagement', time: '6:25 — 6:40 PM', duration: '15 min', type: 'Q & A', title: 'Panel Session II — Questions', description: 'An interactive audience question-and-answer session with the panelists.' },
  { movement: 'commissioning', time: '6:40 — 6:55 PM', duration: '15 min', type: 'Prayer', title: 'Houston & America’s Prophetic Mandate · Intercession', description: 'Prophetic declarations and intercession concerning Houston’s role in revival, innovation, and global influence, and America’s spiritual destiny.' },
  { movement: 'commissioning', time: '6:55 — 7:25 PM', duration: '30 min', type: 'Ministry', title: 'Impartation and the Prophetic', description: 'A time of prophetic ministry, prayer, spiritual impartation, commissioning, and activation for Kingdom assignments.' },
  { movement: 'commissioning', time: '7:25 — 7:35 PM', duration: '10 min', type: 'Ministry', title: 'Testimonies', description: 'Personal accounts of God’s faithfulness and answered prayer.' },
  { movement: 'commissioning', time: '7:35 — 7:45 PM', duration: '10 min', type: 'Worship', title: 'Praise', description: 'Celebrate God’s faithfulness through joyful praise, thanksgiving, and corporate rejoicing.' },
  { movement: 'commissioning', time: '7:45 — 7:55 PM', duration: '10 min', type: 'Protocol', title: 'Honor Guests', description: 'Recognize and appreciate invited guests, speakers, partners, sponsors, leaders, and contributors.' },
  { movement: 'commissioning', time: '7:55 — 8:00 PM', duration: '5 min', type: 'Closing', title: 'Closing', description: 'Final charge, key announcements, next steps, appreciation, closing prayer, and benediction.' },
]

function SchedulePage() {
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

function SponsorPage() {
  const [formErrors, setFormErrors] = useState({})
  const [formStatus, setFormStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const clearFieldError = (event) => {
    const { name } = event.currentTarget
    setFormErrors((current) => {
      if (!current[name]) return current
      const next = { ...current }
      delete next[name]
      return next
    })
    setFormStatus('')
  }

  const handleSponsorSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const values = {
      firstName: cleanSponsorValue(data.get('firstName')),
      lastName: cleanSponsorValue(data.get('lastName')),
      title: cleanSponsorValue(data.get('title')),
      company: cleanSponsorValue(data.get('company')),
      email: cleanSponsorValue(data.get('email')).toLowerCase(),
      sponsorshipTier: cleanSponsorValue(data.get('sponsorshipTier')),
    }
    const errors = validateSponsorForm(values)

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      setFormStatus('Please correct the highlighted fields.')
      form.elements[Object.keys(errors)[0]]?.focus()
      return
    }

    setFormErrors({})
    setIsSubmitting(true)
    setFormStatus('Submitting your partnership inquiry…')

    const googleForm = document.createElement('form')
    googleForm.action = SPONSOR_FORM_RESPONSE_URL
    googleForm.method = 'POST'
    googleForm.target = 'sponsor-form-response'
    googleForm.hidden = true

    const fields = {
      emailAddress: values.email,
      [SPONSOR_FORM_FIELDS.firstName]: values.firstName,
      [SPONSOR_FORM_FIELDS.lastName]: values.lastName,
      [SPONSOR_FORM_FIELDS.company]: values.company,
      [SPONSOR_FORM_FIELDS.title]: values.title,
      [SPONSOR_FORM_FIELDS.sponsorshipTier]: values.sponsorshipTier,
    }

    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = name
      input.value = value
      googleForm.appendChild(input)
    })

    document.body.appendChild(googleForm)
    googleForm.submit()
    googleForm.remove()
  }

  const handleGoogleFormResponse = () => {
    if (!isSubmitting) return
    setIsSubmitting(false)
    setFormStatus('Thank you—your sponsorship interest has been received. We’ll email you the sponsorship package for your selected tier.')
    document.querySelector('.sponsor-form')?.reset()
  }

  return (
    <div className="sponsor-page min-h-screen bg-[#f5f6f7] text-[#171717]">
      <InnerPageHeader />

      <main>
        <section className="px-6 pb-24 pt-10 md:pb-32 md:pt-14" aria-labelledby="sponsor-heading">
          <div className="mx-auto max-w-7xl">
            <a href="/" className="mb-14 inline-flex text-sm text-black/70 transition-colors hover:text-black md:mb-20">← &nbsp; BACK HOME</a>
            <div className="grid gap-16 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-24">
              <div>
                <h1 id="sponsor-heading" className="max-w-md text-[clamp(2.8rem,5vw,4.5rem)] font-normal leading-[1.05] tracking-[-0.055em]">
                  We appreciate<br />your interest in<br />partnering<br />with 10 Hours Houston
                </h1>
                <p className="mt-12 max-w-sm text-2xl font-normal leading-[1.5] tracking-[-0.025em] text-black/85">
                  Select a sponsorship level and send us your details. Once we receive your submission, we’ll email you the sponsorship package with the benefits for your selected tier.
                </p>

                <aside className="mt-12 max-w-sm border-l-4 border-[#f73301] bg-black px-7 py-8 text-white" aria-labelledby="donation-heading">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f73301]">Prefer to give?</p>
                  <h2 id="donation-heading" className="mt-3 text-2xl font-semibold tracking-[-0.025em]">Support the gathering with a donation.</h2>
                  <p className="mt-4 text-sm leading-relaxed text-white/65">
                    If you’d like to contribute without becoming a sponsorship partner, you can make a donation securely through Zeffy.
                  </p>
                  <a
                    href={DONATION_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-7 inline-flex bg-[#f73301] px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#c42a01]"
                  >
                    Make a donation →
                  </a>
                </aside>

                <div className="mt-12 max-w-sm border-t border-black/70 pt-10">
                  <p className="text-base leading-relaxed text-black/65">For general partnership questions:</p>
                  <a href="mailto:contact@10hourshouston.com" className="mt-3 inline-flex text-lg font-semibold underline decoration-1 underline-offset-4 transition-colors hover:text-[#f73301]">
                    contact@10hourshouston.com
                  </a>
                </div>
              </div>

              <form
                className="sponsor-form w-full bg-white px-6 py-9 shadow-[0_2px_20px_rgba(0,0,0,0.035)] md:px-12 md:py-12"
                noValidate
                onSubmit={handleSponsorSubmit}
              >
                <div className="mb-10 border-b border-black/10 pb-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f73301]">Partnership inquiry</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em]">Tell us how you’d like to partner.</h2>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-black/55">After we receive your inquiry, we’ll send the full sponsorship package for the level you select below.</p>
                </div>
                <div className="grid gap-9">
                  <label className="grid gap-3 text-lg">
                    <span>Title</span>
                    <span className="relative block">
                      <select required name="title" defaultValue="" autoComplete="honorific-prefix" aria-invalid={Boolean(formErrors.title)} aria-describedby={formErrors.title ? 'title-error' : undefined} onChange={clearFieldError} className={`h-14 w-full appearance-none border bg-white px-4 pr-12 text-lg outline-none transition-colors focus:border-[#f73301] ${formErrors.title ? 'border-red-600' : 'border-black/20'}`}>
                        <option value="" disabled>Select a title</option>
                        {sponsorTitles.map((title) => <option key={title} value={title}>{title}</option>)}
                      </select>
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm" aria-hidden="true">⌄</span>
                    </span>
                    {formErrors.title && <span id="title-error" className="text-sm text-red-700">{formErrors.title}</span>}
                  </label>
                  <label className="grid gap-2 text-lg">
                    <span>First Name</span>
                    <input required maxLength="80" name="firstName" type="text" autoComplete="given-name" placeholder="First Name" aria-invalid={Boolean(formErrors.firstName)} aria-describedby={formErrors.firstName ? 'firstName-error' : undefined} onChange={clearFieldError} className={`h-14 border-b bg-transparent px-0 text-lg outline-none transition-colors placeholder:text-black/35 focus:border-[#f73301] ${formErrors.firstName ? 'border-red-600' : 'border-black/35'}`} />
                    {formErrors.firstName && <span id="firstName-error" className="text-sm text-red-700">{formErrors.firstName}</span>}
                  </label>
                  <label className="grid gap-2 text-lg">
                    <span>Last Name</span>
                    <input required maxLength="80" name="lastName" type="text" autoComplete="family-name" placeholder="Last Name" aria-invalid={Boolean(formErrors.lastName)} aria-describedby={formErrors.lastName ? 'lastName-error' : undefined} onChange={clearFieldError} className={`h-14 border-b bg-transparent px-0 text-lg outline-none transition-colors placeholder:text-black/35 focus:border-[#f73301] ${formErrors.lastName ? 'border-red-600' : 'border-black/35'}`} />
                    {formErrors.lastName && <span id="lastName-error" className="text-sm text-red-700">{formErrors.lastName}</span>}
                  </label>
                  <label className="grid gap-2 text-lg">
                    <span>Company</span>
                    <input required maxLength="120" name="company" type="text" autoComplete="organization" placeholder="Company" aria-invalid={Boolean(formErrors.company)} aria-describedby={formErrors.company ? 'company-error' : undefined} onChange={clearFieldError} className={`h-14 border-b bg-transparent px-0 text-lg outline-none transition-colors placeholder:text-black/35 focus:border-[#f73301] ${formErrors.company ? 'border-red-600' : 'border-black/35'}`} />
                    {formErrors.company && <span id="company-error" className="text-sm text-red-700">{formErrors.company}</span>}
                  </label>
                  <label className="grid gap-2 text-lg">
                    <span>Email</span>
                    <input required maxLength="254" name="email" type="email" inputMode="email" autoComplete="email" placeholder="Email" aria-invalid={Boolean(formErrors.email)} aria-describedby={formErrors.email ? 'email-error' : undefined} onChange={clearFieldError} className={`h-14 border-b bg-transparent px-0 text-lg outline-none transition-colors placeholder:text-black/35 focus:border-[#f73301] ${formErrors.email ? 'border-red-600' : 'border-black/35'}`} />
                    {formErrors.email && <span id="email-error" className="text-sm text-red-700">{formErrors.email}</span>}
                  </label>
                  <label className="grid gap-3 text-lg">
                    <span>Sponsorship Level</span>
                    <span className="relative block">
                      <select required name="sponsorshipTier" defaultValue="" aria-invalid={Boolean(formErrors.sponsorshipTier)} aria-describedby={formErrors.sponsorshipTier ? 'sponsorshipTier-error' : undefined} onChange={clearFieldError} className={`h-14 w-full appearance-none border bg-white px-4 pr-12 text-lg outline-none transition-colors focus:border-[#f73301] ${formErrors.sponsorshipTier ? 'border-red-600' : 'border-black/20'}`}>
                        <option value="" disabled>Select a sponsorship level</option>
                        {sponsorshipTiers.map((tier) => <option key={tier} value={tier}>{tier}</option>)}
                      </select>
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm" aria-hidden="true">⌄</span>
                    </span>
                    {formErrors.sponsorshipTier && <span id="sponsorshipTier-error" className="text-sm text-red-700">{formErrors.sponsorshipTier}</span>}
                  </label>
                </div>

                <div className="mt-12 flex justify-center">
                  <button type="submit" disabled={isSubmitting} className="min-w-44 bg-[#f73301] px-8 py-4 text-[12px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#c42a01] disabled:opacity-60">
                    {isSubmitting ? 'Submitting…' : 'Submit'}
                  </button>
                </div>
                {formStatus && (
                  <p className={`mt-5 text-center text-sm ${Object.keys(formErrors).length > 0 ? 'text-red-700' : 'text-black/65'}`} role={Object.keys(formErrors).length > 0 ? 'alert' : 'status'} aria-live="polite">
                    {formStatus}
                  </p>
                )}
              </form>
              <iframe
                className="sr-only"
                name="sponsor-form-response"
                title="Sponsorship form submission response"
                onLoad={handleGoogleFormResponse}
              />
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
  if (currentPath === '/schedule') return <SchedulePage />
  if (currentPath === '/sponsors') return <SponsorPage />
  return isSpeakersPage ? <SpeakersPage /> : <HomePage />
}
