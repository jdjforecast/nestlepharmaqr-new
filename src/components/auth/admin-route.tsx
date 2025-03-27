"use client"

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

interface AdminRouteProps {
  children: React.ReactNode;
}

const ADMIN_EMAIL = "ncastilo@outlook.com"; // Email del administrador

export function AdminRoute({ children }: AdminRouteProps) {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      toast({
        title: "Acceso denegado",
        description: "Debes iniciar sesión para acceder a esta página",
        variant: "destructive",
      });
      router.push("/sign-in");
      return;
    }

    // Verificar si el usuario es administrador
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    if (userEmail !== ADMIN_EMAIL) {
      toast({
        title: "Acceso denegado",
        description: "No tienes permisos para acceder a esta página",
        variant: "destructive",
      });
      router.push("/");
      return;
    }
  }, [isLoaded, isSignedIn, user, router]);

  // Mostrar información de carga
  if (!isLoaded) {
    return <div>Cargando...</div>;
  }

  if (!isSignedIn) {
    return <div>No has iniciado sesión</div>;
  }

  if (user?.primaryEmailAddress?.emailAddress !== ADMIN_EMAIL) {
    return (
      <div className="p-4 bg-red-100 text-red-700">
        <p>No tienes permisos de administrador</p>
        <p>Tu email: {user?.primaryEmailAddress?.emailAddress}</p>
        <p>Email requerido: {ADMIN_EMAIL}</p>
      </div>
    );
  }

  return <>{children}</>;
} 