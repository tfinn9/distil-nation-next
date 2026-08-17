import { Distillery } from "@/types";
import { Factory, MapPin, Martini, DoorOpen } from "lucide-react";

export function DistilleryStats({ distilleries }: { distilleries: Distillery[] }) {
  const active = distilleries.filter((d) => d.isActive);
  const regionCount = new Set(active.map((d) => d.region)).size;
  const spiritCount = active.reduce((sum, d) => sum + d.spiritTypes.length, 0);
  const cellarDoorCount = active.filter((d) => d.hasVisitorCentre).length;

  const stats = [
    { label: "Distilleries", value: active.length, icon: Factory },
    { label: "Regions", value: regionCount, icon: MapPin },
    { label: "Spirits", value: spiritCount, icon: Martini },
    { label: "Open Cellar Doors", value: cellarDoorCount, icon: DoorOpen },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-8">
      {stats.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="flex flex-col items-center gap-2 rounded-2xl bg-card border border-border p-5 text-center"
        >
          <Icon className="h-5 w-5 text-gold" />
          <span className="font-heading text-3xl font-semibold text-offwhite">{value}</span>
          <span className="text-xs text-muted-foreground uppercase tracking-wide">{label}</span>
        </div>
      ))}
    </div>
  );
}
