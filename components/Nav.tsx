"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navItems } from "@/data/mock";
import { Play, Menu, UserCircle } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setIsLoggedIn(!!data.user));
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });
    return () => subscription.subscription.unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/logo.jpg"
            alt="Distil-Nation NZ"
            width={44}
            height={44}
            className="rounded-full border border-gold/50"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-heading text-xl md:text-2xl font-semibold text-offwhite tracking-tight">
              Distil-Nation NZ
            </span>
            <span className="text-[11px] md:text-xs font-medium text-muted-foreground tracking-wide">
              NZ Spirits Podcast
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-offwhite transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Link
            href={isLoggedIn ? "/account" : "/login"}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-offwhite transition-colors"
          >
            <UserCircle className="h-4 w-4" />
            {isLoggedIn ? "Account" : "Log in"}
          </Link>
          <Link
            href="/episodes/"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gold px-3 py-1.5 text-sm font-semibold text-charcoal hover:bg-gold/90 transition-colors"
          >
            <Play className="h-4 w-4" />
            Watch Latest
          </Link>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-offwhite hover:bg-muted lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-charcoal border-border">
            <div className="flex flex-col gap-8 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-lg font-heading text-offwhite hover:text-gold transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={isLoggedIn ? "/account" : "/login"}
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 text-lg font-heading text-offwhite hover:text-gold transition-colors"
              >
                <UserCircle className="h-5 w-5" />
                {isLoggedIn ? "Account" : "Log in"}
              </Link>
              <Link
                href="/episodes/"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-charcoal hover:bg-gold/90 transition-colors w-full mt-4"
              >
                <Play className="h-4 w-4" />
                Watch Latest
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
