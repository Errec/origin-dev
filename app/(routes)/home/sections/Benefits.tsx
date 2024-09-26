import { BenefitsSection } from '@/types/benefits-section';
import * as RadixIcons from '@radix-ui/react-icons';
import React from 'react';

interface BenefitsProps {
  benefitsSection: BenefitsSection | null;
}

const Benefits: React.FC<BenefitsProps> = ({ benefitsSection }) => {
  if (!benefitsSection) {
    console.error('Benefits section data is missing');
    return null;
  }

  const getIconComponent = (iconName: string) => {
    const IconComponent = (RadixIcons as any)[iconName];
    if (!IconComponent) {
      console.warn(`Icon not found: ${iconName}`);
      return RadixIcons.QuestionMarkCircledIcon;
    }
    return IconComponent;
  };

  // Updated DashedSeparator component
  const DashedSeparator = () => (
    <div className="w-full mx-auto flex justify-center items-center md:hidden mt-8">
      <div className="w-4/5 h-px bg-white" />
    </div>
  );

  return (
    <section className="bg-black text-white pt-24">
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-center mb-16">
        {benefitsSection.title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {benefitsSection.benefits.map(({ text, icon }, index) => {
          const Icon = getIconComponent(icon);
          const isLastColumn = (index + 1) % 3 === 0;
          const isLastItem = index === benefitsSection.benefits.length - 1;

          return (
            <div
              key={index}
              className="py-16 px-12 flex flex-col items-center relative"
            >
              <Icon className="w-16 h-16 text-amber-400 mb-8" />
              <p className="text-lg text-center font-light mb-8">{text}</p>

              {/* Vertical Divider (for md and above) */}
              {!isLastColumn && (
                <div className="absolute top-8 right-0 w-px h-[calc(100%-64px)] bg-white hidden md:block" />
              )}

              {/* Horizontal Divider (for md and above) */}
              {index < benefitsSection.benefits.length - 3 && (
                <div className="absolute bottom-0 left-12 right-12 h-px bg-white hidden md:block" />
              )}

              {/* Horizontal Divider for small screens (updated) */}
              {!isLastItem && (
                <div className="absolute bottom-0 left-[10%] right-[10%] h-px bg-white md:hidden" />
              )}
            </div>
          );
        })}
      </div>
      <DashedSeparator />
    </section>
  );
};

export default Benefits;
