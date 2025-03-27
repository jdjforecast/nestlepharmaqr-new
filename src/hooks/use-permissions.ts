"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";

interface UsePermissionsResult {
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
}

export function usePermissions(): UsePermissionsResult {
  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkPermissions() {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const { data, error: dbError } = await supabase
          .from("users")
          .select("role")
          .eq("id", user.id)
          .single();

        if (dbError) throw dbError;

        setIsAdmin(data?.role === "admin");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al verificar permisos");
      } finally {
        setLoading(false);
      }
    }

    checkPermissions();
  }, [user?.id]);

  return { isAdmin, loading, error };
} 