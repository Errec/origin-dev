import { getAboutPageData } from '@/api/sanity';
import { AboutPage } from '@/types';
import Image from 'next/image';

export default async function About() {
  const aboutData: AboutPage = await getAboutPageData();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* First part: Full-screen background image */}
      <section className="relative h-screen w-full">
        <Image
          src={aboutData.backgroundImage}
          alt="Background image"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <span className="text-yellow-400 text-xl mb-4">
            {aboutData.pageTitle.toUpperCase()}
          </span>
          <h1 className="text-5xl md:text-7xl font-light text-center max-w-4xl">
            {aboutData.pageSubtitle}
          </h1>
          <span className="absolute bottom-8 text-sm">SCROLL TO EXPLORE</span>
        </div>
      </section>

      {/* Second part: Styled objectives section with top padding */}
      <section className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-36 px-8 pb-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-yellow-400">
            Our Objectives
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {aboutData.objectives.map((objective, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold mb-4 text-yellow-400">
                  {objective.title}
                </h3>
                <p className="text-gray-300">{objective.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
