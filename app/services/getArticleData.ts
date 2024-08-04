import { sanityClient } from '../../sanity/lib/sanityClient';

export async function getArticleData(slug: string) {
    try {
        const query = `
            *[_type == "blog" && slug.current == '${slug}'] {
            "currentSlut": slug.current,
                title,
                content,
                titleImage,
                releaseDate
            }[0]
        `;
        const response = await sanityClient.fetch(query);
        return response;
    } catch (error) {
        console.error('Error fetching article data:', error);
        throw error;
    }
}