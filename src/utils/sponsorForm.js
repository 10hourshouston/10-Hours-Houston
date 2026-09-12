export const sponsorshipTiers = [
  'Bronze — $2,000',
  'Silver — $3,000',
  'Gold — $5,000',
  'Diamond — $15,000+',
]

export const sponsorTitles = [
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

export function cleanSponsorValue(value) {
  return String(value ?? '').trim().replace(/\s+/g, ' ')
}

export function validateSponsorForm(values) {
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

