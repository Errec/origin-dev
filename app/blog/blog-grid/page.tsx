import { getBlogData } from "@/app/services/getBlogData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { blogCard } from "@/lib/types";
import { urlFor } from "@/sanity/lib/sanityClient";
import Image from "next/image";
import Link from "next/link";

export default async function BlogGrid() {

    const blogData: blogCard[] = await getBlogData();
    const itemsPerRow = 4; // Assuming 4 items per row on large screens, adjust as necessary
    const aboveFoldThreshold = itemsPerRow * 2; // This assumes the first two rows are above the fold

    return (
    <section className="rounded-t-l overflow-hidden grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-32 mx-4 sm:mx-8 md:mx-10 lg:mx-12 xl:mx-16">
        {blogData.map((post, idx) => (
          <Card key={idx} className="cursor-pointer border-slate-400 dark:border-slate-600 flex flex-col">
            {post.titleImage ? (
              <Image
                  src={urlFor(post.titleImage).url()} 
                  alt="image"
                  height={400}
                  width={400}
                  className="rounded-t-l h-[400px] w-[100%] object-cover"
                  priority={idx < aboveFoldThreshold} // Dynamically set priority for items in the first two rows
              />
            ) : (
              <p>No image available</p>
            )}
          <CardContent className="flex flex-col flex-grow justify-between pb-4">
            <div className="mb-4">
              <h3 className="mt-2 text-xl line-clamp-2 leading-tight font-semibold">{post.title}</h3>
              <p className="line-clamp-4 dark:font-extralight text-sm mt-2">{post.description}</p>
            </div>
            <Button asChild className="w-full mt-auto">
                <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
            </Button>
          </CardContent>
          </Card>
        ))}
    </section>
  );
}
