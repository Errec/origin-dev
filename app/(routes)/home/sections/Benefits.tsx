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

  const DashedSeparator = () => (
    <div className="w-4/5 mx-auto flex justify-between items-center md:hidden mt-8">
      {[...Array(10)].map((_, index) => (
        <React.Fragment key={index}>
          <div className="w-8 h-[2px] bg-white" />
          {index < 9 && <div className="flex-grow" />}
        </React.Fragment>
      ))}
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
          return (
            <div
              key={index}
              className="py-16 px-12 flex flex-col items-center relative"
            >
              <Icon className="w-16 h-16 text-amber-400 mb-8" />
              <p className="text-lg text-center font-light mb-8">{text}</p>
              {index % 3 !== 2 && (
                <div className="absolute top-8 right-0 w-[1px] h-[calc(100%-64px)] bg-white hidden md:block" />
              )}
              {index < 3 && (
                <div className="absolute bottom-0 left-12 right-12 h-[1px] bg-white hidden md:block" />
              )}
              {index < benefitsSection.benefits.length - 1 && (
                <div className="absolute bottom-0 left-[10%] right-[10%] h-[1px] bg-white md:hidden" />
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
