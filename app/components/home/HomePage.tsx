import { getHeroSectionData, getTechnologiesSectionData } from "@/api/sanity";
import Hero from "./sections/Hero";
import Technologies from "./sections/Technologies";

export default async function HomePage() {
  const heroData = await getHeroSectionData();
  const technologiesData = await getTechnologiesSectionData();
  return (
    <main>
      <Hero heroSection={heroData.heroSection} />
      <Technologies technologiesSection={technologiesData.technologiesSection} />
    </main>
  );
}
