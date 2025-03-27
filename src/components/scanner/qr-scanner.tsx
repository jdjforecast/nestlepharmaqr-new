"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useToast } from "@/components/ui/use-toast";

export function QrScanner() {
  const [scanning, setScanning] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const { toast } = useToast();

  const onScanSuccess = useCallback((decodedText: string) => {
    try {
      const url = new URL(decodedText);
      const productId = url.pathname.split("/").pop();

      if (productId) {
        toast({
          title: "QR Escaneado",
          description: `Producto ID: ${productId}`,
        });
      } else {
        throw new Error("QR inválido");
      }
    } catch (error) {
      console.error('Error processing QR:', error);
      toast({
        title: "Error",
        description: "QR inválido",
        variant: "destructive",
      });
    }
  }, [toast]);

  useEffect(() => {
    let scanner: Html5QrcodeScanner | null = null;

    const startScanner = () => {
      scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: 250 },
        false
      );

      scanner.render(onScanSuccess, onScanFailure);
    };

    startScanner();

    return () => {
      if (scanner) {
        scanner.clear().catch(error => {
          console.error("Error al detener el escáner:", error);
        });
      }
    };
  }, [onScanSuccess]);

  function onScanFailure(err: string) {
    console.warn(`Error al escanear: ${err}`);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div id="reader" className="w-full max-w-lg" />
      <p className="text-sm text-gray-500">
        Coloca el código QR dentro del recuadro para escanearlo
      </p>
    </div>
  );
} 