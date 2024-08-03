import { sanityClient } from '../../sanity/lib/sanityClient';

export async function getBlogData() {
    try {
        const query = `
            *[_type == 'blog'] {
                title, 
                'currentSlug': slug.current,
                titleImage,
                description
            }
        `;
        const response = await sanityClient.fetch(query);
        return response;
    } catch (error) {
        console.error('Error fetching blog data:', error);
        throw error;
    }
}