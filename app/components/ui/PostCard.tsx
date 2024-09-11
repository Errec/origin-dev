import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { urlFor } from '@/lib/sanity-client';
import { BlogCard } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

type PostCardProps = {
  post: BlogCard;
  priority: boolean;
};

export default function PostCard({ post, priority }: PostCardProps) {
  const imageUrl =
    typeof post.titleImage === 'string'
      ? post.titleImage
      : urlFor(post.titleImage).url();

  return (
    <li className="list-none">
      <Card className="border-slate-400 dark:border-slate-600 flex flex-col h-full">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="image"
            height={400}
            width={400}
            className="rounded-t-l h-[400px] w-full object-cover"
            priority={priority}
          />
        )}
        <CardContent className="flex flex-col flex-grow justify-between pt-2 pb-4">
          <div className="mb-4 cursor-default">
            <h3 className="mt-2 text-xl line-clamp-2 leading-tight font-semibold">
              {post.title}
            </h3>
            <p className="line-clamp-4 dark:font-extralight text-sm mt-2">
              {post.description}
            </p>
          </div>
          <Button
            aria-label="read more"
            asChild
            className="w-full mt-auto text-base"
          >
            <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
          </Button>
        </CardContent>
      </Card>
    </li>
  );
}
