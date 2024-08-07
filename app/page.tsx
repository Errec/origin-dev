import Image from "next/image";
import { getMainPageData } from "../app/services/getMainPageData";

export const revalidate = 30; // Revalidate every 30 seconds

export default async function Main() {
  const mainPageData = await getMainPageData();

  return (
    <main className="relative w-full h-screen z-0">
      {mainPageData.heroBackgroundImage && (
        <Image
          src={mainPageData.heroBackgroundImage}
          alt="Hero Background"
          fill
          style={{ objectFit: 'cover' }}
          className="z-0"
          priority
        />
      )}
    </main>
  );
}
