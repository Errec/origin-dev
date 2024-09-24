import { Suspense } from 'react';
import Loading from './loading';
import Benefits from './sections/Benefits';
import Contact from './sections/Contact';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import Technologies from './sections/Technologies';

import { getBenefitsSectionData } from '@/api/sanity/landingPage/benefits-section';
import { getContactSectionData } from '@/api/sanity/landingPage/contact-section';
import { getHeroSectionData } from '@/api/sanity/landingPage/hero-section';
import { getProjectsSectionData } from '@/api/sanity/landingPage/projects-section';
import { getTechnologiesSectionData } from '@/api/sanity/landingPage/technologies-section';

const minimumLoadTime = 1000; // 1 second

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function Content() {
  const startTime = Date.now();

  try {
    await delay(minimumLoadTime); // Ensure minimum delay

    const [
      benefitsData,
      contactData,
      heroData,
      projectsData,
      technologiesData,
    ] = await Promise.all([
      getBenefitsSectionData().catch((e) => {
        console.error('Error fetching benefits data:', e);
        return null;
      }),
      getContactSectionData().catch((e) => {
        console.error('Error fetching contact data:', e);
        return null;
      }),
      getHeroSectionData().catch((e) => {
        console.error('Error fetching hero data:', e);
        return null;
      }),
      getProjectsSectionData().catch((e) => {
        console.error('Error fetching projects data:', e);
        return null;
      }),
      getTechnologiesSectionData().catch((e) => {
        console.error('Error fetching technologies data:', e);
        return null;
      }),
    ]);

    return (
      <main>
        <Hero heroSection={heroData} />
        <Technologies technologiesSection={technologiesData} />
        <Projects projectsSection={projectsData} />
        <Benefits benefitsSection={benefitsData} />
        <Contact contactSection={contactData} />
      </main>
    );
  } catch (error) {
    console.error('Error in Content:', error);
    return (
      <div className="text-red-500 text-center mt-10">
        Error loading content. Please try again.
      </div>
    );
  }
}

export default function HomePage() {
  return (
    <Suspense fallback={<Loading />}>
      <Content />
    </Suspense>
  );
}
