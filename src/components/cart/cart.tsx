"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

/**
 * Componente Cart: Muestra los items en el carrito y permite confirmar o eliminar selecciones
 * @returns JSX.Element
 */
export function Cart() {
  const { items, removeItem, confirmSelection, isLoading, error } = useCart();
  const { toast } = useToast();

  const handleConfirm = async () => {
    try {
      await confirmSelection();
      toast({
        title: "¡Éxito!",
        description: "Tu selección ha sido confirmada",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudo confirmar la selección",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-destructive">
        <p>{error}</p>
      </div>
    );
  }

  if (!items?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-muted-foreground">No hay items en el carrito</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
            <p className="text-sm font-medium mt-1">{item.coin_value} monedas</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeItem(item.id)}
              disabled={isLoading}
            >
              Eliminar
            </Button>
          </div>
        </div>
      ))}
      <div className="flex justify-end mt-4">
        <Button 
          onClick={handleConfirm}
          disabled={isLoading}
        >
          Confirmar Selección
        </Button>
      </div>
    </div>
  );
} 