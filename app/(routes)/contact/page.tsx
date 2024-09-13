import ContactForm from '@/components/layout/ContactForm';
import React from 'react';

export default function ContactPage() {
  return (
    <main className="relative bg-black text-white p-8 rounded-t-l overflow-hidden pt-56 bottom-16 h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex items-start">
          <h1 className="text-8xl font-light tracking-tighter">CONTACT</h1>
        </div>
        <ContactForm />
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-64">
        <div>
          <h2 className="font-light text-xl mb-2">TODO</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">BUSINESS ENQUIRIES</h3>
            <p>TODO</p>
            <p>TODO</p>
          </div>
          <div>
            <h3 className="font-semibold">OPEN POSITIONS</h3>
            <p>TODO</p>
          </div>
        </div>
      </section>
    </main>
  );
}
