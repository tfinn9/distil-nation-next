import { Badge } from "@/components/ui/badge";

interface SectionHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  action?: React.ReactNode;
}

export function SectionHeader({ title, description, badge, action }: SectionHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
      <div className="space-y-3">
        {badge && (
          <Badge className="bg-copper/20 text-copper border-0 hover:bg-copper/20">
            {badge}
          </Badge>
        )}
        <h2 className="text-4xl md:text-5xl font-heading font-semibold text-offwhite">
          {title}
        </h2>
        {description && (
          <p className="text-muted-foreground max-w-2xl text-lg">
            {description}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
