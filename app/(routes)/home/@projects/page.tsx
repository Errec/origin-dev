// home/@projects/page.tsx
import { getProjectsSection } from '@/api/sanity/landingPage/projects-section';
import Projects from '../sections/Projects';

export default async function ProjectsPage() {
  const projectsData = await getProjectsSection();
  return <Projects projectsSection={projectsData} />;
}
