import ImageUrlBuilder from '@sanity/image-url';
import { createClient } from 'next-sanity';

export const sanityClient = createClient({
    apiVersion: '2021-03-25',
    dataset: process.env.NEXT_PUBLIC_DATASET || 'production',
    projectId: 'f93vz2nu',
    useCdn: false,
});

const builder = ImageUrlBuilder(sanityClient);

export function urlFor(source: any) {
    return builder.image(source);
}