import { sanityClient } from '@/lib/sanity-client';

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
        return await sanityClient.fetch(query);
    } catch (error) {
        console.error('Error fetching article data:', error);
        throw error;
    }
}