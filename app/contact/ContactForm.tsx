"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  return (
    <form
      className="space-y-6 rounded-3xl bg-card border border-border p-6 md:p-8"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-offwhite">
            Name
          </label>
          <Input
            id="name"
            placeholder="Your name"
            className="h-12 bg-background border-border text-offwhite placeholder:text-muted-foreground"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-offwhite">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@email.com"
            className="h-12 bg-background border-border text-offwhite placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium text-offwhite">
          Subject
        </label>
        <Input
          id="subject"
          placeholder="How can we help?"
          className="h-12 bg-background border-border text-offwhite placeholder:text-muted-foreground"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-offwhite">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell us what's on your mind..."
          className="w-full rounded-lg border border-border bg-background p-3 text-offwhite placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring outline-none"
        />
      </div>
      <Button
        type="submit"
        className="h-12 bg-gold text-charcoal hover:bg-gold/90 font-semibold px-8"
      >
        Send message
      </Button>
    </form>
  );
}
