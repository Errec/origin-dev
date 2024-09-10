import { seo } from './common/seo'
import { blog } from './documents/blog'
import { landingPage } from './documents/landing-page'
import { project } from './documents/project'
import { contactSection } from './objects/landingPage/contact-section'
import { heroSection } from './objects/landingPage/hero-section'
import { projectsSection } from './objects/landingPage/projects-section'
import { technologiesSection } from './objects/landingPage/technologies-section'

export const schemaTypes = [
  heroSection,
  projectsSection,
  technologiesSection,
  contactSection,
  landingPage,
  blog,
  project,
  seo
]