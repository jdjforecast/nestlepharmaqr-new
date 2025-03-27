import { ProductsAdmin } from "@/components/admin/products-admin";
import { AdminRoute } from "@/components/auth/admin-route";

export default function AdminProductsPage() {
  return (
    <AdminRoute>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Administración de Productos</h1>
        <ProductsAdmin />
      </div>
    </AdminRoute>
  );
} 