// home/@hero/page.tsx
import { getHeroSection } from '@/api/sanity/landingPage/hero-section';
import Hero from '../sections/Hero';

export default async function HeroPage() {
  const heroData = await getHeroSection();
  return <Hero heroSection={heroData} />;
}
