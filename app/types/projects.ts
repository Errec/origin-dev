export type Asset = {
  _id: string;
  _type: string;
  url: string;
};

export type Image = {
  asset: Asset;
};

export type Project = {
  photo: Image;
  subtitle: string;
  description: string;
  link: string;
};

export type ProjectsPage = {
  pageTitle: string;
  pageSubtitle: string;
  projects: Project[];
};
