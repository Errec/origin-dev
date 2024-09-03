// home/@projects/page.tsx
import { getProjectsSectionData } from "@/api/sanity";
import Projects from "../sections/Projects";

export default async function ProjectsPage() {
    const projectsData = await getProjectsSectionData();
    return <Projects projectsSection={projectsData.projectsSection} />;
}
