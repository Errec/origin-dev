import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export type Project = {
  photo: SanityImageSource;
  subtitle: string;
  description: string;
  link: string;
};

export type ProjectItem = {
  sectionTitle: string;
  sectionSubtitle: string;
  projects: Project[];
};
