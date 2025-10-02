'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export const AppNavbar: React.FC = () => {
  const pathname = usePathname();

  const linkClass = (href: string) => {
    const isActive = href === '/' ? pathname === href : pathname.startsWith(href);
    return cn(
      'px-3 py-2 rounded transition-colors',
      isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-700',
    );
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex gap-4">
        <Link href="/clashes" className={linkClass('/clashes')}>
          Clashes
        </Link>
        <Link href="/peers" className={linkClass('/peers')}>
          Peers
        </Link>
      </div>
    </nav>
  );
};
