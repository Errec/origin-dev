export type Asset = {
  _id: string;
  _type: string;
  url: string;
  // Add other properties as needed
};

export type Image = {
  asset: Asset;
};

export type Video = {
  asset: Asset;
};

export type Project = {
  title: string;
  subtitle: string;
  image: Image;
  hoverVideo?: Video;
};

export type ProjectsSection = {
  title: string;
  subtitle: string;
  projects: Project[];
};
