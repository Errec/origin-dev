import AnimatedUnderline from '@/components/ui/AnimatedUnderline';
import CTAButton from '@/components/ui/CTAButton';
import { ContactSection } from '@/types/contact-section';
import Link from 'next/link';
import React from 'react';

interface ContactProps {
  contactSection: (ContactSection & { blogPostCount: number }) | null;
}

const Contact: React.FC<ContactProps> = ({ contactSection }) => {
  if (!contactSection) {
    console.error('Contact section data is missing');
    return null;
  }

  const formattedBlogCount = contactSection.blogPostCount
    .toString()
    .padStart(2, '0');

  return (
    <section
      className="bg-black text-white min-h-screen flex flex-col justify-between p-8 md:p-24"
      aria-label="Contact Section"
    >
      <div className="flex-grow flex flex-col justify-center mb-12">
        <p className="text-sm uppercase tracking-wider mb-2 ml-1.5">
          {contactSection.smallTitle}
        </p>
        <div className="relative">
          <Link href="/blog" aria-label="Go to Blog">
            <AnimatedUnderline className="text-6xl sm:text-7xl md:text-8xl font-light">
              <span className="relative">
                <h1>{contactSection.bigTitle}</h1>
                <span
                  className="absolute -top-2 -right-8 text-xl sm:text-2xl"
                  aria-label={`Blog post count: ${formattedBlogCount}`}
                >
                  {formattedBlogCount}
                </span>
              </span>
            </AnimatedUnderline>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
        <div className="col-span-1">
          <p className="text-lg sm:text-xl md:text-2xl mb-6 max-w-md uppercase font-light">
            {contactSection.ctaPhrase}
          </p>
          <div className="transform scale-100 md:scale-75 origin-left">
            <CTAButton
              text="Contact Us"
              link="/contact"
              aria-label="Contact us"
              className="px-4 h-8"
            />
          </div>
        </div>

        <div className="col-span-1 grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-sm font-bold mb-4">BUSINESS ENQUIRIES</h2>
            <div className="flex flex-col space-y-2">
              <Link
                href={`mailto:${contactSection.businessEnquiries?.email ?? ''}`}
              >
                <AnimatedUnderline aria-label="Business enquiry email">
                  {contactSection.businessEnquiries?.email ?? 'N/A'}
                </AnimatedUnderline>
              </Link>
              <Link
                href={`tel:${contactSection.businessEnquiries?.phone ?? ''}`}
              >
                <AnimatedUnderline aria-label="Business enquiry phone">
                  {contactSection.businessEnquiries?.phone ?? 'N/A'}
                </AnimatedUnderline>
              </Link>
            </div>
          </div>
          <div>
            <h2 className="text-sm font-bold mb-4">OPEN POSITIONS</h2>
            <Link href={`mailto:${contactSection.openPositions?.email ?? ''}`}>
              <AnimatedUnderline aria-label="Open positions email">
                {contactSection.openPositions?.email ?? 'N/A'}
              </AnimatedUnderline>
            </Link>
          </div>
          {contactSection.locations?.map((location, index) => (
            <div key={index}>
              <h2 className="text-sm font-bold mb-4">{location.city}</h2>
              <address className="not-italic">
                <p>{location.address ?? 'N/A'}</p>
                <p>{location.country ?? 'N/A'}</p>
              </address>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
