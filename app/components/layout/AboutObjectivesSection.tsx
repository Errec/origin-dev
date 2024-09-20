import { AboutObjectivesSectionProps, Objective } from '@/types/about';

export default function AboutObjectivesSection({
  id,
  objectives,
}: AboutObjectivesSectionProps) {
  return (
    <section id={id} className="bg-black pt-56 px-8 pb-8 relative">
      <div className="max-w-6xl mx-auto relative -top-40">
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
