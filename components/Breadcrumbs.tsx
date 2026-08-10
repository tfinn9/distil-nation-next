"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground py-6" aria-label="Breadcrumbs">
      {items.map((item, index) => (
        <span key={item.label} className="flex items-center gap-2">
          {index > 0 && <ChevronRight className="h-4 w-4" />}
          {item.href ? (
            <Link href={item.href} className="hover:text-gold transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-offwhite">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
