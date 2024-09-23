import { GetStaticProps } from 'next';
import Benefits from './sections/Benefits';
import Contact from './sections/Contact';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import Technologies from './sections/Technologies';

// Import the API functions for fetching section data
import { getBenefitsSectionData } from '@/api/sanity/landingPage/benefits-section';
import { getContactSectionData } from '@/api/sanity/landingPage/contact-section';
import { getHeroSectionData } from '@/api/sanity/landingPage/hero-section';
import { getProjectsSectionData } from '@/api/sanity/landingPage/projects-section';
import { getTechnologiesSectionData } from '@/api/sanity/landingPage/technologies-section';

// Import types for the sections
import { BenefitsSection } from '@/types/benefits-section';
import { ContactSection } from '@/types/contact-section';
import { HeroSection } from '@/types/hero-section';
import { ProjectsSection } from '@/types/projects-section';
import { TechnologiesSection } from '@/types/technologies-section';

interface HomePageProps {
  benefitsData: BenefitsSection;
  contactData: ContactSection & { blogPostCount: number };
  heroData: HeroSection;
  projectsData: ProjectsSection;
  technologiesData: TechnologiesSection;
}

const HomePage = ({
  benefitsData,
  contactData,
  heroData,
  projectsData,
  technologiesData,
}: HomePageProps) => {
  return (
    <main>
      <Hero heroSection={heroData} />
      <Technologies technologiesSection={technologiesData} />
      <Projects projectsSection={projectsData} />
      <Benefits benefitsSection={benefitsData} />
      <Contact contactSection={contactData} />
    </main>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const benefitsData = await getBenefitsSectionData();
  const contactData = await getContactSectionData();
  const heroData = await getHeroSectionData();
  const projectsData = await getProjectsSectionData();
  const technologiesData = await getTechnologiesSectionData();

  return {
    props: {
      benefitsData,
      contactData,
      heroData,
      projectsData,
      technologiesData,
    },
  };
};

export default HomePage;
