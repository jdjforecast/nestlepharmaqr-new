import Link from "next/link";

/**
 * Pie de página principal
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Nestlé QR Experience</h3>
            <p className="text-sm text-muted-foreground">
              Plataforma de experiencia QR para productos Nestlé.
            </p>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold">Enlaces</h3>
            <div className="flex flex-col gap-2">
              <Link 
                href="/" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Inicio
              </Link>
              <Link 
                href="/productos" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Productos
              </Link>
              <Link 
                href="/escaner" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Escanear QR
              </Link>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold">Legal</h3>
            <div className="flex flex-col gap-2">
              <Link 
                href="/privacidad" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Política de privacidad
              </Link>
              <Link 
                href="/terminos" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Términos y condiciones
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Nestlé. Todos los derechos reservados.
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Powered by MIpartner & Korova MB</span>
          </div>
        </div>
      </div>
    </footer>
  );
} 