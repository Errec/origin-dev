// home/@technologies/page.tsx
import { getTechnologiesSectionData } from '@/api/sanity/landingPage/technologies-section';
import Technologies from '../sections/Technologies';

export default async function TechnologiesPage() {
  const technologiesData = await getTechnologiesSectionData();
  return <Technologies technologiesSection={technologiesData} />;
}
