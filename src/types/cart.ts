/**
 * Representa un producto en el sistema
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  coin_value: number;
  image_url: string;
}

/**
 * Representa un item en el carrito
 * Según los requerimientos, solo se permite un producto por usuario
 */
export interface DatabaseCartItem {
  id: string;
  user_id: string;
  product_id: string;
  product: Product;
  created_at: string;
}

export interface CartItem {
  id: string;
  name: string;
  description: string;
  coin_value: number;
}

/**
 * Estado del carrito
 */
export interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Acciones disponibles para el carrito
 */
export type CartAction =
  | { type: "SET_LOADING" }
  | { type: "SET_ERROR"; payload: string }
  | { type: "CLEAR_ERROR" }
  | { type: "SET_ITEMS"; payload: CartItem[] }
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }; 