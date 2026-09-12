import { useEffect, useRef, useState } from 'react'
import { Footer, InnerPageHeader } from '../components/layout/SiteLayout'
import { DONATION_URL, SPONSOR_FORM_FIELDS, SPONSOR_FORM_RESPONSE_URL } from '../config/urls'

import { cleanSponsorValue, sponsorshipTiers, sponsorTitles, validateSponsorForm } from '../utils/sponsorForm'

export default function SponsorPage() {
  const [formErrors, setFormErrors] = useState({})
  const [formStatus, setFormStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const successCloseButtonRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (!successModalOpen) return undefined

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSuccessModalOpen(false)
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    successCloseButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [successModalOpen])

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
    setFormStatus('')
    setSuccessModalOpen(true)
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
      {successModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-6 py-10 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSuccessModalOpen(false)
          }}
        >
          <div
            className="w-full max-w-lg bg-white px-7 py-9 text-center shadow-2xl md:px-12 md:py-12"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sponsor-success-heading"
            aria-describedby="sponsor-success-message"
          >
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#f73301] text-2xl text-white" aria-hidden="true">✓</div>
            <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f73301]">Inquiry received</p>
            <h2 id="sponsor-success-heading" className="mt-3 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">Thank you for your interest.</h2>
            <p id="sponsor-success-message" className="mx-auto mt-5 max-w-md text-base leading-relaxed text-black/60">
              Your sponsorship interest has been received. We’ll email you the sponsorship package for your selected tier.
            </p>
            <button
              ref={successCloseButtonRef}
              type="button"
              className="mt-8 bg-[#f73301] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#c42a01]"
              onClick={() => setSuccessModalOpen(false)}
            >
              Continue
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}


