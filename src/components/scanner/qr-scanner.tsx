"use client";

import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export function QrScanner() {
  const router = useRouter();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [scanning, setScanning] = useState(false);
  const [lastScanned, setLastScanned] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
      },
      false
    );

    const success = async (decodedText: string) => {
      if (isProcessing) return; // Evitar múltiples escaneos simultáneos
      setIsProcessing(true);

      try {
        // Verificar si el QR es una URL de producto válida
        const url = new URL(decodedText);
        const productId = url.pathname.split("/").pop();

        if (!productId) {
          throw new Error("QR inválido: No contiene ID de producto");
        }

        // Verificar si el producto existe en la base de datos
        const { data: product, error: productError } = await supabase
          .from("products")
          .select("id, name")
          .eq("id", productId)
          .single();

        if (productError || !product) {
          throw new Error("Producto no encontrado en el inventario");
        }

        // Intentar agregar el producto al carrito
        await addItem(productId);
        
        toast({
          title: "¡Producto agregado!",
          description: `Se ha agregado ${product.name} al carrito`,
          variant: "default",
        });

        setLastScanned(decodedText);
      } catch (error) {
        console.error("Error al procesar QR:", error);
        toast({
          title: "Error",
          description: error instanceof Error 
            ? error.message 
            : "No se pudo procesar el código QR",
          variant: "destructive",
        });
      } finally {
        setIsProcessing(false);
      }
    };

    const error = (err: string) => {
      console.error("Error de escaneo:", err);
    };

    scanner.render(success, error);
    setScanning(true);

    return () => {
      if (scanning) {
        scanner.clear().catch(console.error);
      }
    };
  }, [addItem, toast, scanning, isProcessing]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white p-4 rounded-lg shadow">
        <div id="reader" className="w-full" />
        {isProcessing && (
          <div className="mt-4 flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}
        {lastScanned && (
          <div className="mt-4 p-4 bg-gray-50 rounded">
            <p className="text-sm text-gray-600">
              Último QR escaneado: {lastScanned}
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 