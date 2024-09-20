'use client';

import { useScrollToSection } from '@/hooks/useScrollToSection';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

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
  const { currentSection } = useScrollToSection(scrollTarget);
  const [showButton, setShowButton] = useState(false);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    // Scroll to the top when the component is mounted (on initial load)
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.5; // 50% of viewport height
      const shouldShowButton = window.scrollY < scrollThreshold;

      if (isInitialLoad.current) {
        isInitialLoad.current = false;
        setShowButton(shouldShowButton);
      } else {
        setShowButton(shouldShowButton);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Add custom CSS properties for transition
    document.documentElement.style.setProperty(
      '--scroll-transition-duration',
      '400ms'
    );
    document.documentElement.style.setProperty(
      '--scroll-easing-function',
      'cubic-bezier(0.2, 0.8, 0.2, 1)'
    );

    // Add a style tag to the document head
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
        scroll-duration: var(--scroll-transition-duration);
      }
      .scroll-container {
        transition: transform var(--scroll-transition-duration) var(--scroll-easing-function);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleClickScrollToExplore = () => {
    const targetElement = document.querySelector(scrollTarget);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full scroll-container">
      <Image
        src={backgroundImage}
        alt="Background image"
        fill
        className="object-cover object-center w-full h-full"
        quality={100}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
        <span className="text-amber-400 font-normal text-4xl mb-4">
          {pageTitle.toUpperCase()}
        </span>
        <h1 className="text-5xl md:text-7xl font-light text-center max-w-3xl">
          {pageSubtitle}
        </h1>
        {showButton && (
          <button
            className="absolute bottom-20 text-sm cursor-pointer text-white hover:text-amber-400 transition-colors duration-300"
            onClick={handleClickScrollToExplore}
            aria-label="Scroll to explore"
          >
            SCROLL TO FIND OUT
          </button>
        )}
      </div>
    </section>
  );
}
