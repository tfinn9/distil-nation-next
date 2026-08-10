"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Episode } from "@/types";
import { Play, Headphones, Clock } from "lucide-react";

export function EpisodeCard({ episode, featured = false }: { episode: Episode; featured?: boolean }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`group relative overflow-hidden rounded-2xl bg-card border border-border ${
        featured ? "md:col-span-2 lg:col-span-2" : ""
      }`}
    >
      <div className="grid h-full gap-0 md:grid-cols-[1.2fr_1fr]">
        <div className="relative aspect-video md:aspect-auto overflow-hidden">
          <img
            src={episode.thumbnail}
            alt={episode.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
          <Badge className="absolute left-4 top-4 bg-forest/90 text-offwhite border-0">
            Ep. {episode.episodeNumber}
          </Badge>
        </div>
        <div className="flex flex-col justify-center p-6 md:p-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Clock className="h-4 w-4" />
            <span>{episode.duration}</span>
            <span className="mx-2">·</span>
            <Badge variant="secondary" className="bg-copper/20 text-copper border-0">
              {episode.spiritType}
            </Badge>
          </div>
          <h3 className="font-heading text-2xl md:text-3xl font-semibold text-offwhite mb-2">
            {episode.title}
          </h3>
          <p className="text-copper font-medium mb-3">with {episode.guest}</p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {episode.summary}
          </p>
          <div className="flex flex-wrap gap-3 mt-auto">
            {episode.youtube && (
              <a
                href={episode.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-background px-3 py-2 text-sm font-medium text-offwhite hover:bg-copper/20 transition-colors"
              >
                <Play className="h-4 w-4" />
                Watch
              </a>
            )}
            {episode.spotify && (
              <a
                href={episode.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-background px-3 py-2 text-sm font-medium text-offwhite hover:bg-forest/30 transition-colors"
              >
                <Headphones className="h-4 w-4" />
                Listen
              </a>
            )}
            <Link
              href={`/episodes/${episode.slug}/`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-offwhite hover:bg-muted transition-colors"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
