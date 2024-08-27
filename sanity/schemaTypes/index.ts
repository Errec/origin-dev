import { seo } from './common/seo'
import { blog } from './documents/blog'
import { landingPage } from './documents/landing-page'
import { project } from './documents/project'
import { blogPreviewSection } from './objects/landingPage/blog-preview-section'
import { footerSection } from './objects/landingPage/footer-section'
import { heroSection } from './objects/landingPage/hero-section'
import { projectsSection } from './objects/landingPage/projects-section'
import { technologiesSection } from './objects/landingPage/technologies-section'

export const schemaTypes = [
  heroSection,
  projectsSection,
  technologiesSection,
  blogPreviewSection,
  footerSection,
  landingPage,
  blog,
  project,
  seo
]