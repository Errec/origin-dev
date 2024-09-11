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
