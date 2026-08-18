"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { PassportEntry } from "@/types/passport";

export function usePassportEntries() {
  const [entries, setEntries] = useState<Record<string, PassportEntry>>({});
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setUserId(null);
      setEntries({});
      setLoading(false);
      return;
    }

    setUserId(user.id);

    const { data } = await supabase.from("passport_entries").select("*");
    const map: Record<string, PassportEntry> = {};
    (data ?? []).forEach((row) => {
      map[row.distillery_slug] = row as PassportEntry;
    });
    setEntries(map);
    setLoading(false);
  }, []);

  useEffect(() => {
    refetch();
    const supabase = createClient();
    const { data: subscription } = supabase.auth.onAuthStateChange(() => {
      refetch();
    });
    return () => subscription.subscription.unsubscribe();
  }, [refetch]);

  return { entries, userId, loading, refetch };
}
