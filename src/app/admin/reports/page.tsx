"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, RefreshCw } from "lucide-react";

interface ReportData {
  totalUsers: number;
  totalProducts: number;
  totalPurchases: number;
  totalCoinsSpent: number;
  averageCoinsPerPurchase: number;
  topProducts: {
    name: string;
    total_purchases: number;
  }[];
  topUsers: {
    email: string;
    total_spent: number;
  }[];
  purchasesByMonth: {
    month: string;
    total: number;
  }[];
}

export default function ReportsPage() {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  async function loadReportData() {
    try {
      setLoading(true);

      // Obtener estadísticas generales
      const { data: stats, error: statsError } = await supabase
        .from('users')
        .select('count');
      if (statsError) throw statsError;

      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('count');
      if (productsError) throw productsError;

      const { data: purchases, error: purchasesError } = await supabase
        .from('purchases')
        .select('total_coins');
      if (purchasesError) throw purchasesError;

      // Obtener productos más vendidos - usando RPC en lugar de group
      const { data: topProducts, error: topProductsError } = await supabase
        .rpc('get_top_products')
        .limit(5);
      if (topProductsError) throw topProductsError;

      // Obtener usuarios que más han gastado
      const { data: topUsers, error: topUsersError } = await supabase
        .from('purchases')
        .select(`
          user:users(email),
          total_coins
        `)
        .order('total_coins', { ascending: false })
        .limit(5);
      if (topUsersError) throw topUsersError;

      // Obtener compras por mes
      const { data: monthlyPurchases, error: monthlyError } = await supabase
        .from('purchases')
        .select('created_at, total_coins')
        .order('created_at', { ascending: true });
      if (monthlyError) throw monthlyError;

      // Calcular totales
      const totalCoinsSpent = purchases?.reduce((acc, curr) => acc + (curr.total_coins || 0), 0) || 0;
      const averageCoinsPerPurchase = purchases?.length ? totalCoinsSpent / purchases.length : 0;

      // Procesar compras por mes
      const purchasesByMonth = monthlyPurchases?.reduce((acc: {month: string, total: number}[], purchase) => {
        const month = new Date(purchase.created_at).toLocaleString('default', { month: 'long', year: 'numeric' });
        const existingMonth = acc.find(m => m.month === month);
        if (existingMonth) {
          existingMonth.total += purchase.total_coins;
        } else {
          acc.push({ month, total: purchase.total_coins });
        }
        return acc;
      }, []) || [];

      // Define types for the data from RPC and purchases
      interface TopProductData {
        product: {
          name: string;
        };
        count: string;
      }
      
      // Tipo para topUsers
      interface UserData {
        user: {
          email: string;
        };
        total_coins: number;
      }

      setReportData({
        totalUsers: stats?.[0]?.count || 0,
        totalProducts: products?.[0]?.count || 0,
        totalPurchases: purchases?.length || 0,
        totalCoinsSpent,
        averageCoinsPerPurchase,
        topProducts: topProducts?.map((p: TopProductData) => ({
          name: p.product.name,
          total_purchases: parseInt(p.count)
        })) || [],
        topUsers: topUsers?.map((u: UserData) => ({
          email: u.user.email,
          total_spent: u.total_coins
        })) || [],
        purchasesByMonth
      });
    } catch (error) {
      console.error('Error loading report data:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los datos del reporte",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReportData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reportes y Estadísticas</h1>
        <Button onClick={loadReportData} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualizar
        </Button>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-600">Total Usuarios</h3>
          <p className="text-2xl font-bold mt-2">{reportData?.totalUsers}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-600">Total Productos</h3>
          <p className="text-2xl font-bold mt-2">{reportData?.totalProducts}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-600">Total Compras</h3>
          <p className="text-2xl font-bold mt-2">{reportData?.totalPurchases}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-600">Total Monedas Gastadas</h3>
          <p className="text-2xl font-bold mt-2">{reportData?.totalCoinsSpent}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Productos más vendidos */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Productos Más Vendidos</h3>
          <div className="space-y-4">
            {reportData?.topProducts.map((product, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm">{product.name}</span>
                <span className="font-medium">{product.total_purchases} ventas</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Usuarios que más han gastado */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Usuarios Top</h3>
          <div className="space-y-4">
            {reportData?.topUsers.map((user, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm">{user.email}</span>
                <span className="font-medium">{user.total_spent} monedas</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Compras por mes */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Compras por Mes</h3>
        <div className="space-y-4">
          {reportData?.purchasesByMonth.map((month, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm">{month.month}</span>
              <span className="font-medium">{month.total} monedas</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
} 