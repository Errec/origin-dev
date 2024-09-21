export interface Technology {
  name: string;
  logo: {
    asset: {
      _id?: string;
      _ref?: string;
      url?: string;
    };
  };
}
export interface TechnologiesSection {
  title: string;
  subtitle: string;
  technologies: Technology[];
}
