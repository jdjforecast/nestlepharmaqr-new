"use client";

import Link from "next/link";
import Image from "next/image";

/**
 * Pie de página principal
 */
export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col items-center py-8 space-y-4">
        {/* Enlaces */}
        <nav className="flex flex-wrap justify-center gap-4 text-sm">
          <Link 
            href="/acerca" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Acerca de
          </Link>
          <Link 
            href="/terminos" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Términos y Condiciones
          </Link>
          <Link 
            href="/privacidad" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Política de Privacidad
          </Link>
        </nav>

        {/* Créditos */}
        <div className="flex flex-col items-center space-y-2 text-sm text-muted-foreground">
          <p className="text-center">
            Una experiencia{" "}
            <Link 
              href="https://mipartner.com.co/" 
              target="_blank"
              className="font-semibold hover:text-foreground transition-colors"
            >
              Mipartner
            </Link>
          </p>
          
          <div className="flex items-center space-x-2">
            <p>Developed by Jaime Forero C KOROVA MB</p>
            <Image
              src="/milk-bottle.svg"
              alt="Korova MB Logo"
              width={16}
              height={16}
              className="inline-block"
            />
          </div>
        </div>
      </div>
    </footer>
  );
} 