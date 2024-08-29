import CTAButton from "@/components/ui/CTAButton";
import { HeroSection } from "@/types";
// TODO: implement lazy loading for the video - splash screen
type HeroProps = {
    heroSection: HeroSection;
}

export default function Hero({ heroSection }: HeroProps) {
    return (
        <div className="relative w-full h-screen">
            {heroSection?.backgroundVideo && (
                <video
                    src={heroSection.backgroundVideo.asset.url}
                    autoPlay
                    muted
                    playsInline
                    loop
                    preload="auto"
                    aria-hidden="true"
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                />
            )}
        <div className="absolute inset-0 flex items-center justify-center z-1 text-white">
        <div className="inline-block -space-y-2">
            <h1 className="text-[7vw] md:text-[6vw] lg:text-[5vw] font-light whitespace-nowrap text-center">
            {heroSection?.title}
            </h1>
            <div className="space-y-16">
            <p className="text-[3.5vw] md:text-[2.5vw] lg:text-[2vw] whitespace-nowrap ml-4">
                {heroSection?.subtitle}
            </p>
            {heroSection?.ctaButton && (
                <div className="ml-4">
                <CTAButton 
                    text={heroSection.ctaButton.text} 
                    link={heroSection.ctaButton.link} 
                />
                </div>
            )}
            </div>
        </div>
        </div>
    </div>
    );
}