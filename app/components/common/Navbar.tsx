import { ReaderIcon } from "@radix-ui/react-icons";
import { CodeIcon, Handshake, HomeIcon } from "lucide-react";
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
        <ButtonLink className="mr-4" href="/" icon={<HomeIcon />} />
        <ButtonLink className="mr-4" href="/projects" icon={<CodeIcon />} />
        <ButtonLink className="mr-4" href="/blog" icon={<ReaderIcon />} />
        <ButtonLink className="mr-4" href="/about" icon={<Handshake />} />
        <ModeToggle />
      </div>
    </nav>
  );
}
