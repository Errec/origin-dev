import {seo} from './common/seo'
import {about} from './documents/about'
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
  seo,
  about,
  blog,
  contact,
  projects,
  landingPage,
  heroSection,
  benefitsSection,
  technologiesSection,
  projectsSection,
  contactSection,
]
