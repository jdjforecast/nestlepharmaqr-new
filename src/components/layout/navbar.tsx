"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const navigation = [
  { name: "Productos", href: "/productos" },
  { name: "Historial", href: "/historial" },
  { name: "Perfil", href: "/perfil" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logos/nestle-logo.png"
            alt="Nestlé Logo"
            width={100}
            height={32}
            className="h-8 w-auto"
            priority
          />
          <span className="hidden font-bold sm:inline-block">
            QR Experience
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              asChild
            >
              <Link href="/carrito">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Carrito</span>
                <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  0
                </div>
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </nav>
  );
} 