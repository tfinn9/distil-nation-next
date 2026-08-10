"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

export function SubscribeCard({
  title,
  description,
  href,
  icon,
  colorClass,
}: {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  colorClass: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="flex items-start gap-4 rounded-2xl bg-card border border-border p-5 hover:border-gold/30 transition-colors"
    >
      <div
        className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${colorClass}`}
      >
        {icon}
      </div>
      <div>
        <h3 className="font-heading text-lg font-semibold text-offwhite">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </motion.a>
  );
}
