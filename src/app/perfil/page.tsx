"use client";

import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center">
        <p>Por favor inicia sesión para ver tu perfil</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Mi Perfil</h1>
      
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Email:</span> {user.emailAddresses[0]?.emailAddress}</p>
            <p><span className="font-medium">Nombre:</span> {user.fullName || "No especificado"}</p>
            <p><span className="font-medium">Monedas:</span> {typeof user.publicMetadata.coins === 'number' ? user.publicMetadata.coins : 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 