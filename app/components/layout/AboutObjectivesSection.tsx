'use client';

import { Button } from '@/components/ui/Button';
import Keyboard from '@/components/ui/Keyboard';
import { AboutObjectivesSectionProps, Objective } from '@/types/about';
import React, { useState } from 'react';

export default function AboutObjectivesSection({
  id,
  objectives,
}: AboutObjectivesSectionProps) {
  const [selectedObjective, setSelectedObjective] = useState<number>(0);

  return (
    <section
      id={id}
      className="bg-black flex flex-col md:flex-row min-h-[80vh] relative top-12 md:top-0"
    >
      {/* Left column: List of objective titles */}
      <div className="md:w-1/4 py-4 px-4 md:py-8 md:px-8 top-12 mb-6 relative">
        <ul className="space-y-1 md:space-y-6">
          {objectives.map((objective: Objective, index: number) => (
            <li
              key={index}
              className="cursor-pointer h-10 md:h-12 flex items-center overflow-hidden"
              onClick={() => setSelectedObjective(index)}
            >
              <span
                className={`transition-all duration-500 ease-in-out block w-full ${
                  selectedObjective === index
                    ? 'text-2xl md:text-3xl lg:text-4xl font-semibold text-amber-400 opacity-100 translate-y-0'
                    : 'text-lg md:text-xl lg:text-2xl text-amber-400 hover:text-amber-300 opacity-70 translate-y-1'
                }`}
              >
                {objective.title}
              </span>
            </li>
          ))}
        </ul>
        <div className="absolute right-4 md:left-8 bottom-4 md:bottom-8">
          <Button
            variant="outline"
            size="sm"
            ariaLabel="Contact us"
            className="border-white text-white hover:bg-amber-400 hover:text-black 
                transition-all duration-300 ease-in-out rounded-full z-50 px-4 md:px-6 text-xs md:text-sm"
            onClick={() => {
              window.location.href = '/contact';
            }}
          >
            Contact Us
          </Button>
        </div>
      </div>

      {/* Right column: Selected objective content */}
      <div className="md:w-3/4 p-4 md:p-8 relative flex flex-col h-[38rem]">
        <div className="flex-grow overflow-auto">
          <h2
            className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl 
              font-light leading-tight mb-4 md:mb-8"
          >
            {objectives[selectedObjective].text}
          </h2>
        </div>
        <div className="flex justify-center items-center w-full">
          <Keyboard
            className="top-0 md:top-32 relative transform scale-50 sm:scale-95 md:scale-100 lg:scale-125"
            style={{
              maxWidth: '100%',
              width: 'auto',
              height: 'auto',
            }}
          />
        </div>
      </div>
    </section>
  );
}
