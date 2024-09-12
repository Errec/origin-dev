import AnimatedLink from '@/components/ui/AnimatedLink';
import CTAButton from '@/components/ui/CTAButton';
import { ContactSection } from '@/types/contact-section';
import React from 'react';

interface ContactProps {
  contactSection: ContactSection & { blogPostCount: number };
}

const Contact: React.FC<ContactProps> = ({ contactSection }) => {
  const formattedBlogCount = contactSection.blogPostCount
    .toString()
    .padStart(2, '0');

  return (
    <section className="bg-black text-white min-h-screen flex flex-col justify-between p-24">
      <div className="flex-grow flex flex-col justify-center mb-12">
        <p className="text-sm uppercase tracking-wider mb-2 ml-1.5">
          {contactSection.smallTitle}
        </p>
        <div className="relative">
          <AnimatedLink
            href="/blog"
            className="text-6xl sm:text-7xl md:text-8xl font-light"
          >
            <span className="relative">
              {contactSection.bigTitle}
              <span
                className="absolute -top-2 -right-8 text-xl sm:text-2xl before:content-[attr(data-count)] before:absolute before:top-0 before:right-0"
                data-count={formattedBlogCount}
              />
            </span>
          </AnimatedLink>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
        <div className="col-span-1">
          <p className="text-lg sm:text-xl md:text-2xl mb-6 max-w-md uppercase font-light">
            {contactSection.ctaPhrase}
          </p>
          <div className="transform scale-75 origin-left">
            <CTAButton text="Contact Us" link="#contact" />
          </div>
        </div>

        <div className="col-span-1 grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-bold mb-4">BUSINESS ENQUIRIES</h3>
            <div className="flex flex-col space-y-2">
              <AnimatedLink
                href={`mailto:${contactSection.businessEnquiries?.email}`}
              >
                {contactSection.businessEnquiries?.email || ''}
              </AnimatedLink>
              <AnimatedLink
                href={`tel:${contactSection.businessEnquiries?.phone}`}
              >
                {contactSection.businessEnquiries?.phone || ''}
              </AnimatedLink>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold mb-4">OPEN POSITIONS</h3>
            <AnimatedLink
              href={`mailto:${contactSection.openPositions?.email}`}
            >
              {contactSection.openPositions?.email || ''}
            </AnimatedLink>
          </div>
          {contactSection.locations?.map((location, index) => (
            <div key={index}>
              <h3 className="text-sm font-bold mb-4">{location.city}</h3>
              <address className="not-italic">
                <p>{location.address}</p>
                <p>{location.country}</p>
              </address>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
