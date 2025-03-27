"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

/**
 * Componente que muestra el estado de autenticación
 * Muestra un botón de inicio de sesión o el avatar del usuario
 */
export function AuthStatus() {
  const { isSignedIn, user } = useUser();

  return (
    <div className="flex items-center gap-4">
      {isSignedIn ? (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium hidden sm:inline">
            {user?.firstName || "Usuario"}
          </span>
          <UserButton afterSignOutUrl="/" />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link
            href="/signin"
            className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium border border-input px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Registrarse
          </Link>
        </div>
      )}
    </div>
  );
} 