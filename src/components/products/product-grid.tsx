"use client";

import { useProducts } from "@/hooks/use-products";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export function ProductGrid() {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Error al cargar los productos: {error}</p>
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="text-center text-gray-500">
        <p>No hay productos disponibles</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-4 flex flex-col">
          {product.image_url && (
            <div className="relative h-48 mb-4">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover rounded-md"
              />
            </div>
          )}
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600 text-sm flex-grow">{product.description}</p>
          <div className="mt-4">
            <span className="font-medium">{product.coin_value} monedas</span>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            <p>Escanea el código QR del producto para agregarlo al carrito</p>
          </div>
        </div>
      ))}
    </div>
  );
} 