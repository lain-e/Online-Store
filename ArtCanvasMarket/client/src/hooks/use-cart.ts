import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { CartItem, Painting } from "@shared/schema";

type CartItemWithPainting = CartItem & { painting: Painting };

export function useCart() {
  const [sessionId, setSessionId] = useState<string>("");

  // Generate or get session ID
  useEffect(() => {
    let id = localStorage.getItem("cart-session-id");
    if (!id) {
      id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("cart-session-id", id);
    }
    setSessionId(id);
  }, []);

  // Get cart items
  const { data: cartItems = [], isLoading, refetch } = useQuery({
    queryKey: ["/api/cart", sessionId],
    queryFn: async () => {
      if (!sessionId) return [];
      const response = await fetch(`/api/cart/${sessionId}`);
      if (!response.ok) throw new Error("Failed to fetch cart");
      return response.json() as Promise<CartItemWithPainting[]>;
    },
    enabled: !!sessionId,
  });

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: async (paintingId: number) => {
      return apiRequest("POST", "/api/cart", {
        paintingId,
        sessionId,
        quantity: 1,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] });
    },
  });

  // Remove from cart mutation
  const removeFromCartMutation = useMutation({
    mutationFn: async (cartItemId: number) => {
      return apiRequest("DELETE", `/api/cart/${cartItemId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] });
    },
  });

  // Clear cart mutation
  const clearCartMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("DELETE", `/api/cart/session/${sessionId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] });
    },
  });

  // Calculate totals
  const cartTotal = cartItems.reduce((total, item) => {
    return total + (parseFloat(item.painting.price) * (item.quantity || 1));
  }, 0);

  const cartCount = cartItems.reduce((count, item) => {
    return count + (item.quantity || 1);
  }, 0);

  return {
    cartItems,
    cartTotal,
    cartCount,
    isLoading,
    addToCart: addToCartMutation.mutate,
    removeFromCart: removeFromCartMutation.mutate,
    clearCart: clearCartMutation.mutate,
    isAddingToCart: addToCartMutation.isPending,
    isRemovingFromCart: removeFromCartMutation.isPending,
    refetch,
  };
}
