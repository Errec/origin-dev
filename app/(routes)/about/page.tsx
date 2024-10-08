// pages/about.tsx or app/about/page.tsx
import { getAboutPageData } from '@/api/sanity';
import AboutIntroduction from '@/components/layout/AboutIntroduction';
import AboutObjectivesSection from '@/components/layout/AboutObjectivesSection';
import { AboutPage } from '@/types';

export const revalidate = 30; // Revalidate every 30 seconds

export default async function About() {
  const aboutData: AboutPage = await getAboutPageData();

  return (
    <main className="min-h-screen bg-black text-white relative overflow-auto">
      {/* First part: Full-screen background image */}
      <AboutIntroduction
        backgroundImage={aboutData.backgroundImage}
        pageTitle={aboutData.pageTitle}
        pageSubtitle={aboutData.pageSubtitle}
        scrollTarget="#about-objectives-section"
      />

      {/* Second part: Styled objectives section with top padding */}
      <AboutObjectivesSection
        id="about-objectives-section"
        objectives={aboutData.objectives}
      />
    </main>
  );
}
