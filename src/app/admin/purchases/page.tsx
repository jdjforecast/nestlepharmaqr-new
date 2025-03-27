"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Search, RefreshCw } from "lucide-react";

interface Purchase {
  id: string;
  user_id: string;
  user_email: string;
  total_coins: number;
  created_at: string;
  products: {
    id: string;
    name: string;
    coin_value: number;
  }[];
}

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  async function loadPurchases() {
    try {
      setLoading(true);
      // Obtener compras con información de usuario y productos
      const { data, error } = await supabase
        .from('purchases')
        .select(`
          id,
          created_at,
          total_coins,
          user_id,
          users (
            email
          ),
          purchase_products (
            id,
            products (
              id,
              name,
              description,
              image_url,
              coin_value
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Definir tipo para los datos
      interface PurchaseData {
        id: string;
        created_at: string;
        total_coins: number;
        user_id: string;
        users: {
          email: string;
        };
        purchase_products: {
          id: string;
          products: {
            id: string;
            name: string;
            description: string;
            image_url: string;
            coin_value: number;
          };
        }[];
      }

      // Transformar y establecer los datos con tipo apropiado
      setPurchases(
        (data as PurchaseData[])?.map((purchase) => ({
          id: purchase.id,
          created_at: purchase.created_at,
          total_coins: purchase.total_coins,
          user_email: purchase.users?.email || 'Usuario desconocido',
          products: purchase.purchase_products?.map((pp) => pp.products) || []
        })) || []
      );
    } catch (error) {
      console.error('Error loading purchases:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las compras",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPurchases();
  }, [loadPurchases]);

  const filteredPurchases = purchases.filter(purchase => 
    purchase.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    purchase.products.some(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Historial de Compras</h1>
        <Button onClick={loadPurchases} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualizar
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar por usuario o producto..."
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
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Usuario</TableHead>
                <TableHead>Productos</TableHead>
                <TableHead>Total Monedas</TableHead>
                <TableHead>Fecha</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPurchases.map((purchase) => (
                <TableRow key={purchase.id}>
                  <TableCell className="font-mono">
                    {purchase.id.slice(0, 8)}
                  </TableCell>
                  <TableCell>{purchase.user_email}</TableCell>
                  <TableCell>
                    <ul className="list-disc list-inside">
                      {purchase.products.map(product => (
                        <li key={product.id} className="text-sm">
                          {product.name} ({product.coin_value} monedas)
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>{purchase.total_coins}</TableCell>
                  <TableCell>
                    {new Date(purchase.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
} 