"use client";

import { ProductGrid } from "@/components/products/product-grid";

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Productos Disponibles</h1>
      <ProductGrid />
    </div>
  );
} 