import { BenefitsSection } from '@/types/benefits-section';
import * as RadixIcons from '@radix-ui/react-icons';
import React from 'react';

interface BenefitsProps {
  benefitsSection: BenefitsSection;
}

const Benefits: React.FC<BenefitsProps> = ({ benefitsSection }) => {
  const getIconComponent = (iconName: string) => {
    const IconComponent = (RadixIcons as any)[iconName];
    if (!IconComponent) {
      console.warn(`Icon not found: ${iconName}`);
      return RadixIcons.QuestionMarkCircledIcon;
    }
    return IconComponent;
  };

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
                <div className="absolute top-8 right-0 w-[1px] h-[calc(100%-64px)] bg-white" />
              )}
              {index < 3 && (
                <div className="absolute bottom-0 left-12 right-12 h-[1px] bg-white" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Benefits;
