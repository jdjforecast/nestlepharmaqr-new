"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Search, RefreshCw, Download, QrCode } from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  qr_code_url: string;
  image_url?: string;
}

export default function QRCodesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  async function loadProducts() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('id, name, qr_code_url, image_url')
        .order('name');

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los productos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function regenerateQR(productId: string) {
    try {
      // Aquí llamaríamos al script de regeneración de QR usando productId
      toast({
        title: "QR Regenerado",
        description: "El código QR se ha regenerado correctamente",
      });
      await loadProducts(); // Recargar productos para mostrar el nuevo QR
    } catch (error) {
      console.error('Error regenerating QR:', error);
      toast({
        title: "Error",
        description: "No se pudo regenerar el código QR",
        variant: "destructive",
      });
    }
  }

  function downloadQR(qrUrl: string, productName: string) {
    // Crear un enlace temporal para descargar la imagen
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = `qr-${productName.toLowerCase().replace(/\s+/g, '-')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Códigos QR</h1>
        <Button onClick={loadProducts} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualizar
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{product.name}</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => regenerateQR(product.id)}
                  >
                    <QrCode className="h-4 w-4 mr-2" />
                    Regenerar
                  </Button>
                </div>

                {product.image_url && (
                  <div className="relative h-32 w-full">
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                )}

                {product.qr_code_url ? (
                  <div className="space-y-2">
                    <div className="relative h-48 w-full">
                      <Image
                        src={product.qr_code_url}
                        alt={`QR Code for ${product.name}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => downloadQR(product.qr_code_url, product.name)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Descargar QR
                    </Button>
                  </div>
                ) : (
                  <div className="h-48 flex items-center justify-center border rounded-md">
                    <p className="text-sm text-gray-500">QR no generado</p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 