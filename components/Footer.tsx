"use client";

import Link from "next/link";
import { navItems, siteConfig } from "@/data/mock";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Youtube, Instagram, Facebook, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-charcoal border-t border-border">
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="font-heading text-2xl text-offwhite">Distil-Nation NZ</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-heading text-lg text-offwhite">Quick Links</h4>
            <ul className="space-y-2">
              {navItems.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-heading text-lg text-offwhite">Listen On</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={siteConfig.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-gold transition-colors"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-gold transition-colors"
                >
                  Spotify
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.spreaker}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-gold transition-colors"
                >
                  Spreaker
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-heading text-lg text-offwhite">Newsletter</h4>
            <p className="text-sm text-muted-foreground">
              Get the latest episodes and NZ spirits news.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="you@email.com"
                className="bg-background border-border text-offwhite placeholder:text-muted-foreground"
              />
              <Button type="submit" className="bg-gold text-charcoal hover:bg-gold/90">
                <Mail className="h-4 w-4" />
              </Button>
            </form>
            <div className="flex gap-4 pt-2">
              <a
                href={siteConfig.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-gold transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-12 bg-border" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Distil-Nation NZ. All rights reserved.</p>
          <p>distilnation.nz</p>
        </div>
      </div>
    </footer>
  );
}
