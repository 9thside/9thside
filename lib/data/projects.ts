export interface Project {
  id: string
  title: string
  category: 'web' | 'photo' | 'film' | 'wedding' | 'commercial' | 'real-estate' | 'brand'
  categoryLabel: string
  description: string
  year: string
  featured?: boolean
  span?: 'wide' | 'tall' | 'standard'
  gradient: string
  image: string
  heroImage: string
  videoUrl?: string
  tags?: string[]
}

export const projects: Project[] = [
  {
    id: 'zown-digital',
    title: 'Zown — Digital Presence',
    category: 'web',
    categoryLabel: 'Web',
    description: 'Full digital experience design for a proptech startup — brand system, product UI, and marketing site.',
    year: '2024',
    featured: true,
    span: 'wide',
    gradient: 'linear-gradient(145deg, #0a0a18 0%, #101030 50%, #181840 100%)',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=2400&h=1000&auto=format&fit=crop&q=80',
    tags: ['Next.js', 'Brand System', 'Product Design'],
  },
  {
    id: 'portrait-series-gta',
    title: 'Portrait Series — GTA',
    category: 'photo',
    categoryLabel: 'Photography',
    description: 'Editorial portraits across Toronto, exploring available light, quiet presence, and texture.',
    year: '2024',
    span: 'standard',
    gradient: 'linear-gradient(145deg, #180d06 0%, #3a1e0c 50%, #5a3018 100%)',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=900&h=700&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=2400&h=1000&auto=format&fit=crop&q=80',
    tags: ['Editorial', 'Portrait', 'Available Light'],
  },
  {
    id: 'brand-film',
    title: 'Brand Film — Commercial',
    category: 'film',
    categoryLabel: 'Film',
    description: 'End-to-end brand film: concept, direction, production, and edit for a Toronto commercial client.',
    year: '2024',
    span: 'wide',
    gradient: 'linear-gradient(145deg, #080e08 0%, #101e10 50%, #182818 100%)',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&h=800&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=2400&h=1000&auto=format&fit=crop&q=80',
    videoUrl: 'https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4',
    tags: ['Direction', 'Production', 'Commercial'],
  },
  {
    id: 'niagara-wedding',
    title: 'Vineyard Wedding — Niagara',
    category: 'wedding',
    categoryLabel: 'Wedding',
    description: 'Full-day coverage across a Niagara vineyard estate — photography and cinematic highlight film.',
    year: '2023',
    span: 'standard',
    gradient: 'linear-gradient(145deg, #160f04 0%, #302010 50%, #4a3218 100%)',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&h=700&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=2400&h=1000&auto=format&fit=crop&q=80',
    tags: ['Photography', 'Film', 'Full Day'],
  },
  {
    id: 'real-estate-suite',
    title: 'Real Estate Media — GTA',
    category: 'real-estate',
    categoryLabel: 'Real Estate',
    description: 'Photography and video walkthrough suite for high-value GTA residential listings.',
    year: '2024',
    span: 'standard',
    gradient: 'linear-gradient(145deg, #0a0a0a 0%, #181818 50%, #242424 100%)',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&h=700&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2400&h=1000&auto=format&fit=crop&q=80',
    tags: ['Photography', 'Video', 'Architecture'],
  },
  {
    id: 'founder-brand',
    title: 'Founder Brand — Visual Identity',
    category: 'brand',
    categoryLabel: 'Brand',
    description: 'Visual identity and content system for a Toronto-based founder and speaker.',
    year: '2023',
    span: 'standard',
    gradient: 'linear-gradient(145deg, #130813 0%, #28102a 50%, #3c1840 100%)',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&h=700&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=2400&h=1000&auto=format&fit=crop&q=80',
    tags: ['Identity', 'Content', 'Photography'],
  },
  {
    id: 'product-portraits',
    title: 'Product Photography — Studio',
    category: 'commercial',
    categoryLabel: 'Commercial',
    description: 'Clean studio product photography for a DTC skincare brand launching across retail.',
    year: '2023',
    span: 'standard',
    gradient: 'linear-gradient(145deg, #0d0d0a 0%, #1c1c14 50%, #2a2a1e 100%)',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=900&h=700&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=2400&h=1000&auto=format&fit=crop&q=80',
    tags: ['Product', 'Studio', 'Commercial'],
  },
  {
    id: 'event-series',
    title: 'Event Coverage — Series',
    category: 'commercial',
    categoryLabel: 'Commercial',
    description: 'Multi-event coverage series for a Toronto brand activation — stills and short-form highlights.',
    year: '2023',
    span: 'standard',
    gradient: 'linear-gradient(145deg, #080a14 0%, #101428 50%, #181e3a 100%)',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&h=700&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=2400&h=1000&auto=format&fit=crop&q=80',
    tags: ['Events', 'Coverage', 'Highlights'],
  },
]
