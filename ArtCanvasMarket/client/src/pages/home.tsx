import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PaintingCard } from "@/components/painting-card";
import type { Painting } from "@shared/schema";

export default function Home() {
  const { data: featuredPaintings = [], isLoading } = useQuery({
    queryKey: ["/api/paintings/featured"],
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-gray-100"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            Original Paintings<br />
            <span className="text-sage-green">Crafted with Passion</span>
          </h2>
          <p className="text-xl md:text-2xl mb-8 font-light">
            Discover unique oil and watercolor paintings that bring beauty to your space
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/gallery">
              <Button 
                size="lg"
                className="bg-sage-green hover:bg-sage-green/90 text-white px-8 py-3 font-medium"
              >
                Explore Gallery
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-white text-white px-8 py-3 hover:bg-white hover:text-gray-900 font-medium"
              >
                Commission Work
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Paintings */}
      <section className="py-20 bg-light-sage">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Featured Paintings
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked masterpieces from our latest collection
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-64 bg-gray-200 animate-pulse" />
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <div className="h-6 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPaintings.map((painting: Painting) => (
                <PaintingCard key={painting.id} painting={painting} size="large" />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/gallery">
              <Button 
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 font-medium"
              >
                View All Paintings
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-serif font-bold text-gray-900 mb-6">
                About the Artist
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Elena has been creating beautiful paintings for over 15 years, specializing in oil and watercolor techniques. Her work is inspired by nature, urban landscapes, and the interplay of light and shadow.
              </p>
              <div className="flex items-center space-x-8 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-sage-green">200+</div>
                  <div className="text-gray-600">Paintings Created</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-muted-purple">15</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-sage-green">50+</div>
                  <div className="text-gray-600">Happy Collectors</div>
                </div>
              </div>
              <Link href="/about">
                <Button 
                  className="bg-sage-green hover:bg-sage-green/90 text-white px-8 py-3 font-medium"
                >
                  Learn More
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="Artist at work" 
                className="rounded-lg shadow-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="Art supplies" 
                className="rounded-lg shadow-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="Art studio" 
                className="rounded-lg shadow-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="Gallery display" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
