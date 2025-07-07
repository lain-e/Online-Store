# Elena's Gallery - Art E-commerce Application

## Overview

This is a full-stack web application for an art gallery showcasing and selling original paintings. The application features a modern React frontend with a Node.js/Express backend, designed to display artwork, handle shopping cart functionality, and manage customer inquiries.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful API endpoints
- **Session Management**: In-memory storage with session-based cart functionality

### Key Design Decisions

**Frontend Architecture Choice**: React with TypeScript was chosen for type safety and component reusability. Wouter provides lightweight routing without the complexity of React Router.

**State Management**: TanStack Query handles server state, caching, and synchronization, eliminating the need for additional state management libraries like Redux.

**UI Framework**: Radix UI + shadcn/ui provides accessible, customizable components with a consistent design system using Tailwind CSS.

**Backend Simplicity**: Express.js provides a minimal, flexible server setup suitable for the gallery's straightforward API needs.

## Key Components

### Frontend Components
- **Header**: Navigation with cart functionality and mobile menu
- **PaintingCard**: Reusable component for displaying artwork with cart integration
- **CartSidebar**: Slide-out shopping cart with item management
- **Form Components**: Contact form with validation using React Hook Form and Zod

### Backend Components
- **Routes**: RESTful API endpoints for paintings, cart, and contact messages
- **Storage**: Abstracted storage interface with in-memory implementation
- **Database Schema**: Drizzle ORM schema for paintings, cart items, and contact messages

### Data Models
- **Paintings**: Title, description, medium, dimensions, price, images, categories
- **Cart Items**: Session-based cart with painting references and quantities
- **Contact Messages**: Customer inquiries with name, email, subject, and message

## Data Flow

1. **Gallery Browsing**: Frontend fetches paintings from `/api/paintings` endpoints
2. **Cart Management**: Session-based cart operations via `/api/cart` endpoints
3. **Contact Form**: Customer messages submitted to `/api/contact` endpoint
4. **State Synchronization**: TanStack Query handles caching and real-time updates

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form
- **UI Components**: Radix UI primitives, Lucide React icons
- **Styling**: Tailwind CSS, class-variance-authority for component variants
- **State Management**: TanStack Query for server state
- **Form Validation**: Zod for schema validation
- **Date Handling**: date-fns for date formatting

### Backend Dependencies
- **Server**: Express.js for HTTP server
- **Database**: Drizzle ORM with PostgreSQL dialect
- **Database Driver**: Neon Database serverless driver
- **Development**: tsx for TypeScript execution, esbuild for production builds

### Development Tools
- **Build Tools**: Vite for frontend, esbuild for backend
- **TypeScript**: Full TypeScript support across the stack
- **Code Quality**: ESLint configuration, TypeScript strict mode

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations managed via `drizzle-kit`

### Environment Setup
- **Development**: `npm run dev` - tsx runs server with hot reload
- **Production**: `npm run build` followed by `npm start`
- **Database**: PostgreSQL connection via `DATABASE_URL` environment variable

### Hosting Considerations
- **Frontend**: Static files served from Express server
- **Backend**: Node.js server with Express
- **Database**: Neon Database (serverless PostgreSQL)
- **Sessions**: In-memory storage (suitable for single-instance deployment)

## Changelog
- July 06, 2025. Initial setup
- July 06, 2025. Updated color scheme from gold/cream to muted green and purple palette

## User Preferences

Preferred communication style: Simple, everyday language.
Color scheme: Muted green and purple tones for a sophisticated, calming aesthetic.