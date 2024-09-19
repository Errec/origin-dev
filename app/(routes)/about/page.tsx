import Image from 'next/image';

export default function About() {
  return (
    <main className="relative h-screen w-full bg-black text-white">
      <Image
        src=""
        alt="Person working on computer"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50">
        <div className="flex flex-col justify-center items-center h-full space-y-4">
          <span className="text-yellow-400 text-xl">ABOUT US</span>
          <h1 className="text-5xl md:text-7xl font-light text-center max-w-4xl">
            Why we created <br /> OriginDev
          </h1>
          <span className="absolute bottom-8 text-sm">SCROLL TO EXPLORE</span>
        </div>
      </div>
    </main>
  );
}
