import { getHeroSectionData } from "@/api/sanity";
import Hero from "./components/Hero";

export default async function HomePage() {
  const heroData = await getHeroSectionData();

  return (
    <main>
      <Hero heroSection={heroData.heroSection} />
    </main>
  );
}