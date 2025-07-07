import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: Array<{ href: string; label: string }>;
}

export function MobileMenu({ isOpen, onClose, navigationItems }: MobileMenuProps) {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Menu */}
      <div 
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-xl transform transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-serif font-semibold text-gray-900">Menu</h3>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <nav className="space-y-4">
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a 
                  className="block text-gray-700 hover:text-sage-green transition-colors duration-300 py-2 text-lg"
                  onClick={onClose}
                >
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
