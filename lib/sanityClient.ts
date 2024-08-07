import ImageUrlBuilder from '@sanity/image-url';
import { createClient } from 'next-sanity';

export const sanityClient = createClient({
    apiVersion: '2021-03-25',
    dataset: 'production',
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    useCdn: false,
});

const builder = ImageUrlBuilder(sanityClient);

export function urlFor(source: any) {
    return builder.image(source);
}