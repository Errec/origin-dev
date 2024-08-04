import Link from 'next/link';

export default function Main() {
  return (
    <main>
      <div className="flex items-center justify-center min-h-screen">
        <Link href={"/blog/post-list"}> Blog </Link>
      </div>
    </main>
  );
}