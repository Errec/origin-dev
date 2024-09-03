// home/@technologies/page.tsx
import { getTechnologiesSectionData } from "@/api/sanity";
import Technologies from "../sections/Technologies";

export default async function TechnologiesPage() {
    const technologiesData = await getTechnologiesSectionData();
    return <Technologies technologiesSection={technologiesData.technologiesSection} />;
}
