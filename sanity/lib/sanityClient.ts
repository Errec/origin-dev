import { createClient } from 'next-sanity';

export const sanityClient = createClient({
    apiVersion: '2021-03-25',
    dataset: process.env.NEXT_PUBLIC_DATASET || 'production',
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    useCdn: false,
});