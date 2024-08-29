import { sanityClient } from '@/lib/sanity-client';

export async function getProjectsSectionData() {
    try {
        const query = `
            *[_type == "landingPage"][0] {
                projectsSection {
                    title,
                    projects[] {
                        title,
                        subtitle,
                        image {
                            asset-> {
                                url
                            }
                        },
                        hoverVideo {
                            asset-> {
                                url
                            }
                        }
                    }
                }
            }
        `;
        return await sanityClient.fetch(query);
    } catch (error) {
        console.error('Error fetching projects section data:', error);
        throw error;
    }
}
