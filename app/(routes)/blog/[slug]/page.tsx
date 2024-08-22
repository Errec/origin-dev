import { getArticleData } from "@/api/sanity/article";
import { urlFor } from "@/lib/sanityClient";
import { ArticleData } from "@/types/index";
import { PortableText } from "@portabletext/react";
import { format } from "date-fns";
import Image from "next/image";

export const revalidate = 30; // Revalidate every 30 seconds

export default async function BlogArticle({params}: {params: {slug: string}}) {
    
    const ArticleData: ArticleData = await getArticleData(params.slug);
    return (
    <main className="max-w-3xl mx-auto py-24 px-4">
    <article>
        <header className="mb-8">
            <Image
                priority
                src={urlFor(ArticleData.titleImage).url()} 
                alt={ArticleData.title}
                width={800}
                height={400}
                className="w-full rounded-lg shadow-md h-[600px] object-cover"
            />
            <h1 className="text-3xl font-bold mt-6">{ArticleData.title}</h1>
            <p className="text-gray-500 mt-2">
                {format(new Date(ArticleData.releaseDate), "MMMM dd, yyyy")}
            </p>
        </header>
        <section className="prose prose-slate dark:prose-invert prose-lg py-4">
            <PortableText value={ArticleData.content} />
        </section>
    </article>
</main>
    );
}