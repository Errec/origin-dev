'use client';

import { useScrollToSection } from '@/hooks/useScrollToSection';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Image from 'next/image';
import { useRef } from 'react';

gsap.registerPlugin(ScrollToPlugin);

type AboutIntroductionProps = {
  backgroundImage: string;
  pageTitle: string;
  pageSubtitle: string;
  scrollTarget: string;
};

export default function AboutIntroduction({
  backgroundImage,
  pageTitle,
  pageSubtitle,
  scrollTarget,
}: AboutIntroductionProps) {
  const hasScrolled = useRef(false);

  useScrollToSection(scrollTarget, hasScrolled);

  const handleClickScrollToExplore = () => {
    if (scrollTarget) {
      gsap.to(window, {
        duration: 1,
        scrollTo: scrollTarget,
        ease: 'power2.inOut',
      });
    }
  };

  return (
    <section className="relative h-screen w-full">
      <Image src={backgroundImage} alt="Background image" fill quality={100} />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
        <span className="text-amber-400 font-normal text-4xl mb-4">
          {pageTitle.toUpperCase()}
        </span>
        <h1 className="text-5xl md:text-7xl font-light text-center max-w-3xl">
          {pageSubtitle}
        </h1>
        <span
          className="absolute bottom-8 text-sm cursor-pointer"
          onClick={handleClickScrollToExplore}
        >
          SCROLL TO EXPLORE
        </span>
      </div>
    </section>
  );
}
