import { blogCard } from "@/lib/types";
import { urlFor } from "@/sanity/lib/sanityClient";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

type PostCardProps = {
  post: blogCard;
  priority: boolean;
};

export default function PostCard({ post, priority }: PostCardProps) {
  return (
    <Card className="border-slate-400 dark:border-slate-600 flex flex-col">
      {post.titleImage ? (
        <Image
          src={urlFor(post.titleImage).url()}
          alt="image"
          height={400}
          width={400}
          className="rounded-t-l h-[400px] w-[100%] object-cover"
          priority={priority}
        />
      ) : (
        <p>No image available</p>
      )}
      <CardContent className="flex flex-col flex-grow justify-between pb-4">
        <div className="mb-4 cursor-default">
          <h3 className="mt-2 text-xl line-clamp-2 leading-tight font-semibold">{post.title}</h3>
          <p className="line-clamp-4 dark:font-extralight text-sm mt-2">{post.description}</p>
        </div>
        <Button asChild className="w-full mt-auto">
          <Link href={`/blog/post-list/${post.currentSlug}`}>Read More</Link>
        </Button>
      </CardContent>
    </Card>
  );
}