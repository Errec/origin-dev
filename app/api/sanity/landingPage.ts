import { sanityClient } from '@/lib/sanityClient';

export async function getLandingPageData() {
    try {
        const query = `
            *[_type == "landingPage"][0] {
                heroSection {
                    backgroundVideo {
                        asset-> {
                            url
                        }
                    },
                    title,
                    subtitle,
                    ctaButton {
                        text,
                        link
                    }
                }
            }
        `;
        return await sanityClient.fetch(query);
    } catch (error) {
        console.error('Error fetching landing page data:', error);
        throw error;
    }
}