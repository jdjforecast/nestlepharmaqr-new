"use client";

import { Product } from "@/types/products";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

interface FloatingBubbleProps {
  product: Product;
}

export function FloatingBubble({ product }: FloatingBubbleProps) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = async () => {
    try {
      await addItem(product.id);
      toast({
        title: "¡Producto agregado!",
        description: `Se ha agregado ${product.name} al carrito`,
      });
    } catch (err) {
      console.error('Error adding to cart:', err);
      toast({
        title: "Error",
        description: "No se pudo agregar el producto al carrito",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="group relative aspect-square overflow-hidden rounded-xl bg-background hover:shadow-xl transition-all duration-300">
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/80 to-background/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {product.image_url ? (
        <Image
          src={product.image_url}
          alt={product.name}
          width={300}
          height={300}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-muted">
          <span className="text-muted-foreground">Sin imagen</span>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 z-20 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="mb-2 text-lg font-semibold text-white line-clamp-2">
          {product.name}
        </h3>
        <Button
          onClick={handleAddToCart}
          className="w-full gap-2"
          variant="default"
        >
          <ShoppingCart className="h-4 w-4" />
          Agregar al carrito
        </Button>
      </div>
    </div>
  );
} 