"use client";

import { AdminRoute } from "@/components/auth/admin-route";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  History, 
  Settings,
  QrCode,
  BarChart
} from "lucide-react";

const adminRoutes = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard
  },
  {
    href: "/admin/products",
    label: "Productos",
    icon: Package
  },
  {
    href: "/admin/users",
    label: "Usuarios",
    icon: Users
  },
  {
    href: "/admin/purchases",
    label: "Compras",
    icon: History
  },
  {
    href: "/admin/qr",
    label: "Códigos QR",
    icon: QrCode
  },
  {
    href: "/admin/reports",
    label: "Reportes",
    icon: BarChart
  },
  {
    href: "/admin/settings",
    label: "Configuración",
    icon: Settings
  }
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AdminRoute>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-white">
          <div className="p-6">
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>
          <nav className="mt-6">
            {adminRoutes.map((route) => {
              const Icon = route.icon;
              const isActive = pathname === route.href;
              
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center gap-3 px-6 py-3 text-sm transition-colors",
                    isActive 
                      ? "bg-gray-800 text-white" 
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {route.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-100">
          <div className="container p-6">
            {children}
          </div>
        </main>
      </div>
    </AdminRoute>
  );
} 