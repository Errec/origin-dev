import BenefitsPage from './@benefits/page';
import ContactPage from './@contact/page';
import HeroPage from './@hero/page';
import ProjectsPage from './@projects/page';
import TechnologiesPage from './@technologies/page';
import HomeLayout from './layout';

export default function HomePage() {
  return (
    <HomeLayout
      hero={<HeroPage />}
      technologies={<TechnologiesPage />}
      projects={<ProjectsPage />}
      benefits={<BenefitsPage />}
      contact={<ContactPage />}
    />
  );
}
