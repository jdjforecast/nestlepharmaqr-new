"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { Loader2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string | null;
  coin_value: number;
  qr_code_url: string | null;
}

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", params.id)
          .single();

        if (error) throw error;
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar el producto");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto py-8 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center text-red-500">
          <p>{error || "Producto no encontrado"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {product.image_url && (
            <div className="relative h-[400px]">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-600 mt-4">{product.description}</p>
            <div className="mt-8">
              <p className="text-2xl font-bold">{product.coin_value} monedas</p>
            </div>
            <div className="mt-4 text-gray-500">
              <p>Escanea el código QR del producto para agregarlo al carrito</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 