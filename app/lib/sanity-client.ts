import imageUrlBuilder from '@sanity/image-url';
import { createClient } from 'next-sanity';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}
