import { sanityClient } from '@/lib/sanity-client';

export async function getHeroSectionData() {
  try {
    const query = `
      *[_type == "landingPage"][0] {
        heroSection {
          title,
          subtitle,
          backgroundImage {
            asset->
          },
          backgroundVideo {
            asset->
          }
        }
      }
    `;
    const result = await sanityClient.fetch(query);
    return result.heroSection;
  } catch (error) {
    console.error('Error fetching hero section data:', error);
    throw error;
  }
}
