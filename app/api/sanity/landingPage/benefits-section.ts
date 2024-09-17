import { sanityClient } from '@/lib/sanity-client';

export async function getBenefitsSectionData() {
  try {
    const query = `
      *[_type == "landingPage"][0] {
        benefitsSection {
          title,
          benefits[] {
            text,
            icon
          }
        }
      }
    `;
    const result = await sanityClient.fetch(query);
    return result.benefitsSection;
  } catch (error) {
    console.error('Error fetching benefits section data:', error);
    throw error;
  }
}
