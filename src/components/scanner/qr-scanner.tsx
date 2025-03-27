"use client";

import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useToast } from "@/components/ui/use-toast";

export function QrScanner() {
  const [scanning, setScanning] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!scanning) {
      scannerRef.current = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false
      );

      scannerRef.current.render(onScanSuccess, onScanFailure);
      setScanning(true);
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
      }
    };
  }, [scanning]);

  function onScanSuccess(decodedText: string) {
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
      toast({
        title: "Error",
        description: "QR inválido",
        variant: "destructive",
      });
    }
  }

  function onScanFailure(error: string) {
    console.warn(`Fallo al escanear QR: ${error}`);
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