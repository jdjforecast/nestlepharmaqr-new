import { supabase } from './supabase';
import { CartItem, Product } from '@/types/cart';

/**
 * Obtiene el item del carrito de un usuario
 */
export async function getCartItem(userId: string): Promise<CartItem | null> {
  const { data, error } = await supabase
    .from('cart_items')
    .select(`
      id,
      user_id,
      product_id,
      created_at,
      products (
        id,
        name,
        description,
        price,
        image_url,
        qr_code_url,
        inventory,
        coin_value
      )
    `)
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching cart item:', error);
    return null;
  }

  if (!data) return null;

  return {
    id: data.id,
    user_id: data.user_id,
    product_id: data.product_id,
    created_at: new Date(data.created_at),
    product: data.products as Product
  };
}

/**
 * Agrega un producto al carrito
 * Solo permite un producto por usuario
 */
export async function addToCart(userId: string, productId: string): Promise<CartItem | null> {
  // Verificar si el usuario ya tiene un producto en el carrito
  const existingItem = await getCartItem(userId);
  if (existingItem) {
    throw new Error('Ya tienes un producto en el carrito');
  }

  // Verificar si el producto existe y tiene inventario
  const { data: product, error: productError } = await supabase
    .from('products')
    .select()
    .eq('id', productId)
    .single();

  if (productError || !product) {
    throw new Error('Producto no encontrado');
  }

  if (product.inventory <= 0) {
    throw new Error('Producto sin inventario');
  }

  // Agregar al carrito
  const { data, error } = await supabase
    .from('cart_items')
    .insert({
      user_id: userId,
      product_id: productId
    })
    .select(`
      id,
      user_id,
      product_id,
      created_at,
      products (
        id,
        name,
        description,
        price,
        image_url,
        qr_code_url,
        inventory,
        coin_value
      )
    `)
    .single();

  if (error) {
    console.error('Error adding to cart:', error);
    return null;
  }

  return {
    id: data.id,
    user_id: data.user_id,
    product_id: data.product_id,
    created_at: new Date(data.created_at),
    product: data.products as Product
  };
}

/**
 * Elimina un producto del carrito
 */
export async function removeFromCart(userId: string): Promise<void> {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', userId);

  if (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
}

/**
 * Confirma la selección del carrito
 * Actualiza el inventario y las monedas del usuario
 */
export async function confirmCartSelection(userId: string): Promise<void> {
  const cartItem = await getCartItem(userId);
  if (!cartItem) {
    throw new Error('No hay productos en el carrito');
  }

  // Iniciar transacción
  const { error } = await supabase.rpc('confirm_cart_selection', {
    p_user_id: userId,
    p_product_id: cartItem.product_id,
    p_coin_value: cartItem.product.coin_value
  });

  if (error) {
    console.error('Error confirming cart selection:', error);
    throw error;
  }
} 