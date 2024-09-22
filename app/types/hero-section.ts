export interface HeroSection {
  _id?: string;
  _ref?: string;
  url?: string;
  title?: string;
  subtitle?: string;
  backgroundImage?: {
    asset: {
      _ref: string;
    };
  };
  backgroundVideo?: {
    asset?: {
      _ref: string;
      url?: string;
    } | null;
  } | null;
  ctaButton?: {
    text: string;
    link: string;
  };
}
