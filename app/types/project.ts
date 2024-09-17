import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export type ProjectItem = {
  photo: SanityImageSource;
  subtitle: string;
  description: string;
  link: string;
};

export type ProjectPage = {
  pageTitle: string;
  pageSubtitle: string;
  projects: ProjectItem[];
};