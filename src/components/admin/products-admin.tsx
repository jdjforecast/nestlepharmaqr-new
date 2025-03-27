"use client"

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string | null;
  coin_value: number;
  created_at: string;
}

export function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);
      const { data } = await supabase
        .from("products")
        .select("*")
        .order("name", { ascending: true });
        
      setProducts(data || []);
    } catch (err) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los productos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function deleteProduct(id: string) {
    try {
      setLoading(true);
      const { } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      await loadProducts();
      toast({
        title: "Producto eliminado",
        description: "El producto ha sido eliminado con éxito",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el producto",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Producto
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative w-10 h-10 rounded overflow-hidden bg-gray-100">
              <Image
                src={product.image_url || "/product-placeholder.png"}
                alt={product.name}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-primary font-medium">
                  {product.coin_value} monedas
                </span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteProduct(product.id)}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No se encontraron productos
        </div>
      )}
    </div>
  );
} 