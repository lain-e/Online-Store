import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen py-20 bg-light-sage">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            About the Artist
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the story behind the paintings and the passion that drives Elena's artistic journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
              Elena's Journey
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Elena has been creating beautiful paintings for over 15 years, specializing in oil and watercolor techniques. Her work is inspired by nature, urban landscapes, and the interplay of light and shadow.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Each piece is carefully crafted in her studio, using high-quality materials to ensure longevity and vibrancy. From intimate watercolor florals to bold oil landscapes, every painting tells a unique story.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Elena's work has been featured in galleries across the country, and she continues to explore new techniques and subjects that challenge her artistic vision.
            </p>
            
            <div className="flex items-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-sage-green mb-2">200+</div>
                <div className="text-gray-600">Paintings Created</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-muted-purple mb-2">15</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-sage-green mb-2">50+</div>
                <div className="text-gray-600">Happy Collectors</div>
              </div>
            </div>
            
            <Link href="/contact">
              <Button className="bg-sage-green hover:bg-sage-green/90 text-white px-8 py-3 font-medium">
                Commission a Painting
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
              alt="Elena working in her studio" 
              className="rounded-lg shadow-lg"
            />
            <img 
              src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
              alt="Art supplies and palette" 
              className="rounded-lg shadow-lg"
            />
            <img 
              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
              alt="Art studio setup" 
              className="rounded-lg shadow-lg"
            />
            <img 
              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
              alt="Gallery display" 
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Artistic Philosophy */}
        <Card className="bg-white mb-12">
          <CardContent className="p-8">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 text-center">
              Artistic Philosophy
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-serif font-semibold text-gray-900 mb-4">
                  Oil Paintings
                </h4>
                <p className="text-gray-600">
                  Elena's oil paintings capture the richness and depth of her subjects through masterful use of color and texture. Each brushstroke is deliberate, building layers of meaning and emotion that draw viewers into the scene.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-serif font-semibold text-gray-900 mb-4">
                  Watercolors
                </h4>
                <p className="text-gray-600">
                  Her watercolor works showcase a delicate balance between control and spontaneity. The transparent medium allows for ethereal effects that capture the fleeting beauty of light and atmosphere.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Process */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-serif font-bold text-gray-900 mb-8">
            The Creative Process
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-sage-green mb-4">1</div>
                <h4 className="text-xl font-serif font-semibold text-gray-900 mb-3">
                  Inspiration
                </h4>
                <p className="text-gray-600">
                  Elena finds inspiration in everyday moments - the way light filters through leaves, the energy of a bustling street, or the quiet beauty of a still life.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-muted-purple mb-4">2</div>
                <h4 className="text-xl font-serif font-semibold text-gray-900 mb-3">
                  Sketching
                </h4>
                <p className="text-gray-600">
                  Each painting begins with careful observation and sketching. Elena studies her subjects intently, capturing not just their appearance but their essence.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-sage-green mb-4">3</div>
                <h4 className="text-xl font-serif font-semibold text-gray-900 mb-3">
                  Creation
                </h4>
                <p className="text-gray-600">
                  With careful attention to color, composition, and technique, Elena brings her vision to life on canvas or paper, creating works that resonate with viewers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white rounded-lg p-12">
          <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            Ready to Start Your Collection?
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            Explore Elena's gallery and find the perfect piece for your space
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/gallery">
              <Button size="lg" className="bg-sage-green hover:bg-sage-green/90 text-white px-8 py-3 font-medium">
                Browse Gallery
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="border-muted-purple text-muted-purple hover:bg-muted-purple hover:text-white px-8 py-3 font-medium">
                Commission Work
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
