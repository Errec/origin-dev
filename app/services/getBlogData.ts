import { sanityClient } from '../../sanity/lib/sanityClient';

export async function getBlogData() {
    try {
        const query = `
            *[_type == 'blog'] | order(releaseDate desc){
                title, 
                'currentSlug': slug.current
            }
        `;
        const response = await sanityClient.fetch(query);
        return response;
    } catch (error) {
        console.error('Error fetching blog data:', error);
        throw error;
    }
}