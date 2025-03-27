"use client";

import { Product } from "@/types/products";
import { FloatingBubble } from "@/components/products/floating-bubble";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  // Función para determinar el tamaño de la burbuja basado en el índice y el viewport
  const getBubbleSize = (index: number) => {
    // En móviles, todas las burbujas son del mismo tamaño para mejor visualización
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      return "md";
    }
    // En tablets y desktop, variamos los tamaños
    return index % 3 === 0 ? "lg" : index % 3 === 1 ? "md" : "sm";
  };

  return (
    <div className="relative min-h-[400px] px-4 sm:px-8 py-8">
      {/* Fondo con gradiente y blur */}
      <div className="absolute inset-0 bg-gradient-radial from-bubble-light/20 via-transparent to-transparent" />
      
      {/* Grid de productos */}
      <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 sm:gap-x-8 gap-y-12 sm:gap-y-16">
        {products.map((product, index) => (
          <div key={product.id} className="flex justify-center">
            <FloatingBubble
              imageUrl={product.image_url || "/placeholder-product.png"}
              productName={product.name}
              href={`/productos/${product.id}`}
              delay={index * 200} // Delay escalonado para animación
              size={getBubbleSize(index)}
              // Ajustamos el tooltip para móviles
              className="mobile-tooltip"
            />
          </div>
        ))}
      </div>

      {/* Estilos específicos para móviles */}
      <style jsx global>{`
        @media (max-width: 640px) {
          .mobile-tooltip [class*="tooltip"] {
            display: none;
          }
        }
      `}</style>
    </div>
  );
} 