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
    />
  );
}
