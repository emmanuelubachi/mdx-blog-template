'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BarChart2, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const links = [
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/resources', label: 'Resources' },
];

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 w-full items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <BarChart2 className="h-6 w-6" />
          </motion.div>
          <span className="font-bold">DataViz Business</span>
        </Link>
        <div className="flex items-center justify-between space-x-2 md:justify-end">
          <nav className="hidden md:flex items-center space-x-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground/60 transition-colors hover:text-foreground/80"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="md:hidden" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-foreground/60 transition-colors hover:text-foreground/80"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
