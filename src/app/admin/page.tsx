"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { Loader2, Package, Users, ShoppingCart, Coins } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardStats {
  totalProducts: number;
  totalUsers: number;
  totalPurchases: number;
  totalCoinsSpent: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        // Obtener estadísticas de productos
        const { data: products, error: productsError } = await supabase
          .from('products')
          .select('count');
        
        if (productsError) throw productsError;

        // Obtener estadísticas de usuarios
        const { data: users, error: usersError } = await supabase
          .from('users')
          .select('count');
        
        if (usersError) throw usersError;

        // Obtener estadísticas de compras
        const { data: purchases, error: purchasesError } = await supabase
          .from('purchases')
          .select('coins_spent');
        
        if (purchasesError) throw purchasesError;

        // Calcular totales
        const totalCoinsSpent = purchases?.reduce((acc, curr) => acc + (curr.coins_spent || 0), 0) || 0;

        setStats({
          totalProducts: products?.[0]?.count || 0,
          totalUsers: users?.[0]?.count || 0,
          totalPurchases: purchases?.length || 0,
          totalCoinsSpent,
        });
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Productos",
      value: stats?.totalProducts || 0,
      icon: Package,
      color: "text-blue-600"
    },
    {
      title: "Total Usuarios",
      value: stats?.totalUsers || 0,
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Total Compras",
      value: stats?.totalPurchases || 0,
      icon: ShoppingCart,
      color: "text-purple-600"
    },
    {
      title: "Total Monedas Gastadas",
      value: stats?.totalCoinsSpent || 0,
      icon: Coins,
      color: "text-yellow-600"
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <Icon className={cn("h-8 w-8", stat.color)} />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Aquí podemos agregar más secciones como:
          - Gráficos de tendencias
          - Lista de últimas compras
          - Productos más populares
          - etc. */}
    </div>
  );
} 