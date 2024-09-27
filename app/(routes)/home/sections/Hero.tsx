import CTAButton from '@/components/ui/CTAButton';
import { RisingTextAnimation } from '@/components/ui/RisingTextAnimation';
import { HeroSection } from '@/types/hero-section';
import { ArrowRight } from 'lucide-react';
import React, { Suspense } from 'react';

const VideoPlayer = React.lazy(() => import('@/components/ui/VideoPlayer'));

interface HeroProps {
  heroSection: HeroSection | null;
}

const Hero: React.FC<HeroProps> = ({ heroSection }) => {
  if (!heroSection) {
    console.error('Hero section data is missing');
    return (
      <div className="text-red-500 text-center mt-10">
        Error: Hero section data is missing
      </div>
    );
  }

  const videoUrl = heroSection.backgroundVideo?.asset?.url || null;

  return (
    <section className="relative w-full h-screen">
      {videoUrl && (
        <Suspense
          fallback={
            <div className="absolute top-0 left-0 w-full h-full bg-black animate-pulse flex items-center justify-center">
              Loading video...
            </div>
          }
        >
          <VideoPlayer
            src={videoUrl}
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
        </Suspense>
      )}
      <div className="absolute inset-0 flex items-center justify-center z-1 text-white">
        <div className="inline-block -space-y-2">
          <RisingTextAnimation duration={1.5}>
            <h1 className="text-[7vw] md:text-[6vw] lg:text-[5vw] font-light whitespace-nowrap text-center">
              {heroSection.title || 'Welcome'}
            </h1>
          </RisingTextAnimation>
          <div className="space-y-16">
            <RisingTextAnimation duration={1}>
              <p className="text-[3.5vw] md:text-[2.5vw] lg:text-[2vw] whitespace-nowrap ml-4">
                {heroSection.subtitle || 'Subtitle goes here'}
              </p>
            </RisingTextAnimation>
            {heroSection.ctaButton && (
              <div className="ml-4">
                <CTAButton
                  text={heroSection.ctaButton.text}
                  link={'/contact'}
                  icon={<ArrowRight className="h-5 w-5" />}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
