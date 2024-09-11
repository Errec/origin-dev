// home/@hero/page.tsx
import { getHeroSectionData } from '@/api/sanity/landingPage/hero-section';
import Hero from '../sections/Hero';

export default async function HeroPage() {
  const heroData = await getHeroSectionData();
  return <Hero heroSection={heroData} />;
}
