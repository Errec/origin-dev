import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  return (
    <nav className="w-full flex item center justify-between mx-auto">
        <Link href="/" className="font-bold text-3xl text-stone-600">Errec</Link>
        <ModeToggle />
    </nav>
  )
}
