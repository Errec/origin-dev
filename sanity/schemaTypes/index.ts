import {seo} from './common/seo'
import {blog} from './documents/blog'
import {contact} from './documents/contact'
import {landingPage} from './documents/landing-page'
import {projects} from './documents/projects'
import {benefitsSection} from './objects/landingPage/benefits-section'
import {contactSection} from './objects/landingPage/contact-section'
import {heroSection} from './objects/landingPage/hero-section'
import {projectsSection} from './objects/landingPage/projects-section'
import {technologiesSection} from './objects/landingPage/technologies-section'

export const schemaTypes = [
  heroSection,
  benefitsSection,
  technologiesSection,
  projectsSection,
  contactSection,
  landingPage,
  blog,
  projects,
  contact,
  seo,
]
