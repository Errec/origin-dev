export type Asset = {
  _id: string;
  _type: string;
  url: string;
};

export type Image = {
  asset: Asset;
};

export type Project = {
  projectId: string;
  photo: Image;
  subtitle: string;
  description: string;
  techStack: string[];
  link: string;
};

export type ProjectsPage = {
  pageTitle: string;
  pageSubtitle: string;
  projects: Project[];
};
