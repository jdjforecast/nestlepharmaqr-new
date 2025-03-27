"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface UserProfile {
  id: string;
  coins: number;
  created_at: string;
}

export default function ProfilePage() {
  const { user } = useUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar el perfil");
        toast({
          title: "Error",
          description: "No se pudo cargar el perfil",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user, toast]);

  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center text-red-500">
          <p>Debes iniciar sesión para ver tu perfil</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Mi Perfil</h1>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Información Personal</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-gray-600">Email</label>
                <p className="font-medium">{user.emailAddresses[0].emailAddress}</p>
              </div>
              <div>
                <label className="text-gray-600">Nombre</label>
                <p className="font-medium">{user.fullName || "No especificado"}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Monedas</h2>
            <div className="mt-4">
              <p className="text-3xl font-bold text-green-600">
                {profile?.coins || 0} monedas
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Cuenta</h2>
            <div className="mt-4">
              <p className="text-gray-600">
                Miembro desde: {" "}
                {profile?.created_at
                  ? new Date(profile.created_at).toLocaleDateString()
                  : "No disponible"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 