'use client';

import { useCallback, useEffect, useReducer } from 'react';
import { useUser } from '@clerk/nextjs';
import { CartAction, CartState, CartItem, DatabaseCartItem } from '@/types/cart';
import { addToCart, getCartItem, removeFromCart, confirmCartSelection } from '@/lib/cart';

const initialState: CartState = {
  items: [],
  isLoading: false,
  error: null,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: true, error: null };
    case "SET_ERROR":
      return { ...state, isLoading: false, error: action.payload };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    case "SET_ITEMS":
      return { ...state, items: action.payload, isLoading: false };
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload],
        isLoading: false,
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        isLoading: false,
      };
    default:
      return state;
  }
}

/**
 * Hook para manejar el estado del carrito
 * Implementa la lógica de un producto por usuario
 */
export function useCart() {
  const { user } = useUser();
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const loadCart = useCallback(async () => {
    if (!user?.id) return;

    try {
      dispatch({ type: "SET_LOADING" });
      const cartItem = await getCartItem(user.id) as DatabaseCartItem | null;
      if (cartItem) {
        const formattedItem: CartItem = {
          id: cartItem.id,
          name: cartItem.product.name,
          description: cartItem.product.description,
          coin_value: cartItem.product.coin_value
        };
        dispatch({ type: "SET_ITEMS", payload: [formattedItem] });
      } else {
        dispatch({ type: "SET_ITEMS", payload: [] });
      }
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Error al cargar el carrito",
      });
    }
  }, [user?.id]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const addItem = useCallback(async (productId: string) => {
    if (!user?.id) return;

    try {
      dispatch({ type: "SET_LOADING" });
      await addToCart(user.id, productId);
      await loadCart(); // Recargar el carrito después de agregar
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Error al agregar al carrito",
      });
    }
  }, [user?.id, loadCart]);

  const removeItem = useCallback(async (itemId: string) => {
    if (!user?.id) return;

    try {
      dispatch({ type: "SET_LOADING" });
      await removeFromCart(user.id);
      dispatch({ type: "REMOVE_ITEM", payload: itemId });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Error al eliminar del carrito",
      });
    }
  }, [user?.id]);

  const confirmSelection = useCallback(async () => {
    if (!user?.id || !state.items.length) return;

    try {
      dispatch({ type: "SET_LOADING" });
      await confirmCartSelection(user.id);
      dispatch({ type: "SET_ITEMS", payload: [] });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Error al confirmar la selección",
      });
      throw error; // Re-throw para manejo en el componente
    }
  }, [user?.id, state.items]);

  const clearError = useCallback(() => {
    dispatch({ type: "CLEAR_ERROR" });
  }, []);

  return {
    ...state,
    addItem,
    removeItem,
    confirmSelection,
    clearError,
  };
} 