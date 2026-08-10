import { FadeIn } from "./FadeIn";

export function CTABanner({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <FadeIn>
      <div className="relative overflow-hidden rounded-3xl bg-card border border-border p-8 md:p-14">
        <div className="relative z-10 max-w-3xl">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-offwhite mb-3">
            {title}
          </h2>
          <p className="text-muted-foreground text-lg mb-6">{description}</p>
          {children}
        </div>
        <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-copper/10 to-transparent pointer-events-none" />
      </div>
    </FadeIn>
  );
}
