import { getBlogData } from "@/app/services/getBlogData";
import { Card } from "@/components/ui/card";
import { blogCard } from "@/lib/types";
import { urlFor } from "@/sanity/lib/sanityClient";
import Image from "next/image";

export default async function BlogGrid() {

    const blogData: blogCard[] = await getBlogData();
    console.log(blogData);
    return (
    <section className="rounded-t-xl overflow-hidden grid gap-4 grid-cols-1 md:grid-cols-2 mt-4">
        {blogData.map((post, idx) => (
          <Card key={idx}>
            {post.titleImage ? (
              <Image
                  src={urlFor(post.titleImage).url()} 
                  alt="image"
                  height={400}
                  width={400}
                  className="rounded-t-xl h-[400px] w-[100%] object-cover"
              />
            ) : (
              <p>No image available</p>
            )}
          </Card>
        ))}
    </section>
  );
}