import { sanityClient } from '@/lib/sanity-client';
import { AboutPage } from '@/types'; // Assuming you've saved the type in a separate file

export async function getAboutPageData(): Promise<AboutPage> {
  try {
    const query = `
      *[_type == 'about'][0] {
        pageTitle,
        pageSubtitle,
        "backgroundImage": backgroundImage.asset->url,
        objectives[] {
          title,
          text
        }
      }
    `;
    const response = await sanityClient.fetch(query);
    return response;
  } catch (error) {
    console.error('Error fetching about page data:', error);
    throw error;
  }
}