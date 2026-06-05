export type Locale = 'pt' | 'en'

export type Translation = {
  meta: {
    title: string
    description: string
  }
  nav: {
    home: string
    about: string
    stack: string
    projects: string
    labs: string
    experience: string
    certifications: string
    contact: string
  }
  common: {
    github: string
    details: string
    demo: string
    close: string
    downloadResume: string
    availableFor: string
    conceptualPreview: string
    realPreview: string
    status: string
    technologies: string
  }
  hero: {
    eyebrow: string
    title: string
    subtitle: string
    primaryCta: string
    secondaryCta: string
    metrics: string[]
    photoAlt: string
  }
  about: {
    eyebrow: string
    title: string
    paragraphs: string[]
  }
  skills: {
    eyebrow: string
    title: string
    description: string
    groups: Array<{ title: string; items: string[] }>
  }
  projects: {
    eyebrow: string
    title: string
    description: string
    featuredTitle: string
    secondaryTitle: string
  }
  experience: {
    eyebrow: string
    title: string
    items: Array<{
      role: string
      company: string
      location: string
      period: string
      bullets: string[]
    }>
  }
  certifications: {
    eyebrow: string
    title: string
    description: string
    items: string[]
  }
  contact: {
    eyebrow: string
    title: string
    description: string
    emailLabel: string
    linkedinLabel: string
    githubLabel: string
  }
}

export type Project = {
  id: string
  featured: boolean
  repoUrl: string
  demoUrl?: string
  previewKind: 'conceptual' | 'real'
  previewType: 'workflow' | 'dashboard' | 'terminal' | 'app' | 'web'
  previewLabel?: Record<Locale, string>
  screenshot?: string
  status: Record<Locale, string>
  title: Record<Locale, string>
  description: Record<Locale, string>
  value: Record<Locale, string>
  details: Record<Locale, string[]>
  technologies: string[]
}
