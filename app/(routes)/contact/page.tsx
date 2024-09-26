import { getContactPageData } from '@/api/sanity/contact/contact';
import { getContactSectionData } from '@/api/sanity/landingPage/contact-section';
import ContactForm from '@/components/layout/ContactForm';
import AnimatedUnderline from '@/components/ui/AnimatedUnderline';
import { RisingTextAnimation } from '@/components/ui/RisingTextAnimation'; // Import RisingTextAnimation
import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge'; // Import twMerge if not already imported

export const revalidate = 30; // Revalidate every 30 seconds

export default async function ContactPage() {
  const contactPageData = await getContactPageData();
  const contactSectionData = await getContactSectionData();

  return (
    <main className="bg-black text-white p-4 sm:p-6 md:p-8 lg:p-3.5 pt-24 sm:pt-24 md:pt-32 lg:pt-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-6 md:gap-12">
        <div className="flex items-start mb-2 sm:mb-6 lg:mb-0">
          <RisingTextAnimation>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tighter">
              {contactPageData.title}
            </h1>
          </RisingTextAnimation>
        </div>
        <div className="mb-2 sm:mb-0">
          <ContactForm
            formFields={contactPageData.formFields}
            submitButtonText={contactPageData.submitButtonText}
          />
        </div>
      </div>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mt-20 sm:mt-16 md:mt-20 lg:mt-30">
        <div>
          <h2 className="font-light text-lg sm:text-xl md:text-2xl mb-2 w-full sm:w-7/12">
            {contactPageData.subtitle}
          </h2>
        </div>
        <div
          className={twMerge(
            'flex justify-between items-start',
            'sm:grid sm:grid-cols-2 sm:gap-4'
          )}
        >
          <div className="mb-4 sm:mb-0">
            <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-2">
              BUSINESS ENQUIRIES
            </h3>
            <div className="flex flex-col space-y-2">
              <Link
                href={`mailto:${contactSectionData.businessEnquiries?.email ?? ''}`}
              >
                <AnimatedUnderline>
                  <p className="text-xs sm:text-sm md:text-base">
                    {contactSectionData.businessEnquiries?.email}
                  </p>
                </AnimatedUnderline>
              </Link>
              <Link
                href={`tel:${contactSectionData.businessEnquiries?.phone ?? ''}`}
              >
                <AnimatedUnderline>
                  <p className="text-xs sm:text-sm md:text-base">
                    {contactSectionData.businessEnquiries?.phone}
                  </p>
                </AnimatedUnderline>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-2">
              OPEN POSITIONS
            </h3>
            <Link
              href={`mailto:${contactSectionData.openPositions?.email ?? ''}`}
            >
              <AnimatedUnderline>
                <p className="text-xs sm:text-sm md:text-base">
                  {contactSectionData.openPositions?.email}
                </p>
              </AnimatedUnderline>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
