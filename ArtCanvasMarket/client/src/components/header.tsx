import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { CartSidebar } from "./cart-sidebar";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  const [location] = useLocation();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/">
                <h1 className="text-2xl font-serif font-bold text-gray-900 cursor-pointer">
                  Elena's Gallery
                </h1>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <a className={`transition-colors duration-300 ${
                    location === item.href 
                      ? 'text-sage-green' 
                      : 'text-gray-700 hover:text-sage-green'
                  }`}>
                    {item.label}
                  </a>
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex text-gray-700 hover:text-sage-green"
              >
                <Search className="h-5 w-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="relative text-gray-700 hover:text-sage-green"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-sage-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-gray-700 hover:text-sage-green"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </nav>
      </header>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        navigationItems={navigationItems}
      />
    </>
  );
}
