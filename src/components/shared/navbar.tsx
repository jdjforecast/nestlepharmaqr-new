"use client";

import Link from "next/link";
import { usePermissions } from "@/hooks/use-permissions";
import { useCart } from "@/hooks/use-cart";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";

/**
 * Barra de navegación principal
 */
export function Navbar() {
  const { isAdmin } = usePermissions();
  const { items } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/productos"
              className="transition-colors hover:text-foreground/80"
            >
              Productos
            </Link>
            <Link
              href="/historial"
              className="transition-colors hover:text-foreground/80"
            >
              Historial
            </Link>
            <Link
              href="/perfil"
              className="transition-colors hover:text-foreground/80"
            >
              Perfil
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                className="transition-colors hover:text-foreground/80"
              >
                Admin
              </Link>
            )}
          </nav>
        </div>
        <Button variant="outline" size="icon" asChild className="ml-auto">
          <Link href="/carrito" className="relative">
            <ShoppingCart className="h-4 w-4" />
            {items.length > 0 && (
              <span className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>
        </Button>
      </div>
    </header>
  );
} 