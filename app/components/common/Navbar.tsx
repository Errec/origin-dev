import AnimatedUnderline from '@/components/ui/AnimatedUnderline';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { RisingTextAnimation } from '@/components/ui/RisingTextAnimation';
import SmallLogo from '@/public/origindev-logo-sm.svg';
import LargeLogo from '@/public/origindev-logo.svg';
import { Menu } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

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
  headerVisible: boolean;
}

export default function Navbar({ items, headerVisible }: NavbarProps) {
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
      <RisingTextAnimation triggerOnVisible isVisible={headerVisible}>
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
      <div className="flex items-center space-x-4">
        {isBlogPage && <ModeToggle aria-label="Toggle Dark Mode" />}
        <div className="hidden md:block">
          <RisingTextAnimation
            triggerOnChange={[pathname]}
            triggerOnVisible
            isVisible={headerVisible}
          >
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
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="p-1.5 dark:text-white rounded-md focus:outline-none border dark:border-white"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6 stroke-[1.5]" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {items.map((item) => (
                <DropdownMenuItem key={item.name} asChild>
                  <Link
                    href={item.href}
                    className={`block px-4 py-2 text-sm ${
                      isActiveLink(item.href) ? 'bg-accent' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
