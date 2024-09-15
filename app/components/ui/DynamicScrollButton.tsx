'use client';

import ButtonScrollToTop from '@/components/ui/ButtonScrollToTop';
import { usePathname } from 'next/navigation';

interface DynamicScrollButtonProps {
  allowedPaths: string[];
}

export default function DynamicScrollButton({
  allowedPaths,
}: DynamicScrollButtonProps) {
  const pathname = usePathname();

  const shouldShowButton = allowedPaths.some(
    (path) => pathname === path || (path !== '/' && pathname.startsWith(path))
  );

  if (!shouldShowButton) {
    return null;
  }

  return <ButtonScrollToTop />;
}
