import { getLandingPageData } from "@/api/sanityApi";

export const revalidate = 30; // Revalidate every 30 seconds

export default async function LandingPage() {
  const landingPageData = await getLandingPageData();

  return (
    <main className="relative w-full h-screen z-0">
      {landingPageData.heroSection?.backgroundVideo && (
        <video
          src={landingPageData.heroSection.backgroundVideo.asset.url}
          autoPlay
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-white">
        <h1 className="text-4xl font-bold mb-4">{landingPageData.heroSection?.title}</h1>
        <p className="text-xl">{landingPageData.heroSection?.subtitle}</p>
      </div>
    </main>
  );
}