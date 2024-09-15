import AnimatedUnderline from '@/components/ui/AnimatedUnderline';
import { RisingTextAnimation } from '@/components/ui/RisingTextAnimation';
import SmallLogo from '@/public/origindev-logo-sm.svg';
import LargeLogo from '@/public/origindev-logo.svg';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ModeToggle = dynamic(
  () => import('@/components/common/ModeToggle').then((mod) => mod.ModeToggle),
  { ssr: false }
);

interface NavItem {
  name: string;
  href: string;
}

interface NavbarProps {
  items: NavItem[];
}

export default function Navbar({ items }: NavbarProps) {
  const pathname = usePathname();
  const isBlogPage = pathname.startsWith('/blog');

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <nav
      className="w-full flex items-center justify-between mx-auto"
      aria-label="Main navigation"
    >
      <RisingTextAnimation>
        <Link
          href="/"
          className="font-bold text-3xl bg-black dark:bg-transparent dark:text-stone-200 text-stone-100 focus:outline-none"
          aria-label="Homepage"
        >
          <div className="hidden sm:block bg-black dark:bg-transparent">
            <Image
              src={LargeLogo}
              alt="Origin Dev Large Logo"
              height={32}
              priority
            />
          </div>
          <div className="block sm:hidden bg-black dark:bg-transparent">
            <Image
              src={SmallLogo}
              alt="Origin Dev Small Logo"
              height={48}
              priority
            />
          </div>
        </Link>
      </RisingTextAnimation>
      <div className="flex items-center space-x-8">
        {isBlogPage && <ModeToggle aria-label="Toggle Dark Mode" />}
        <RisingTextAnimation triggerOnChange={[pathname]}>
          <ul className="flex items-center space-x-8">
            {items.map((item) => {
              const isActive = isActiveLink(item.href);
              return (
                <li key={item.name} className="overflow-hidden">
                  <Link
                    href={item.href}
                    className={`text-base uppercase tracking-wider relative pb-1 ${
                      isActive ? 'active-link' : ''
                    } block`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <AnimatedUnderline disabled={isActive}>
                      {item.name}
                    </AnimatedUnderline>
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-0 w-full h-[2px] bg-current"
                        aria-hidden="true"
                      ></span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </RisingTextAnimation>
      </div>
    </nav>
  );
}
