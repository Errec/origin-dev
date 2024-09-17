import {
  ChatBubbleIcon,
  ClipboardIcon,
  ClockIcon,
  PersonIcon,
  PlayIcon,
  VideoIcon,
} from '@radix-ui/react-icons';

export default function Component() {
  const features = [
    { Icon: PlayIcon, title: '300+ video lessons, 5 courses' },
    { Icon: ClockIcon, title: '24/7 access to content' },
    { Icon: VideoIcon, title: 'Live monthly calls' },
    { Icon: PersonIcon, title: 'Interactive community' },
    { Icon: ClipboardIcon, title: 'Assignments, Certifications' },
    { Icon: ChatBubbleIcon, title: 'Personal coaching / Advanced feedback' },
  ];

  return (
    <section className="bg-black text-white p-8">
      <h2 className="text-4xl font-bold text-center mb-12">
        What expect from our projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px]">
        {features.map(({ Icon, title }, index) => (
          <div
            key={index}
            className="bg-black p-6 flex flex-col items-center relative"
          >
            <div className="w-12 h-12 bg-amber-400 rounded-lg flex items-center justify-center mb-4">
              <Icon className="w-6 h-6 text-black" />
            </div>
            <p className="text-center text-white">{title}</p>
            {index % 3 !== 2 && (
              <div className="absolute top-6 right-0 w-[1px] h-[calc(100%-48px)] bg-white" />
            )}
            {index < 3 && (
              <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-white" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
