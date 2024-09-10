export type HeroSection = {
  title: string;
  subtitle: string;
  backgroundVideo?: {
    asset: {
      url: string;
    };
  };
  ctaButton?: {
    text: string;
    link: string;
  };
};

export type Technology = {
  name: string;
  logo: {
    asset: {
      url: string;
    };
  };
};

export type TechnologiesSection = {
  title: string;
  technologies: Technology[];
};
