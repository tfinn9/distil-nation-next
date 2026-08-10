"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Play, Compass, ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-[85vh] min-h-[620px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/assets/hero.jpg"
          alt="A dram of New Zealand craft whisky beside an open book"
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-5xl space-y-8"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-semibold text-offwhite leading-[1.1] tracking-tight">
            Discover New Zealand&apos;s Craft Spirits.
          </h1>
          <p className="mx-auto max-w-2xl text-lg md:text-xl text-offwhite/80 leading-relaxed">
            Following the people, places and stories behind New Zealand&apos;s distilleries.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/episodes/"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-base font-semibold text-charcoal hover:bg-gold/90 transition-colors"
            >
              <Play className="h-5 w-5" />
              Watch Latest Episode
            </Link>
            <Link
              href="/distilleries/"
              className="inline-flex items-center gap-2 rounded-lg border border-offwhite/20 px-6 py-3 text-base font-medium text-offwhite hover:bg-offwhite/10 transition-colors"
            >
              <Compass className="h-5 w-5" />
              Explore Distilleries
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown className="h-6 w-6 text-offwhite/60 animate-bounce" />
      </motion.div>
    </section>
  );
}
