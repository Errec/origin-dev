import { sanityClient } from '../../sanity/lib/sanityClient';

export async function getMainPageData() {
    try {
        const query = `
            *[_type == "landingPage"] {
                title,
                "heroBackgroundImage": heroSection.backgroundImage.asset->url,
                "aboutSectionTitle": aboutSection.heading,
                "aboutSectionDescription": aboutSection.body,
                "projects": projectsSection[]{
                    "projectTitle": title,
                    "projectPreviewImage": previewImage.asset->url
                },
                "technologyLogos": technologiesSection.logos[].asset->url
            }[0]
        `;
        const response = await sanityClient.fetch(query);
        return response;
    } catch (error) {
        console.error('Error fetching main page data:', error);
        throw error;
    }
}
