import { getBlogData } from "../../app/services/getBlogData";
import { blogCard } from "../../lib/types";
import PostCard from "./PostCard";

export const revalidate = 30; // Revalidate every 30 seconds

export default async function PostList() {
  const blogData: blogCard[] = await getBlogData();
  const itemsPerRow = 4; // Adjust as necessary
  const aboveFoldThreshold = itemsPerRow * 2; // Assumes the first two rows are above the fold

  return (
    <main>
      <ul className="rounded-t-l overflow-hidden grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-28 mx-4 sm:mx-8 md:mx-10 lg:mx-12 xl:mx-16">
        {blogData.map((post, idx) => (
          <PostCard key={idx} post={post} priority={idx < aboveFoldThreshold} />
        ))}
      </ul>
    </main>
  );
}
