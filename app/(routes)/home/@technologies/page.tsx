// home/@technologies/page.tsx
import { getTechnologiesSection } from '@/api/sanity/landingPage/technologies-section';
import Technologies from '../sections/Technologies';

export default async function TechnologiesPage() {
  const technologiesData = await getTechnologiesSection();
  return <Technologies technologiesSection={technologiesData} />;
}
