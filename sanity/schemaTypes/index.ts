import { seo } from './common/seo'
import { blog } from './documents/blog'
import { landingPage } from './documents/landingPage'
import { project } from './documents/project'
import { blogPreviewSection } from './objects/blogPreviewSection'
import { footerSection } from './objects/footerSection'
import { heroSection } from './objects/heroSection'
import { projectsSection } from './objects/projectsSection'
import { technologiesSection } from './objects/technologiesSection'

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