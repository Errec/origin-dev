import { getHeroSectionData, getProjectsSectionData, getTechnologiesSectionData } from "@/api/sanity";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Technologies from "./sections/Technologies";

export const revalidate = 30; // Revalidate every 30 seconds

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