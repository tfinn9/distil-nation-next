"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navItems } from "@/data/mock";
import { Search, Menu, UserCircle, Compass, BookOpen, X } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

interface SearchResult {
  type: string;
  title: string;
  href: string;
  subtitle?: string;
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setIsLoggedIn(!!data.user));
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });
    return () => subscription.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!searchQuery || searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        setSearchResults(data.results || []);
      } catch {
        setSearchResults([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

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
              NZ Spirits Passport
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

        <div className="hidden lg:flex items-center gap-3">
          {/* Search */}
          <div ref={searchRef} className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="inline-flex items-center justify-center h-9 w-9 rounded-lg text-muted-foreground hover:text-offwhite hover:bg-muted/50 transition-colors"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
            {searchOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 border-b border-border px-3 py-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search spirits, distilleries..."
                    className="flex-1 bg-transparent text-sm text-offwhite placeholder:text-muted-foreground focus:outline-none"
                  />
                  {searchQuery && (
                    <button onClick={() => { setSearchQuery(""); setSearchResults([]); }}>
                      <X className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                  )}
                </div>
                {searchResults.length > 0 && (
                  <div className="max-h-80 overflow-y-auto py-1">
                    {searchResults.map((result, i) => (
                      <Link
                        key={`${result.href}-${i}`}
                        href={result.href}
                        onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                        className="flex items-center gap-3 px-3 py-2 hover:bg-muted/50 transition-colors"
                      >
                        <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                          {result.type}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-offwhite truncate">{result.title}</p>
                          {result.subtitle && (
                            <p className="text-xs text-muted-foreground">{result.subtitle}</p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                {searchQuery.length >= 2 && searchResults.length === 0 && (
                  <p className="px-3 py-4 text-sm text-muted-foreground text-center">No results found</p>
                )}
              </div>
            )}
          </div>

          {/* Passport / Login */}
          <Link
            href={isLoggedIn ? "/passport" : "/login"}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gold px-3 py-1.5 text-sm font-semibold text-charcoal hover:bg-gold/90 transition-colors"
          >
            <Compass className="h-4 w-4" />
            {isLoggedIn ? "My Passport" : "Start Your Passport"}
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
            <div className="flex flex-col gap-6 mt-8">
              {/* Mobile Passport CTA */}
              <Link
                href={isLoggedIn ? "/passport" : "/login"}
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-charcoal hover:bg-gold/90 transition-colors w-full"
              >
                <Compass className="h-4 w-4" />
                {isLoggedIn ? "My Passport" : "Start Your Passport"}
              </Link>

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

              {isLoggedIn && (
                <Link
                  href="/account"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 text-lg font-heading text-offwhite hover:text-gold transition-colors"
                >
                  <UserCircle className="h-5 w-5" />
                  Account
                </Link>
              )}
              {!isLoggedIn && (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 text-lg font-heading text-offwhite hover:text-gold transition-colors"
                >
                  <UserCircle className="h-5 w-5" />
                  Log in
                </Link>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
