import InfiniteCarousel from '@/components/ui/InfiniteCarousel';
import { urlFor } from '@/lib/sanity-client';
import { TechnologiesSection } from '@/types/technologies-section';
import React from 'react';

interface TechnologiesProps {
  technologiesSection: TechnologiesSection;
}

const Technologies: React.FC<TechnologiesProps> = ({ technologiesSection }) => {
  const technologies = technologiesSection.technologies.map((tech) => ({
    ...tech,
    logoUrl: tech.logo ? urlFor(tech.logo).url() : null,
  }));

  return (
    <section className="pt-32 pb-64 bg-black">
      <h2 className="text-[3.5vw] md:text-[2.5vw] lg:text-[1.5vw] text-center mb-28 text-amber-400 font-medium">
        {technologiesSection.title.toLocaleUpperCase()}
      </h2>
      <InfiniteCarousel data={technologies} duration={30} />
    </section>
  );
};

export default Technologies;
