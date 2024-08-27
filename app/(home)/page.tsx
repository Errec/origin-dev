import { getLandingPageData } from "@/api/sanity";
import Hero from "./components/Hero";

export default async function HomePage() {
  const landingPageData = await getLandingPageData();

  return (
    <main>
      <Hero heroSection={landingPageData.heroSection} />
    </main>
  );
}