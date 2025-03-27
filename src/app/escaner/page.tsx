"use client";

import { QrScanner } from "@/components/scanner/qr-scanner";

export default function ScannerPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Escanear Producto</h1>
        <p className="text-gray-600 mt-2">
          Escanea el código QR del producto para agregarlo al carrito
        </p>
      </div>
      <QrScanner />
    </div>
  );
} 