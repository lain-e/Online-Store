import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PaintingCard } from "@/components/painting-card";
import { CATEGORIES } from "@/lib/constants";
import type { Painting } from "@shared/schema";

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data: paintings = [], isLoading } = useQuery({
    queryKey: ["/api/paintings/category", selectedCategory],
    queryFn: async () => {
      const url = selectedCategory === "All" 
        ? "/api/paintings"
        : `/api/paintings/category/${selectedCategory}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch paintings");
      return response.json() as Promise<Painting[]>;
    },
  });

  return (
    <div className="min-h-screen py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Complete Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our entire collection of original paintings
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`px-6 py-2 rounded-full transition-colors duration-300 ${
                selectedCategory === category
                  ? "bg-sage-green hover:bg-sage-green/90 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-light-sage"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Paintings Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse" />
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : paintings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No paintings found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paintings.map((painting) => (
              <PaintingCard key={painting.id} painting={painting} size="small" />
            ))}
          </div>
        )}

        {/* Load More Button (placeholder for pagination) */}
        {!isLoading && paintings.length > 0 && (
          <div className="text-center mt-12">
            <Button 
              variant="outline"
              size="lg"
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 font-medium"
              disabled
            >
              Load More Paintings
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
