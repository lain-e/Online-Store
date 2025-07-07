import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Heart, ShoppingCart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import type { Painting } from "@shared/schema";

export default function PaintingDetail() {
  const [, params] = useRoute("/painting/:id");
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart, isAddingToCart } = useCart();
  const { toast } = useToast();

  const { data: painting, isLoading, error } = useQuery({
    queryKey: ["/api/paintings", params?.id],
    queryFn: async () => {
      const response = await fetch(`/api/paintings/${params?.id}`);
      if (!response.ok) throw new Error("Failed to fetch painting");
      return response.json() as Promise<Painting>;
    },
    enabled: !!params?.id,
  });

  const handleAddToCart = () => {
    if (!painting) return;
    
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

  if (isLoading) {
    return (
      <div className="min-h-screen py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-gray-200 animate-pulse rounded-lg" />
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 animate-pulse rounded" />
              <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
              <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
              <div className="h-32 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !painting) {
    return (
      <div className="min-h-screen py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Painting not found</h1>
            <p className="text-gray-600 mb-8">The painting you're looking for doesn't exist.</p>
            <Link href="/gallery">
              <Button>Return to Gallery</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/gallery">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Gallery
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative">
            <img 
              src={painting.imageUrl} 
              alt={painting.title}
              className="w-full aspect-square object-cover rounded-lg shadow-lg"
            />
            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-white ${
                isLiked ? 'text-red-500' : 'text-gray-700'
              }`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
                {painting.title}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary" className="text-sm">
                  {painting.category}
                </Badge>
                {painting.isFeatured && (
                  <Badge className="bg-gold text-white">Featured</Badge>
                )}
                <Badge variant={painting.isAvailable ? "default" : "destructive"}>
                  {painting.isAvailable ? "Available" : "Sold Out"}
                </Badge>
              </div>
              <p className="text-xl text-gray-600 mb-2">{painting.medium}</p>
              <p className="text-lg text-gray-600">{painting.dimensions}</p>
            </div>

            {painting.description && (
              <div>
                <h3 className="text-xl font-serif font-semibold text-gray-900 mb-3">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {painting.description}
                </p>
              </div>
            )}

            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Price</p>
                  <p className="text-4xl font-bold text-gold">${painting.price}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1 bg-gold hover:bg-gold/90 text-white"
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || !painting.isAvailable}
                >
                  {isAddingToCart ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Adding to Cart...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      {painting.isAvailable ? 'Add to Cart' : 'Sold Out'}
                    </>
                  )}
                </Button>
                <Link href="/contact">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-gold text-gold hover:bg-gold hover:text-white"
                  >
                    Inquire About This Piece
                  </Button>
                </Link>
              </div>
            </div>

            {/* Additional Info */}
            <Card className="bg-cream">
              <CardContent className="p-6">
                <h3 className="text-lg font-serif font-semibold text-gray-900 mb-4">
                  Painting Details
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Medium</p>
                    <p className="font-medium">{painting.medium}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Dimensions</p>
                    <p className="font-medium">{painting.dimensions}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Category</p>
                    <p className="font-medium">{painting.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Availability</p>
                    <p className="font-medium">
                      {painting.isAvailable ? "In Stock" : "Sold Out"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
