export interface ServiceFeature {
  title: string
  description: string
}

export interface ProcessStep {
  number: string
  title: string
  description: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface Service {
  id: string
  title: string
  shortTitle: string
  tagline: string
  description: string
  heroDescription: string
  accentColor: string
  heroGradient: string
  features: ServiceFeature[]
  process: ProcessStep[]
  faq: FAQ[]
  areas: string[]
  forWho: string
  outcome: string
  index: string
  workCategory: string
}

export const services: Service[] = [
  {
    id: 'web',
    title: 'Website Design & Development',
    shortTitle: 'Web',
    tagline: 'Sites that earn trust before anyone reads a word.',
    description: 'Not templates. Every site is designed and engineered from scratch — built to reflect the brand, perform under pressure, and convert the right people.',
    heroDescription: 'A website is your most permanent first impression. It should feel as good as your best work.',
    accentColor: 'rgba(99,102,241,0.12)',
    heroGradient: 'linear-gradient(145deg, #080814 0%, #0d0d22 50%, #12122e 100%)',
    features: [
      { title: 'Custom Design', description: 'Every layout, color, and interaction designed specifically for the brand. No templates.' },
      { title: 'Motion & Interaction', description: 'Framer Motion animations, scroll triggers, and hover states that make the site feel alive.' },
      { title: 'Next.js Development', description: 'Built on the fastest modern stack — Next.js, TypeScript, Tailwind. Loads fast, ranks well.' },
      { title: 'CMS Integration', description: 'Edit your content without touching code. Sanity, Contentful, or Notion as a backend.' },
      { title: 'Performance Optimization', description: 'Lighthouse scores in the 90s. Images optimized, fonts loaded right, zero layout shift.' },
      { title: 'Launch & Support', description: 'Deploy, test, go live — and we\'re available for questions and updates after.' },
    ],
    process: [
      { number: '01', title: 'Discovery & Strategy', description: 'We start with a deep conversation about the brand, the audience, and the goals. What does this site need to accomplish? Who is it for? What does success look like?' },
      { number: '02', title: 'Design Direction', description: 'Visual concepts in Figma — layouts, typography, color system, interactions. We iterate until the direction feels exactly right before any code is written.' },
      { number: '03', title: 'Build & Animate', description: 'Code is written with the same care as the design. Every animation is purposeful. Every breakpoint is considered. Every interaction is tested.' },
      { number: '04', title: 'Launch & Handoff', description: 'QA across browsers and devices, performance testing, and a smooth launch. You walk away with a site you understand and can maintain.' },
    ],
    faq: [
      { question: 'How long does a website take?', answer: 'A standard brand or portfolio site typically takes 4–8 weeks from kickoff to launch. Larger projects with complex features or integrations run 8–14 weeks. We set clear timelines at the start and stick to them.' },
      { question: 'Do you work with clients outside Toronto?', answer: 'Yes — web projects are fully remote-friendly. We\'ve worked with clients across Canada and internationally. Video calls and shared tools make the process seamless.' },
      { question: 'Can I update the site myself after launch?', answer: 'Yes. We build with CMS integration so you can edit text, images, and content without touching code. We also document anything custom so you\'re never dependent on us for basic changes.' },
      { question: 'Do you offer ongoing maintenance?', answer: 'Yes. We offer monthly retainers for sites that need regular updates, content work, or technical maintenance. This is discussed during the project and quoted separately.' },
      { question: 'What does a website cost?', answer: 'A focused brand or portfolio site starts around $3,500. Larger builds with CMS, e-commerce, or complex interactions start around $8,000. Every project gets a detailed quote after a discovery call.' },
    ],
    areas: ['Custom Design & Interaction', 'Next.js & React Development', 'Motion & Animation Systems', 'CMS Integration', 'Performance & SEO', 'Landing Pages & Funnels'],
    forWho: 'Founders, studios, and brands who want a site that earns trust before anyone reads a word.',
    outcome: 'A digital presence that does the convincing for you.',
    index: '01',
    workCategory: 'web',
  },
  {
    id: 'photography',
    title: 'Photography',
    shortTitle: 'Photography',
    tagline: 'Images built to hold attention.',
    description: 'Commercial, editorial, portrait, event. Images made for attention — naturally lit, intentionally framed, and built to last beyond the context they were shot for.',
    heroDescription: 'A great photograph stops people mid-scroll. That\'s what we\'re always trying to make.',
    accentColor: 'rgba(245,158,11,0.1)',
    heroGradient: 'linear-gradient(145deg, #120a04 0%, #1e1008 50%, #2a1a0a 100%)',
    features: [
      { title: 'Brand & Commercial', description: 'Photography built for marketing — products, teams, spaces, and campaigns that communicate quality.' },
      { title: 'Portrait & Lifestyle', description: 'Individual and team portraits that feel natural, not stiff. Shot in studio or on location.' },
      { title: 'Event Coverage', description: 'Full-day event documentation — candid moments, speaker shots, venue details, and group coverage.' },
      { title: 'Real Estate', description: 'Interior and exterior photography optimized for listings, developer portfolios, and commercial spaces.' },
      { title: 'Product Photography', description: 'Clean studio product shots on white, or lifestyle-integrated product images for e-commerce and marketing.' },
      { title: 'Editorial', description: 'Art-directed editorial shoots for magazines, campaigns, or brand storytelling.' },
    ],
    process: [
      { number: '01', title: 'Brief & Mood Board', description: 'We start by understanding the purpose of the images — what are they for, where will they live, what should they communicate. A mood board aligns the visual direction before the shoot.' },
      { number: '02', title: 'Location & Prep', description: 'Scout or confirm location, coordinate logistics, prepare shot list. You know exactly what to expect on the day.' },
      { number: '03', title: 'Shoot Day', description: 'Focused, efficient shooting with attention to light, composition, and expression. We direct when needed and step back when the moment calls for it.' },
      { number: '04', title: 'Edit & Deliver', description: 'Selects culled, color graded, and retouched. Delivered as high-res files in a private gallery within 5–10 business days.' },
    ],
    faq: [
      { question: 'What\'s included in the final delivery?', answer: 'High-resolution JPEG files in a private online gallery. The number of images depends on the scope — portrait sessions typically deliver 30–60 selects, brand shoots deliver 40–100+, events deliver 150–400+.' },
      { question: 'Do you travel for shoots?', answer: 'Yes. We\'re based in Toronto and shoot across the GTA. Travel for work further afield is available — travel costs are quoted upfront and included transparently.' },
      { question: 'Can I use the images for commercial purposes?', answer: 'Yes. Standard packages include full commercial usage rights for digital and print. Any extended licensing needs (broadcast, out-of-home advertising, etc.) are discussed upfront.' },
      { question: 'How far in advance should I book?', answer: 'For standard commercial and portrait work, 1–2 weeks is usually fine. For events, 3–6 weeks is ideal. Popular weekend dates book quickly, so earlier is better.' },
    ],
    areas: ['Brand & Commercial', 'Portrait & Lifestyle', 'Events & Coverage', 'Real Estate', 'Product Photography', 'Editorial'],
    forWho: 'Brands and individuals whose image needs to hold its own in competitive spaces.',
    outcome: 'A visual library worth using.',
    index: '02',
    workCategory: 'photo',
  },
  {
    id: 'film',
    title: 'Videography & Film',
    shortTitle: 'Film',
    tagline: 'Footage worth watching again.',
    description: 'Brand films, social content, wedding coverage, event highlights. Every project starts with a story and ends with footage that earns attention in a world full of noise.',
    heroDescription: 'Video that moves people — literally. From brand films to wedding highlights, everything is built to hold attention and mean something.',
    accentColor: 'rgba(16,185,129,0.08)',
    heroGradient: 'linear-gradient(145deg, #040e08 0%, #081410 50%, #0c1a14 100%)',
    features: [
      { title: 'Brand Films', description: 'Cinematic short films that tell a brand\'s story — concept to final cut, handled completely.' },
      { title: 'Social Content', description: 'Short-form vertical and horizontal content optimized for Instagram, TikTok, LinkedIn, and YouTube.' },
      { title: 'Event Highlights', description: 'Same-week turnaround event highlight films that capture energy, moments, and the essence of the event.' },
      { title: 'Wedding Films', description: 'Full-day coverage and a cinematic highlight film that lasts longer than any photo album.' },
      { title: 'Commercials', description: 'Product and service commercials for broadcast, web, or paid social — scripted, directed, produced.' },
      { title: 'Direction & Edit', description: 'Direction, cinematography, and post-production all in one — no hand-offs, no miscommunication.' },
    ],
    process: [
      { number: '01', title: 'Concept & Script', description: 'Every great video starts with clarity on what it needs to say and how. We develop the concept, write (or refine) the script, and align on tone, pace, and visual style.' },
      { number: '02', title: 'Pre-Production', description: 'Shot list, call sheet, location confirmation, talent coordination. The shoot day should never be the first time we\'ve thought about any of it.' },
      { number: '03', title: 'Production', description: 'Shooting with proper equipment, lighting, and sound. Efficient on set. Focused on getting what we actually need.' },
      { number: '04', title: 'Post & Delivery', description: 'Edit, color grade, sound design, music licensing. Delivered as web-optimized and master files in formats ready for wherever the video will live.' },
    ],
    faq: [
      { question: 'What kind of equipment do you shoot on?', answer: 'We shoot on cinema-grade cameras depending on the project — Sony FX series and Canon Cinema line are our primary tools. Audio is captured with professional wireless and boom systems.' },
      { question: 'Do you provide music?', answer: 'Yes. We have access to licensed music libraries and can work with music you provide (subject to licensing). For brand films, music direction is part of the creative process.' },
      { question: 'How long until the final video is ready?', answer: 'Brand films typically take 2–4 weeks from shoot to final delivery. Social content 1–2 weeks. Event highlights within 1–2 weeks. Wedding films 6–10 weeks depending on scope.' },
      { question: 'Can we do revisions?', answer: 'All projects include 2 rounds of revisions at the editing stage. Additional rounds can be added to any project and are quoted upfront.' },
    ],
    areas: ['Brand Films & Commercials', 'Wedding Highlight Films', 'Social & Short-Form Content', 'Event Coverage', 'Direction & Edit', 'Motion Graphics'],
    forWho: 'Anyone who wants video that converts, connects, or lasts.',
    outcome: 'Footage worth watching again.',
    index: '03',
    workCategory: 'film',
  },
  {
    id: 'creative-direction',
    title: 'Creative Direction',
    shortTitle: 'Creative Direction',
    tagline: 'The thinking that makes everything else land.',
    description: 'Brand strategy, visual systems, art direction — the work that decides what gets made and how, before anything is produced.',
    heroDescription: 'Most creative work fails because it was made without a clear point of view. This is the work that changes that.',
    accentColor: 'rgba(139,92,246,0.1)',
    heroGradient: 'linear-gradient(145deg, #0c0810 0%, #140d1e 50%, #1a1028 100%)',
    features: [
      { title: 'Brand Positioning', description: 'Defining what the brand stands for, who it\'s for, and what makes it different — in specific, ownable language.' },
      { title: 'Visual Identity Systems', description: 'Comprehensive visual systems: color, typography, photography style, layout rules, and usage guidelines.' },
      { title: 'Art Direction', description: 'Directing photography and video shoots — ensuring every frame serves the brand and the message.' },
      { title: 'Content Strategy', description: 'What to make, where to put it, and what it should communicate. Channel-specific creative strategy.' },
      { title: 'Brand Voice', description: 'How the brand speaks — tone, vocabulary, what to say and what never to say.' },
      { title: 'Campaign Direction', description: 'Concepting and directing marketing campaigns across channels — from idea to final execution.' },
    ],
    process: [
      { number: '01', title: 'Audit & Immersion', description: 'We study the brand, the market, the competition, and the audience. What exists? What\'s working? What\'s being left on the table?' },
      { number: '02', title: 'Strategy Development', description: 'Positioning, messaging hierarchy, and creative platform — the strategic foundation everything else is built on.' },
      { number: '03', title: 'Creative Development', description: 'Visual direction, tone of voice, art direction references. What does this brand actually look and sound like?' },
      { number: '04', title: 'System & Handoff', description: 'A documented creative system — guidelines, templates, references — so the work stays consistent beyond the engagement.' },
    ],
    faq: [
      { question: 'What makes this different from a branding agency?', answer: 'This is founder-level creative thinking applied to real business problems. No junior teams, no bloated process. Strategy and execution in the same hands.' },
      { question: 'Can creative direction be combined with other services?', answer: 'Yes — and it often should be. Creative direction as a foundation makes every downstream deliverable (website, photography, video) significantly stronger.' },
      { question: 'How long does a creative direction engagement take?', answer: 'Foundational brand strategy typically takes 3–6 weeks. Ongoing creative direction retainers are structured quarterly.' },
    ],
    areas: ['Brand Strategy & Positioning', 'Visual System Design', 'Art Direction', 'Content Strategy', 'Shoot & Production Direction', 'Brand Voice & Messaging'],
    forWho: 'Businesses at an inflection point who need a creative partner, not just a vendor.',
    outcome: "Clarity on what you're saying — and how to say it.",
    index: '04',
    workCategory: 'brand',
  },
  {
    id: 'weddings',
    title: 'Weddings',
    shortTitle: 'Weddings',
    tagline: 'The feeling of the day, preserved.',
    description: 'Full-day photography, cinematic highlight film, or both. The priority is always real moments, beautiful light, and delivering something that holds up in ten years.',
    heroDescription: 'Your wedding day is one of the few things worth getting exactly right. We treat it that way.',
    accentColor: 'rgba(244,63,94,0.07)',
    heroGradient: 'linear-gradient(145deg, #120808 0%, #1e0e0e 50%, #261212 100%)',
    features: [
      { title: 'Full-Day Coverage', description: 'From getting ready through reception and first dance. Every chapter of the day documented.' },
      { title: 'Ceremony & Reception', description: 'Every significant moment captured — ceremony, vows, speeches, first dances, and the candid moments between.' },
      { title: 'Highlight Film', description: 'A cinematic 4–6 minute film set to music — something you\'ll actually watch again and want to share.' },
      { title: 'Engagement Sessions', description: 'Pre-wedding sessions for portraits you\'ll actually use, and to get comfortable in front of the camera before the day.' },
      { title: 'Second Shooter', description: 'For larger weddings, a second photographer captures angles and moments a single shooter will miss.' },
      { title: 'Fine-Art Prints', description: 'Optional print packages — wall art, albums, and framed prints — handled through a professional print lab.' },
    ],
    process: [
      { number: '01', title: 'Initial Consultation', description: 'We talk through your day, your venue, your vision, and what matters most to you. This is where we decide if we\'re the right fit for each other.' },
      { number: '02', title: 'Planning Call', description: '4–6 weeks before the wedding: timeline review, shot list, venue walkthrough if possible. The goal is zero surprises on the day.' },
      { number: '03', title: 'The Day', description: 'We show up early, stay late, and stay out of the way. You shouldn\'t have to think about us — we\'ll be there.' },
      { number: '04', title: 'Delivery', description: 'Online gallery of full-resolution edited photos within 3–4 weeks. Highlight film within 8–10 weeks. Both delivered through a private, shareable link.' },
    ],
    faq: [
      { question: 'How many photos will we receive?', answer: 'Full-day coverage typically delivers 500–900 professionally edited images. We don\'t deliver every frame — we curate for the best 10% and edit those to a high standard.' },
      { question: 'Do you travel for destination weddings?', answer: 'Yes. Destination weddings are quoted with travel, accommodation, and time factored in. We\'ve shot weddings across Ontario and are open to further travel.' },
      { question: 'Can we choose the music for our highlight film?', answer: 'Yes, with some nuance. We can work with songs you provide (subject to licensing), or choose from licensed music libraries based on the tone you\'re after.' },
      { question: 'What if it rains?', answer: 'We shoot in any weather. Rain often makes for beautiful, moody images. We come prepared and adapt — we\'ve never had a wedding where weather ruined the coverage.' },
      { question: 'How far in advance should we book?', answer: 'Popular summer and fall dates book 12–18 months in advance. If your date is less than 6 months out, reach out — if the date is available, we can make it work.' },
    ],
    areas: ['Full-Day Coverage', 'Ceremony & Reception', 'Highlight Film', 'Second Shooter Available', 'Engagement Sessions', 'Fine-Art Print Options'],
    forWho: 'Couples who want their day documented with care and real intention.',
    outcome: 'The feeling of the day, preserved.',
    index: '05',
    workCategory: 'wedding',
  },
  {
    id: 'real-estate',
    title: 'Real Estate Media',
    shortTitle: 'Real Estate',
    tagline: 'Media that shortens time-on-market.',
    description: 'Property photography and video for listings that deserve more than standard media. Everything a buyer needs to picture themselves there — before the showing.',
    heroDescription: 'In a competitive market, listing quality is pricing strategy. Better media moves faster.',
    accentColor: 'rgba(59,130,246,0.08)',
    heroGradient: 'linear-gradient(145deg, #060c12 0%, #0a1018 50%, #0e1620 100%)',
    features: [
      { title: 'Interior Photography', description: 'Wide-angle, properly exposed interior shots that show spaces at their best — natural light balanced with fill.' },
      { title: 'Exterior Photography', description: 'Front, rear, and detail shots that give buyers the full picture of the property and its context.' },
      { title: 'Video Walkthroughs', description: 'Smooth cinematic walkthrough videos that let buyers experience the flow of the home before a showing.' },
      { title: 'Listing Reels', description: 'Short-form vertical and horizontal reels optimized for social media — built to stop the scroll.' },
      { title: 'Twilight Shoots', description: 'Golden hour and dusk exterior photography — the premium treatment that makes luxury listings stand out.' },
      { title: 'Aerial Photography', description: 'Drone photography and video for properties where the site and surroundings are part of the story.' },
    ],
    process: [
      { number: '01', title: 'Booking & Prep', description: 'Confirm date, walk through expectations, send prep checklist for the property. A clean, staged space makes a significant difference in the final product.' },
      { number: '02', title: 'Shoot Day', description: 'Typically 90 minutes to 3 hours depending on property size. We work efficiently and systematically — every room, every angle, interior and exterior.' },
      { number: '03', title: 'Edit & Deliver', description: 'All images edited for exposure, color, and vertical alignment. Delivered as web-optimized and print-ready files within 24–48 hours.' },
      { number: '04', title: 'Ready to List', description: 'Files delivered in a format ready for MLS, website, and social media. No extra steps needed before publishing.' },
    ],
    faq: [
      { question: 'How quickly are photos delivered?', answer: 'Standard delivery is 24–48 hours after the shoot. Rush delivery (same day or next morning) is available for an additional fee — just let us know at booking.' },
      { question: 'What size properties do you cover?', answer: 'From studio condos to large estate homes. Pricing scales with square footage and the number of rooms. We quote based on property details before confirming.' },
      { question: 'Do you shoot occupied homes?', answer: 'Yes. We work around furniture and occupants. For best results, we send a staging checklist beforehand — small preparation makes a big visual difference.' },
      { question: 'Is twilight photography worth it?', answer: 'For luxury listings and properties with outdoor features, yes — twilight dramatically improves exterior presentation and drives more listing clicks. We recommend it for any home priced over $1.2M.' },
    ],
    areas: ['Interior Photography', 'Exterior & Aerial', 'Video Walkthroughs', 'Listing Reels', 'Twilight Shoots', 'Virtual Tour Integration'],
    forWho: 'Agents and developers who know the listing presentation moves the deal.',
    outcome: 'Media that shortens time-on-market.',
    index: '06',
    workCategory: 'real-estate',
  },
]
