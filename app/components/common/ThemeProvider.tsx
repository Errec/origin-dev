'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { usePathname } from 'next/navigation';
import * as React from 'react';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const pathname = usePathname();
  const isBlogPage = pathname.startsWith('/blog');

  React.useEffect(() => {
    if (!isBlogPage) {
      document.documentElement.classList.add('dark');
    }
  }, [isBlogPage]);

  return (
    <NextThemesProvider
      {...props}
      forcedTheme={isBlogPage ? undefined : 'dark'}
      enableSystem={isBlogPage}
    >
      {children}
    </NextThemesProvider>
  );
}
