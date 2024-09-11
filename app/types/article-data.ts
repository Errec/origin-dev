import { Asset } from './hero-section'; // Adjust the import path if necessary

export type ArticleData = {
  title: string;
  content: any; // Consider using a more specific type for Portable Text content
  titleImage: string | { asset: Asset };
  currentSlug: string;
  releaseDate: string;
};
