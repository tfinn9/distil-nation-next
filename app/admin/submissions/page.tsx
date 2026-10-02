import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SubmissionActions } from "@/components/admin/SubmissionActions";
import { Inbox, CheckCircle, XCircle, Clock } from "lucide-react";

export const metadata = {
  title: "Spirit Submissions | Distil-Nation NZ",
};

interface Submission {
  id: string;
  spirit_name: string;
  distillery_name: string | null;
  category: string | null;
  subcategory: string | null;
  abv: number | null;
  region: string | null;
  description: string | null;
  official_url: string | null;
  notes: string | null;
  submitted_email: string | null;
  status: string;
  created_at: string;
}

const statusIcon: Record<string, React.ReactNode> = {
  pending: <Clock className="h-4 w-4 text-gold" />,
  approved: <CheckCircle className="h-4 w-4 text-forest" />,
  rejected: <XCircle className="h-4 w-4 text-destructive" />,
};

export default async function AdminSubmissionsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin") redirect("/");

  const { data: submissions } = await supabase
    .from("spirit_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  const allSubmissions = (submissions ?? []) as Submission[];
  const pending = allSubmissions.filter((s) => s.status === "pending");
  const reviewed = allSubmissions.filter((s) => s.status !== "pending");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 pb-20 max-w-4xl">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Admin", href: "/admin" }, { label: "Submissions" }]} />

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-semibold text-offwhite">Spirit Submissions</h1>
            <p className="text-muted-foreground text-sm">
              {pending.length} pending &middot; {reviewed.length} reviewed
            </p>
          </div>
        </div>

        {pending.length > 0 && (
          <div className="mb-10">
            <h2 className="font-heading text-lg font-semibold text-gold mb-4 flex items-center gap-2">
              <Inbox className="h-5 w-5" />
              Pending Review ({pending.length})
            </h2>
            <div className="space-y-3">
              {pending.map((sub) => (
                <div key={sub.id} className="rounded-xl bg-card border border-gold/30 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {statusIcon[sub.status]}
                        <p className="text-sm text-offwhite font-semibold">{sub.spirit_name}</p>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mb-2">
                        {sub.distillery_name && <span>Distillery: {sub.distillery_name}</span>}
                        {sub.category && <span>Category: {sub.category}</span>}
                        {sub.subcategory && <span>Sub: {sub.subcategory}</span>}
                        {sub.abv && <span>{sub.abv}% ABV</span>}
                        {sub.region && <span>Region: {sub.region}</span>}
                      </div>
                      {sub.description && (
                        <p className="text-xs text-muted-foreground mb-1">{sub.description}</p>
                      )}
                      {sub.notes && (
                        <p className="text-xs text-muted-foreground italic">Notes: {sub.notes}</p>
                      )}
                      <p className="text-[10px] text-muted-foreground mt-2">
                        {sub.submitted_email && <span>{sub.submitted_email} &middot; </span>}
                        {new Date(sub.created_at).toLocaleDateString("en-NZ")}
                      </p>
                    </div>
                    <SubmissionActions id={sub.id} name={sub.spirit_name} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {reviewed.length > 0 && (
          <div>
            <h2 className="font-heading text-lg font-semibold text-muted-foreground mb-4">
              Previously Reviewed ({reviewed.length})
            </h2>
            <div className="space-y-2">
              {reviewed.map((sub) => (
                <div key={sub.id} className="rounded-xl bg-card border border-border px-4 py-3 flex items-center gap-3">
                  {statusIcon[sub.status]}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-offwhite truncate">{sub.spirit_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {sub.status === "approved" ? "Approved" : "Rejected"} &middot; {new Date(sub.created_at).toLocaleDateString("en-NZ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {allSubmissions.length === 0 && (
          <div className="rounded-2xl bg-card border border-border p-8 text-center">
            <Inbox className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No submissions yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
