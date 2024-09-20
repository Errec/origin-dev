import { AboutObjectivesSectionProps, Objective } from '@/types/about';

export default function AboutObjectivesSection({
  id,
  objectives,
}: AboutObjectivesSectionProps) {
  return (
    <section id={id} className="min-h-screen bg-black pt-36 px-8 pb-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-yellow-400">
          Our Objectives
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {objectives.map((objective: Objective, index: number) => (
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
  );
}
