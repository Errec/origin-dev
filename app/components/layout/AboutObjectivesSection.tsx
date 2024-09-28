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
    <section>
      <div
        id={id}
        className="bg-black flex flex-col md:flex-row h-[80vh] relative"
      >
        {/* Left column: List of objective titles */}
        <div className="md:w-1/4 py-0 px-8 md:py-8 relative">
          <ul className="space-y-1 md:space-y-6">
            {objectives.map((objective: Objective, index: number) => (
              <li
                key={index}
                className="cursor-pointer h-12 flex items-center"
                onClick={() => setSelectedObjective(index)}
              >
                <span
                  className={`transition-all duration-500 ease-in-out ${
                    selectedObjective === index
                      ? 'text-3xl md:text-4xl font-semibold text-amber-400 opacity-100 scale-100 origin-left'
                      : 'text-xl md:text-2xl text-amber-400 hover:text-amber-300 opacity-70 scale-75 origin-left'
                  }`}
                >
                  {objective.title}
                </span>
              </li>
            ))}
          </ul>
          <div className="absolute right-6 hidden md:block md:left-4 bottom-6">
            <Button
              variant="outline"
              size="sm"
              ariaLabel="Contact us"
              className="border-white text-white hover:bg-amber-400 hover:text-black 
                transition-all duration-300 ease-in-out rounded-full z-50 px-6 text-sm"
              onClick={() => {
                window.location.href = '/contact';
              }}
            >
              Contact Us
            </Button>
          </div>
        </div>

        {/* Right column: Selected objective content */}
        <div className="md:w-3/4 p-8 relative overflow-scroll">
          <h2
            className="text-white text-lg sm:text-xl md:text-4xl lg:text-5xl 
            font-light leading-tight"
          >
            {objectives[selectedObjective].text}
          </h2>
          <Keyboard />
        </div>
      </div>
    </section>
  );
}
