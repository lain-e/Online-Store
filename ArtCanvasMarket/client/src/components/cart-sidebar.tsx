import { X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cartItems, cartTotal, removeFromCart, clearCart } = useCart();
  const { toast } = useToast();

  const handleRemoveItem = (itemId: number) => {
    removeFromCart(itemId, {
      onSuccess: () => {
        toast({
          title: "Item removed",
          description: "The item has been removed from your cart.",
        });
      },
    });
  };

  const handleCheckout = () => {
    // Mock checkout process
    toast({
      title: "Checkout initiated",
      description: "This is a demo. In a real store, this would redirect to payment processing.",
    });
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 right-0 w-96 bg-white shadow-xl transform transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-serif font-semibold text-gray-900">
                Shopping Cart
              </h3>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-gray-700"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Your cart is empty</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={onClose}
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 pb-6 border-b border-gray-200">
                    <img 
                      src={item.painting.imageUrl} 
                      alt={item.painting.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        {item.painting.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {item.painting.medium}
                      </p>
                      <p className="text-gold font-bold">
                        ${item.painting.price}
                      </p>
                      {item.quantity && item.quantity > 1 && (
                        <p className="text-gray-500 text-sm">
                          Quantity: {item.quantity}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-500 hover:text-red-500"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-900">Total:</span>
                <span className="text-2xl font-bold text-gold">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <Button
                className="w-full bg-gold hover:bg-gold/90 text-white mb-3"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={onClose}
              >
                Continue Shopping
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
