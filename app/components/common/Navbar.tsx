import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full relative flex item center justify-between p-4 mx-auto">
        <Link href="/" className="font-bold text-3xl text-gray-900">Errec</Link>
        <Link href="/" className="font-bold text-gray-900">Blog</Link>
    </nav>
  )
}
