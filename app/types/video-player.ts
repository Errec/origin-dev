export type { VideoPlayerProps } from '@/components/ui/VideoPlayer';

export type HeroSection = {
  title: string;
  subtitle: string;
  ctaButton?: {
    text: string;
    link: string;
  };
  backgroundVideo?: {
    asset: {
      url: string;
    };
  };
};

export type Project = {
  title: string;
  subtitle: string;
  image: {
    asset: {
      url: string;
    };
  };
  hoverVideo?: {
    asset: {
      url: string;
    };
  };
};

export type ProjectsSection = {
  title: string;
  subtitle: string;
  projects: Project[];
};
