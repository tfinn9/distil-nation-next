"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export function Newsletter({
  title = "Get the latest from Distil-Nation",
  description = "New episodes, distillery profiles and NZ spirits news delivered monthly.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="rounded-3xl bg-card border border-border p-8 md:p-12">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="space-y-3">
          <h3 className="font-heading text-3xl md:text-4xl font-semibold text-offwhite">
            {title}
          </h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
          <Input
            type="email"
            placeholder="you@email.com"
            className="h-12 bg-background border-border text-offwhite placeholder:text-muted-foreground flex-1"
          />
          <Button
            type="submit"
            className="h-12 bg-gold text-charcoal hover:bg-gold/90 font-semibold px-6"
          >
            <Mail className="mr-2 h-4 w-4" />
            Subscribe
          </Button>
        </form>
      </div>
    </div>
  );
}
