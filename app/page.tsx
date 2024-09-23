import Benefits from '@/(routes)/home/sections/Benefits';
import Contact from '@/(routes)/home/sections/Contact';
import Hero from '@/(routes)/home/sections/Hero';
import Projects from '@/(routes)/home/sections/Projects';
import Technologies from '@/(routes)/home/sections/Technologies';

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

// This is now an async server-side component
const HomePage = async () => {
  const benefitsData = await getBenefitsSectionData();
  const contactData = await getContactSectionData();
  const heroData = await getHeroSectionData();
  const projectsData = await getProjectsSectionData();
  const technologiesData = await getTechnologiesSectionData();

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

export default HomePage;
