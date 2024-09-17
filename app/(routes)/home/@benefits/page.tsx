import { getBenefitsSectionData } from '@/api/sanity/landingPage/benefits-section';
import Benefits from '../sections/Benefits';

export default async function BenefitsPage() {
  const benefitsData = await getBenefitsSectionData();
  return <Benefits benefitsSection={benefitsData} />;
}
