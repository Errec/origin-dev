import { getHeroSectionData, getProjectsSectionData, getTechnologiesSectionData } from "@/api/sanity";
import Hero from "./hero-section/page";
import Projects from "./projects-section/page";
import Technologies from "./technologies-section/page";

export default async function HomePage() {
  const heroData = await getHeroSectionData();
  const technologiesData = await getTechnologiesSectionData();
  const projectsData = await getProjectsSectionData();

  return (
    <main>
      <Hero heroSection={heroData.heroSection} />
      <Technologies technologiesSection={technologiesData.technologiesSection} />
      <Projects projectsSection={projectsData.projectsSection} />
    </main>
  );
}