"use client";

import { useProducts } from "@/hooks/use-products";
import { ProductGrid } from "@/components/products/product-grid";
import { Loader2 } from "lucide-react";

export default function ProductsPage() {
  const { products, loading, error } = useProducts();

  return (
    <div className="container py-4 sm:py-8">
      <div className="mb-6 sm:mb-8 px-4 sm:px-0">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-primary text-transparent bg-clip-text mb-2">
          Nuestros Productos
        </h1>
        <p className="text-sm sm:text-base text-primary-dark/80">
          Escanea los códigos QR de los productos para acumular monedas y canjearlos por increíbles premios.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48 sm:h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="mx-4 sm:mx-0">
          <div className="text-center text-accent p-6 sm:p-8 rounded-lg bg-accent/5 border border-accent/10">
            <p className="text-sm sm:text-base">Error al cargar los productos: {error}</p>
          </div>
        </div>
      ) : !products?.length ? (
        <div className="mx-4 sm:mx-0">
          <div className="text-center text-primary-dark/60 p-6 sm:p-8 rounded-lg bg-primary/5 border border-primary/10">
            <p className="text-sm sm:text-base">No hay productos disponibles en este momento</p>
          </div>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
} 