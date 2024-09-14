import ContactForm from '@/components/layout/ContactForm';
import React from 'react';

export default function ContactPage() {
  return (
    <div className="bg-black text-white p-4 sm:p-6 md:p-8 lg:p-3.5 pt-24 sm:pt-24 md:pt-32 lg:pt-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
        <div className="flex items-start mb-6 lg:mb-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tighter">
            CONTACT
          </h1>
        </div>
        <ContactForm />
      </div>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mt-20 sm:mt-32 md:mt-44 lg:mt-60">
        <div>
          <h2 className="font-light text-lg sm:text-xl md:text-2xl mb-2 w-7/12">
            WE’RE EXCITED TO HELP YOUR BRAND GROW THROUGH DIGITAL INNOVATION,
            STRATEGIC SOLUTIONS, AND CREATIVE THINKING. REACH OUT.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-4 sm:mb-0">
            <h3 className="font-semibold text-sm sm:text-base md:text-lg">
              BUSINESS ENQUIRIES
            </h3>
            <p className="text-xs sm:text-sm md:text-base">HELLO@EXAMPLE.COM</p>
            <p className="text-xs sm:text-sm md:text-base">+1 234 567 8900</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm sm:text-base md:text-lg">
              OPEN POSITIONS
            </h3>
            <p className="text-xs sm:text-sm md:text-base">
              CAREERS@EXAMPLE.COM
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
