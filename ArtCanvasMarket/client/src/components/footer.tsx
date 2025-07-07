import { Link } from "wouter";
import { Instagram, Facebook, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-serif font-bold mb-4">Elena's Gallery</h3>
            <p className="text-gray-300 mb-4">
              Original oil and watercolor paintings created with passion and precision. 
              Each piece is a unique expression of artistic vision.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-sage-green transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-sage-green transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-sage-green transition-colors duration-300">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-gray-300 hover:text-sage-green transition-colors duration-300">
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/gallery">
                  <a className="text-gray-300 hover:text-sage-green transition-colors duration-300">
                    Gallery
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-gray-300 hover:text-sage-green transition-colors duration-300">
                    About
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-300 hover:text-sage-green transition-colors duration-300">
                    Contact
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-sage-green transition-colors duration-300">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-sage-green transition-colors duration-300">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-sage-green transition-colors duration-300">
                  Care Instructions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-sage-green transition-colors duration-300">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Elena's Gallery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
