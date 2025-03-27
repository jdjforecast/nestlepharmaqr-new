import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

/**
 * Layout principal para todas las páginas que no son de autenticación
 */
export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
} 