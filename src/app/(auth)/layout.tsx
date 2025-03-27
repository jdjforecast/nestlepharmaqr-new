import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Autenticación | Nestlé QR Experience",
  description: "Inicia sesión o regístrate en la plataforma QR de Nestlé",
};

/**
 * Layout para las páginas de autenticación
 */
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <div className="min-h-screen bg-background">
        {children}
      </div>
    </ClerkProvider>
  );
} 