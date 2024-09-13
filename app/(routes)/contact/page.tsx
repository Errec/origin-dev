import ContactForm from '@/components/layout/ContactForm';
import React from 'react';

export default function ContactPage() {
  return (
    <main className="relative bg-black text-white p-4 sm:p-6 md:p-8 rounded-t-lg pt-16 sm:pt-24 md:pt-32 lg:pt-40 -bottom-16 min-h-screen w-full overflow-y-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="flex items-start mb-6 lg:mb-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tighter">
            CONTACT
          </h1>
        </div>
        <ContactForm />
      </div>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mt-12 sm:mt-16 md:mt-24 lg:mt-32">
        <div>
          <h2 className="font-light text-lg sm:text-xl md:text-2xl mb-2">
            WE BELIEVE IN THE POWER OF DIGITAL, AND WE LOVE COLLABORATING WITH
            BRANDS THAT FEEL THE SAME. LET&apos;S CONNECT.
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
    </main>
  );
}
