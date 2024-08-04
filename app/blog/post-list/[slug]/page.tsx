import { getArticleData } from "@/app/services/getArticleData";
import { articleData } from "@/lib/types";

export default async function BlogArticle({params}: {params: {slug: string}}) {
    
  const articleData: articleData = await getArticleData(params.slug);
  console.log(articleData);
  return (
      <main>
          <h1>{params.slug}</h1>
      </main>
    );
  }