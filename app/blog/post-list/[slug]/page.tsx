import { getArticleData } from "@/app/services/getArticleData";
import { articleData } from "@/lib/types";
import { urlFor } from "@/sanity/lib/sanityClient";
import { PortableText } from "@portabletext/react";
import { format } from "date-fns"; // Import the 'format' function from date-fns
import Image from "next/image"; // Import the 'Image' component

export default async function BlogArticle({params}: {params: {slug: string}}) {
    
  const articleData: articleData = await getArticleData(params.slug);
  return (
    <main className="max-w-3xl mx-auto py-28 px-6">
    <article>
        <header className="mb-8">
            <Image
                priority
                src={urlFor(articleData.titleImage).url()} 
                alt={articleData.title}
                width={800}
                height={400}
                className="w-full rounded-lg shadow-md h-[600px] object-cover"
            />
            <h1 className="text-4xl font-bold mt-6">{articleData.title}</h1>
            <p className="text-gray-500 mt-2">
                {format(new Date(articleData.releaseDate), "MMMM dd, yyyy")}
            </p>
        </header>
        <section className="prose prose-slate dark:prose-invert md:prose-lg lg:prose-xl py-4">
            <PortableText value={articleData.content} />
        </section>
    </article>
</main>
    );
  }