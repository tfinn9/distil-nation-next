export function formatNewsDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-NZ", { day: "numeric", month: "long", year: "numeric" });
}
