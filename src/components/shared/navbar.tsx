import Link from "next/link";
import Image from "next/image";
import { AuthStatus } from "./auth-status";

/**
 * Barra de navegación principal
 */
export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/next.svg" // Reemplazar con el logo de Nestlé cuando esté disponible
              alt="Nestlé Logo" 
              width={100} 
              height={40}
              className="dark:invert" 
            />
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            href="/" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Inicio
          </Link>
          <Link 
            href="/productos" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Productos
          </Link>
          <Link 
            href="/escaner" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Escanear QR
          </Link>
          <Link 
            href="/carrito" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Carrito
          </Link>
        </nav>
        
        <AuthStatus />
      </div>
    </header>
  );
} 