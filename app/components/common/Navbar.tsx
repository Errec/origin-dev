import { ReaderIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { ButtonLink } from "../../components/ui/button-link";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between mx-auto">
      <Link href="/" className="font-bold text-3xl dark:text-stone-200 text-stone-100">
        Errec
      </Link>
      <div className="flex items-center">
        <ButtonLink className="mr-4" href="/blog" icon={<ReaderIcon />} />
        <ModeToggle />
      </div>
    </nav>
  );
}
