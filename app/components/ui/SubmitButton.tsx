'use client';

import React, { useEffect, useRef, useState } from 'react';

interface SubmitButtonProps {
  coverText: string;
  buttonText: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  coverText,
  buttonText,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const fakeButtonRef = useRef<HTMLDivElement>(null);
  const fakeTextRef = useRef<HTMLSpanElement>(null);
  const circleContainerRef = useRef<HTMLDivElement>(null);
  const middleLayerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let gsap: any;

    const initAnimation = async () => {
      const gsapModule = await import('gsap');
      gsap = gsapModule.gsap;

      if (
        buttonRef.current &&
        fakeButtonRef.current &&
        middleLayerRef.current &&
        circleContainerRef.current &&
        fakeTextRef.current
      ) {
        const tl = gsap.timeline({ paused: true });

        tl.to(fakeTextRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        })
          .to(
            fakeButtonRef.current,
            {
              width: 0,
              duration: 0.6,
              ease: 'power3.inOut',
            },
            '-=0.4'
          )
          .to(
            circleContainerRef.current,
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
            },
            '-=0.5'
          )
          .to(
            middleLayerRef.current,
            {
              width: 0,
              duration: 0.8,
              ease: 'power4.out',
            },
            '-=0.5'
          );

        const handleMouseEnter = () => {
          setIsHovered(true);
          tl.timeScale(1).play();
        };

        const handleMouseLeave = () => {
          setIsHovered(false);
          tl.timeScale(1.2).reverse();
        };

        buttonRef.current.addEventListener('mouseenter', handleMouseEnter);
        buttonRef.current.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          buttonRef.current?.removeEventListener(
            'mouseenter',
            handleMouseEnter
          );
          buttonRef.current?.removeEventListener(
            'mouseleave',
            handleMouseLeave
          );
        };
      }
    };

    initAnimation();
  }, [coverText, buttonText]);

  return (
    <button
      ref={buttonRef}
      type="submit"
      className="relative overflow-hidden rounded-full text-black font-bold bg-amber-400 transition-all duration-300 flex items-center px-0 h-8"
    >
      <span className="block px-4 text-sm" style={{ paddingLeft: '34px' }}>
        {coverText}
      </span>
      <div
        ref={middleLayerRef}
        className="absolute top-0 left-0 h-full bg-white flex items-center"
        style={{ width: '100%', pointerEvents: 'none' }}
      />
      <div
        ref={fakeButtonRef}
        className="absolute top-0 right-0 h-full bg-white text-black flex items-center justify-center"
        style={{ width: '100%', pointerEvents: 'none' }}
      >
        <span ref={fakeTextRef} className="block px-4 text-sm">
          {buttonText}
        </span>
      </div>
      <div
        ref={circleContainerRef}
        className="absolute left-1.5 top-1.5 bottom-1.5 aspect-square bg-amber-400 rounded-full flex items-center justify-center"
        style={{ scale: 0, opacity: 0, pointerEvents: 'none' }}
      >
        <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
      </div>
    </button>
  );
};

export default SubmitButton;
