"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Purchase {
  id: string;
  created_at: string;
  total_coins: number;
  products: {
    id: string;
    name: string;
    coin_value: number;
  }[];
}

export default function PurchaseHistoryPage() {
  const { user } = useUser();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function loadPurchases() {
      if (!user) return;

      try {
        const { data } = await supabase
          .from("purchases")
          .select(`
            id,
            created_at,
            total_coins,
            products (
              id,
              name,
              coin_value
            )
          `)
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        setPurchases(data || []);
      } catch (err) {
        console.error('Error loading purchase history:', err);
        toast({
          title: "Error",
          description: "No se pudo cargar el historial de compras",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    loadPurchases();
  }, [user, toast]);

  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center text-red-500">
          <p>Debes iniciar sesión para ver tu historial</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (purchases.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Historial de Compras</h1>
        <div className="text-center text-gray-500">
          <p>No tienes compras realizadas aún</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Historial de Compras</h1>
      
      <div className="max-w-4xl mx-auto space-y-6">
        {purchases.map((purchase) => (
          <div
            key={purchase.id}
            className="bg-white p-6 rounded-lg shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500">
                  Fecha: {new Date(purchase.created_at).toLocaleDateString()}
                </p>
                <p className="text-lg font-semibold mt-1">
                  Total: {purchase.total_coins} monedas
                </p>
              </div>
              <div className="text-sm text-gray-500">
                #{purchase.id.slice(0, 8)}
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Productos:</h3>
              <ul className="space-y-2">
                {purchase.products.map((product) => (
                  <li
                    key={product.id}
                    className="flex justify-between items-center"
                  >
                    <span>{product.name}</span>
                    <span className="text-gray-600">
                      {product.coin_value} monedas
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 