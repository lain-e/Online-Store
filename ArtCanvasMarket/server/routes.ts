import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCartItemSchema, insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all paintings
  app.get("/api/paintings", async (req, res) => {
    try {
      const paintings = await storage.getAllPaintings();
      res.json(paintings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch paintings" });
    }
  });

  // Get featured paintings
  app.get("/api/paintings/featured", async (req, res) => {
    try {
      const paintings = await storage.getFeaturedPaintings();
      res.json(paintings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured paintings" });
    }
  });

  // Get painting by ID
  app.get("/api/paintings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const painting = await storage.getPaintingById(id);
      if (!painting) {
        return res.status(404).json({ message: "Painting not found" });
      }
      res.json(painting);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch painting" });
    }
  });

  // Get paintings by category
  app.get("/api/paintings/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const paintings = await storage.getPaintingsByCategory(category);
      res.json(paintings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch paintings by category" });
    }
  });

  // Get cart items
  app.get("/api/cart/:sessionId", async (req, res) => {
    try {
      const sessionId = req.params.sessionId;
      const cartItems = await storage.getCartItems(sessionId);
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart items" });
    }
  });

  // Add to cart
  app.post("/api/cart", async (req, res) => {
    try {
      const validatedData = insertCartItemSchema.parse(req.body);
      const cartItem = await storage.addToCart(validatedData);
      res.json(cartItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid cart item data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to add item to cart" });
    }
  });

  // Remove from cart
  app.delete("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.removeFromCart(id);
      res.json({ message: "Item removed from cart" });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove item from cart" });
    }
  });

  // Clear cart
  app.delete("/api/cart/session/:sessionId", async (req, res) => {
    try {
      const sessionId = req.params.sessionId;
      await storage.clearCart(sessionId);
      res.json({ message: "Cart cleared" });
    } catch (error) {
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid contact form data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
