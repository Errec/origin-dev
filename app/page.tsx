import { getMainPageData } from "@/app/services/getMainPageData";
import Image from "next/image";

export default async function Main() {
  const mainPageData = await getMainPageData();

  return (
    <main className="relative w-full h-screen z-0">
      {mainPageData.heroBackgroundImage && (
        <Image
          src={mainPageData.heroBackgroundImage}
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          className="z-0"
          priority
        />
      )}
    </main>
  );
}
