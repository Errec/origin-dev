import { getBlogData } from "@/app/services/getBlogData";
import { Card, CardContent } from "@/components/ui/card";
import { blogCard } from "@/lib/types";
import { urlFor } from "@/sanity/lib/sanityClient";
import Image from "next/image";

export default async function BlogGrid() {

    const blogData: blogCard[] = await getBlogData();
    console.log(blogData);
    return (
    <section className="rounded-t-l overflow-hidden grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-4">
        {blogData.map((post, idx) => (
          <Card key={idx} className="cursor-pointer border-slate-400 dark:border-slate-600">
            {post.titleImage ? (
              <Image
                  src={urlFor(post.titleImage).url()} 
                  alt="image"
                  height={400}
                  width={400}
                  className="rounded-t-l h-[400px] w-[100%] object-cover"
              />
            ) : (
              <p>No image available</p>
            )}
          <CardContent className="mt-4">
            <h3 className="text-xl line-clamp-2 leading-tight font-semibold">{post.title}</h3>
            <p className="line-clamp-4 dark:font-extralight  text-sm mt-2">{post.description}</p>
          </CardContent>
          </Card>
        ))}
    </section>
  );
}