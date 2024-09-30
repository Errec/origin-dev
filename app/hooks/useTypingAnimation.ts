import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { useCallback, useEffect, useRef } from 'react';

gsap.registerPlugin(TextPlugin);

interface UseTypingAnimationProps {
  text: string;
  textRef: React.RefObject<HTMLElement>;
  keyboardRef: React.RefObject<HTMLElement>;
  isVisible: boolean;
}

export const useTypingAnimation = ({
  text,
  textRef,
  keyboardRef,
  isVisible,
}: UseTypingAnimationProps) => {
  const animation = useRef<gsap.core.Timeline | null>(null);

  const simulateKeyPress = useCallback(
    (char: string) => {
      if (!keyboardRef.current) return;

      const keySelector =
        char === ' '
          ? 'button[data-key="space"]'
          : `button[data-key="${char.toLowerCase()}"]`;
      const key = keyboardRef.current.querySelector(
        keySelector
      ) as HTMLButtonElement;

      if (key) {
        gsap
          .timeline()
          .to(key, {
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            scale: 0.95,
            duration: 0.15,
            ease: 'power2.inOut',
          })
          .to(key, {
            backgroundColor: 'transparent',
            scale: 1,
            duration: 0.15,
            ease: 'power2.inOut',
          });
      }

      if (char !== ' ' && char === char.toUpperCase()) {
        const shiftKey = keyboardRef.current.querySelector(
          `button[data-key="shift"]`
        ) as HTMLButtonElement;
        if (shiftKey) {
          gsap
            .timeline()
            .to(shiftKey, {
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              scale: 0.95,
              duration: 0.15,
              ease: 'power2.inOut',
            })
            .to(shiftKey, {
              backgroundColor: 'transparent',
              scale: 1,
              duration: 0.15,
              ease: 'power2.inOut',
            });
        }
      }
    },
    [keyboardRef]
  );

  useEffect(() => {
    if (!textRef.current || !isVisible) return;

    const letters = text.split('');
    textRef.current.innerHTML = letters
      .map((letter) => `<span style="color: #4B5563;">${letter}</span>`)
      .join('');

    animation.current = gsap.timeline({ delay: 0.5 }); // 500ms delay

    const typingSpeed = 0.3; // Slightly increased for better visibility of key presses

    letters.forEach((letter, index) => {
      animation.current!.add(() => {
        if (textRef.current && textRef.current.children[index]) {
          gsap.to(textRef.current.children[index], {
            color: '#FFFFFF',
            duration: 0.1,
            ease: 'power2.inOut',
          });
        }
        simulateKeyPress(letter);
      }, index * typingSpeed);
    });

    return () => {
      if (animation.current) {
        animation.current.kill();
      }
    };
  }, [text, textRef, isVisible, simulateKeyPress]);

  return { isAnimating: !!animation.current };
};
