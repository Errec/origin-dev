import { sanityClient } from '@/lib/sanity-client';

export async function getHeroSectionData() {
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
        console.error('Error fetching hero section data:', error);
        throw error;
    }
}
