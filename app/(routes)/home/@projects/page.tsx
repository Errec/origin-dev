// home/@projects/page.tsx
import { getProjectsSectionData } from '@/api/sanity/landingPage/projects-section';
import Projects from '../sections/Projects';

export default async function ProjectsPage() {
  const projectsData = await getProjectsSectionData();
  return <Projects projectsSection={projectsData} />;
}
