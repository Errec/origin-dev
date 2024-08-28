import { getHeroSectionData, getTechnologiesSectionData } from "@/api/sanity";
import Hero from "./components/Hero";
import Technologies from "./components/Technologies";

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
