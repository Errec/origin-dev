import { Asset } from './hero-section';

export interface Technology {
  name: string;
  logo: {
    asset: Asset;
  };
}

export interface TechnologiesSection {
  title: string;
  subtitle: string;
  technologies: Technology[];
}
