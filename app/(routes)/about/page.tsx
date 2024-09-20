// pages/about.tsx or app/about/page.tsx
import { getAboutPageData } from '@/api/sanity';
import AboutIntroduction from '@/components/layout/AboutIntroduction';
import AboutObjectivesSection from '@/components/layout/AboutObjectivesSection';
import { AboutPage } from '@/types';

export default async function About() {
  const aboutData: AboutPage = await getAboutPageData();

  return (
    <div className="min-h-screen bg-black text-white">
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
    </div>
  );
}
