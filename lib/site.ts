export const site = {
  name: '9thside',
  url: 'https://www.9thside.com',
  email: 'hello@9thside.com',
  founder: 'Nabeel Rushdi',
  location: 'Toronto & the GTA',
  // Add your Instagram handle (without @) to show the link across the site.
  instagram: '',
  // Client proofing galleries on Pixieset. Leave empty to hide the link.
  clientGalleries: 'https://9thside.pixieset.com',
  tagline: 'Wedding & portrait photography',
  description:
    'Wedding, couples and portrait photography in Toronto and the GTA by Nabeel Rushdi. Honest, cinematic photographs of the people and days that matter.',
}

export const navLinks = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/weddings', label: 'Weddings' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
]

export interface Vertical {
  id: string
  category: string
  title: string
  line: string
  body: string
  includes: string[]
  href?: string
}

export const verticals: Vertical[] = [
  {
    id: 'weddings',
    category: 'wedding',
    title: 'Weddings',
    line: 'The whole day, told honestly.',
    body: 'Full-day coverage from getting ready to the last dance — nikkahs, receptions, mehndis, church ceremonies and everything in between. Directed when it helps, invisible when it matters.',
    includes: ['Full-day and multi-day coverage', 'Pre-shoots and engagement sessions', 'Private online gallery', 'Wedding films on request'],
    href: '/weddings',
  },
  {
    id: 'couples',
    category: 'couples',
    title: 'Couples & Engagements',
    line: 'An hour or two, just the two of you.',
    body: 'Relaxed sessions somewhere that means something to you. A good way to get comfortable in front of the camera before the wedding — or simply to have photographs of this chapter.',
    includes: ['Location scouting', 'Golden-hour sessions', 'Proposal coverage', 'Save-the-date ready images'],
  },
  {
    id: 'portraits',
    category: 'portrait',
    title: 'Portraits',
    line: 'People as they actually are.',
    body: 'Individual, family, graduation and editorial portraits. Natural light where possible, shaped light where needed, and enough time that nobody feels rushed.',
    includes: ['Individual and family sessions', 'Headshots and personal branding', 'Graduation portraits', 'Studio or on location'],
  },
  {
    id: 'events',
    category: 'event',
    title: 'Events',
    line: 'The room, the energy, the details.',
    body: 'Milestone birthdays, galas, corporate events and brand activations. Candid coverage of the people in the room and the work that went into it.',
    includes: ['Candid and group coverage', 'Speaker and stage photography', 'Venue and detail shots', 'Fast-turnaround selects'],
  },
  {
    id: 'commercial',
    category: 'commercial',
    title: 'Commercial & Brand',
    line: 'Images that work as hard as you do.',
    body: 'Photography for founders, teams and products — a consistent library of images for your site, your socials and your campaigns, with full commercial usage.',
    includes: ['Brand and team photography', 'Product and lifestyle', 'Campaign and editorial', 'Commercial usage rights'],
  },
  {
    id: 'real-estate',
    category: 'real-estate',
    title: 'Real Estate',
    line: 'Spaces shown at their best.',
    body: 'Interior and exterior photography for listings, developers and designers across the GTA. Clean lines, true colour, and light that sells the room.',
    includes: ['Interiors and exteriors', 'Listing-ready delivery', 'Twilight photography', 'Video walkthroughs on request'],
  },
]
