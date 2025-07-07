import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import type { Painting } from "@shared/schema";

interface PaintingCardProps {
  painting: Painting;
  size?: "small" | "medium" | "large";
}

export function PaintingCard({ painting, size = "medium" }: PaintingCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart, isAddingToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(painting.id, {
      onSuccess: () => {
        toast({
          title: "Added to cart!",
          description: `${painting.title} has been added to your cart.`,
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to add item to cart. Please try again.",
          variant: "destructive",
        });
      },
    });
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const cardSizes = {
    small: "h-48",
    medium: "h-64",
    large: "h-80",
  };

  const titleSizes = {
    small: "text-lg",
    medium: "text-xl",
    large: "text-2xl",
  };

  const priceSizes = {
    small: "text-lg",
    medium: "text-2xl",
    large: "text-3xl",
  };

  return (
    <Link href={`/painting/${painting.id}`}>
      <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer">
        <div className="relative overflow-hidden">
          <img 
            src={painting.imageUrl} 
            alt={painting.title}
            className={`w-full ${cardSizes[size]} object-cover group-hover:scale-105 transition-transform duration-300`}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
          
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-4 right-4 bg-white text-gray-700 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-gold ${
              isLiked ? 'text-red-500' : ''
            }`}
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
        </div>
        
        <CardContent className="p-6">
          <h4 className={`${titleSizes[size]} font-serif font-semibold text-gray-900 mb-2`}>
            {painting.title}
          </h4>
          <p className="text-gray-600 mb-2">{painting.medium}</p>
          <p className="text-gray-600 mb-4">{painting.dimensions}</p>
          
          <div className="flex justify-between items-center">
            <span className={`${priceSizes[size]} font-bold text-gold`}>
              ${painting.price}
            </span>
            <Button
              className="bg-gray-900 text-white hover:bg-gray-800"
              onClick={handleAddToCart}
              disabled={isAddingToCart || !painting.isAvailable}
            >
              {isAddingToCart ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Adding...
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {painting.isAvailable ? 'Add to Cart' : 'Sold Out'}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
