import { Cart } from "@/components/cart/cart";

export const metadata = {
  title: "Carrito | Nestlé QR Experience",
  description: "Gestiona tus productos seleccionados",
};

/**
 * Página del carrito
 */
export default function CartPage() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-8">Tu carrito</h1>
      <Cart />
    </div>
  );
} 