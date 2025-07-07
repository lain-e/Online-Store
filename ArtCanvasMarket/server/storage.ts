import { users, paintings, cartItems, contactMessages, type User, type InsertUser, type Painting, type InsertPainting, type CartItem, type InsertCartItem, type ContactMessage, type InsertContactMessage } from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Painting methods
  getAllPaintings(): Promise<Painting[]>;
  getPaintingById(id: number): Promise<Painting | undefined>;
  getFeaturedPaintings(): Promise<Painting[]>;
  getPaintingsByCategory(category: string): Promise<Painting[]>;
  createPainting(painting: InsertPainting): Promise<Painting>;
  
  // Cart methods
  getCartItems(sessionId: string): Promise<(CartItem & { painting: Painting })[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  removeFromCart(id: number): Promise<void>;
  clearCart(sessionId: string): Promise<void>;
  
  // Contact methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private paintings: Map<number, Painting>;
  private cartItems: Map<number, CartItem>;
  private contactMessages: Map<number, ContactMessage>;
  private currentUserId: number;
  private currentPaintingId: number;
  private currentCartItemId: number;
  private currentContactMessageId: number;

  constructor() {
    this.users = new Map();
    this.paintings = new Map();
    this.cartItems = new Map();
    this.contactMessages = new Map();
    this.currentUserId = 1;
    this.currentPaintingId = 1;
    this.currentCartItemId = 1;
    this.currentContactMessageId = 1;
    
    // Initialize with sample paintings
    this.initializePaintings();
  }

  private initializePaintings() {
    const samplePaintings: InsertPainting[] = [
      {
        title: "Rolling Hills at Sunset",
        description: "A breathtaking landscape capturing the golden hour over rolling countryside hills.",
        medium: "Oil on Canvas",
        dimensions: "24\" x 18\"",
        price: "850.00",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Oil Paintings",
        isFeatured: true,
        isAvailable: true,
      },
      {
        title: "Garden Dreams",
        description: "Delicate watercolor florals in soft, dreamy pastels.",
        medium: "Watercolor on Paper",
        dimensions: "16\" x 12\"",
        price: "450.00",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Watercolors",
        isFeatured: true,
        isAvailable: true,
      },
      {
        title: "Urban Energy",
        description: "Bold abstract expression of city life with dynamic brushstrokes.",
        medium: "Oil on Canvas",
        dimensions: "30\" x 24\"",
        price: "1200.00",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Abstracts",
        isFeatured: true,
        isAvailable: true,
      },
      {
        title: "Mountain Serenity",
        description: "Peaceful watercolor landscape with mountains and lake.",
        medium: "Watercolor on Paper",
        dimensions: "12\" x 16\"",
        price: "380.00",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        category: "Landscapes",
        isFeatured: false,
        isAvailable: true,
      },
      {
        title: "City Life",
        description: "Vibrant oil painting of bustling city street scene.",
        medium: "Oil on Canvas",
        dimensions: "20\" x 16\"",
        price: "720.00",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        category: "Oil Paintings",
        isFeatured: false,
        isAvailable: true,
      },
      {
        title: "Summer Harvest",
        description: "Delicate watercolor still life with fruits and flowers.",
        medium: "Watercolor on Paper",
        dimensions: "14\" x 11\"",
        price: "320.00",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        category: "Watercolors",
        isFeatured: false,
        isAvailable: true,
      },
      {
        title: "Ocean Storm",
        description: "Dramatic oil painting of stormy seascape with powerful waves.",
        medium: "Oil on Canvas",
        dimensions: "28\" x 20\"",
        price: "950.00",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        category: "Landscapes",
        isFeatured: false,
        isAvailable: true,
      },
    ];

    for (const painting of samplePaintings) {
      this.createPainting(painting);
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Painting methods
  async getAllPaintings(): Promise<Painting[]> {
    return Array.from(this.paintings.values());
  }

  async getPaintingById(id: number): Promise<Painting | undefined> {
    return this.paintings.get(id);
  }

  async getFeaturedPaintings(): Promise<Painting[]> {
    return Array.from(this.paintings.values()).filter(p => p.isFeatured);
  }

  async getPaintingsByCategory(category: string): Promise<Painting[]> {
    if (category === "All") {
      return this.getAllPaintings();
    }
    return Array.from(this.paintings.values()).filter(p => p.category === category);
  }

  async createPainting(insertPainting: InsertPainting): Promise<Painting> {
    const id = this.currentPaintingId++;
    const painting: Painting = { 
      ...insertPainting, 
      id,
      createdAt: new Date(),
    };
    this.paintings.set(id, painting);
    return painting;
  }

  // Cart methods
  async getCartItems(sessionId: string): Promise<(CartItem & { painting: Painting })[]> {
    const items = Array.from(this.cartItems.values()).filter(item => item.sessionId === sessionId);
    return items.map(item => ({
      ...item,
      painting: this.paintings.get(item.paintingId!)!,
    }));
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists in cart
    const existingItem = Array.from(this.cartItems.values()).find(
      item => item.paintingId === insertCartItem.paintingId && item.sessionId === insertCartItem.sessionId
    );

    if (existingItem) {
      // Update quantity if item exists
      existingItem.quantity = (existingItem.quantity || 1) + (insertCartItem.quantity || 1);
      this.cartItems.set(existingItem.id, existingItem);
      return existingItem;
    }

    const id = this.currentCartItemId++;
    const cartItem: CartItem = {
      ...insertCartItem,
      id,
      createdAt: new Date(),
    };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async removeFromCart(id: number): Promise<void> {
    this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<void> {
    const itemsToRemove = Array.from(this.cartItems.values()).filter(item => item.sessionId === sessionId);
    for (const item of itemsToRemove) {
      this.cartItems.delete(item.id);
    }
  }

  // Contact methods
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentContactMessageId++;
    const message: ContactMessage = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.contactMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
