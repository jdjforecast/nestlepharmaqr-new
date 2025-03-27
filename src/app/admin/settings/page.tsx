"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface Settings {
  initialCoins: number;
  maxPurchasesPerDay: number;
  maxCoinsPerPurchase: number;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    initialCoins: 150,
    maxPurchasesPerDay: 3,
    maxCoinsPerPurchase: 500
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Aquí actualizaríamos la configuración en Supabase
      // Por ahora solo mostraremos un toast de éxito
      toast({
        title: "Configuración actualizada",
        description: "Los cambios se han guardado correctamente",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "No se pudieron guardar los cambios",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Configuración</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Configuración General</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="initialCoins">Monedas Iniciales</Label>
              <Input
                id="initialCoins"
                type="number"
                value={settings.initialCoins}
                onChange={(e) => setSettings({
                  ...settings,
                  initialCoins: parseInt(e.target.value)
                })}
                min={0}
              />
              <p className="text-sm text-gray-500">
                Cantidad de monedas que recibe un usuario al registrarse
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxPurchasesPerDay">Compras Máximas por Día</Label>
              <Input
                id="maxPurchasesPerDay"
                type="number"
                value={settings.maxPurchasesPerDay}
                onChange={(e) => setSettings({
                  ...settings,
                  maxPurchasesPerDay: parseInt(e.target.value)
                })}
                min={1}
              />
              <p className="text-sm text-gray-500">
                Número máximo de compras que un usuario puede realizar por día
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxCoinsPerPurchase">Monedas Máximas por Compra</Label>
              <Input
                id="maxCoinsPerPurchase"
                type="number"
                value={settings.maxCoinsPerPurchase}
                onChange={(e) => setSettings({
                  ...settings,
                  maxCoinsPerPurchase: parseInt(e.target.value)
                })}
                min={1}
              />
              <p className="text-sm text-gray-500">
                Cantidad máxima de monedas que se pueden gastar en una sola compra
              </p>
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              'Guardar Cambios'
            )}
          </Button>
        </div>
      </form>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Acciones del Sistema</h2>
        <div className="space-y-4">
          <div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                // Aquí iría la lógica para regenerar los QR codes
                toast({
                  title: "Regenerando QR Codes",
                  description: "Esta operación puede tardar unos minutos",
                });
              }}
            >
              Regenerar Todos los QR Codes
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              Regenera todos los códigos QR de los productos
            </p>
          </div>

          <div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                // Aquí iría la lógica para sincronizar las imágenes
                toast({
                  title: "Sincronizando Imágenes",
                  description: "Actualizando las URLs de las imágenes",
                });
              }}
            >
              Sincronizar Imágenes de Productos
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              Actualiza las URLs de las imágenes de los productos con el storage
            </p>
          </div>

          <div>
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => {
                if (confirm('¿Estás seguro? Esta acción no se puede deshacer.')) {
                  toast({
                    title: "Reiniciando Sistema",
                    description: "Todos los datos han sido reiniciados",
                  });
                }
              }}
            >
              Reiniciar Sistema
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              Reinicia todas las estadísticas y datos del sistema
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
} 