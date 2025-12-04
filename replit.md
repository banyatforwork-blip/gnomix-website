# Gnomix Linux Website

## Overview

This is a marketing website for Gnomix, an Ubuntu-based Linux distribution that provides a pure, stock GNOME desktop experience without Canonical's modifications, Snap packages, or telemetry. The site features a modern glassmorphism design with animated sections showcasing features, download options, gallery, testimonials, community links, and FAQs.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tools**
- **React 18** with TypeScript for the UI layer
- **Vite** as the build tool and development server with HMR (Hot Module Replacement)
- **Wouter** for client-side routing (lightweight alternative to React Router)
- **TanStack Query** (React Query) for server state management and API data fetching

**UI Component System**
- **shadcn/ui** component library built on Radix UI primitives
- **Tailwind CSS** for utility-first styling with custom theme configuration
- **Framer Motion** for animations and transitions throughout the site
- **Glassmorphism design system** with backdrop blur effects, semi-transparent backgrounds, and gradient accents

**Design Approach**
The application uses a glassmorphism-first design inspired by modern tech sites (Apple, Vercel, Linear). Key design elements include:
- Frosted glass effects with `backdrop-blur` utilities
- Dark theme by default with CSS custom properties
- Inter font for UI and JetBrains Mono for code
- Responsive grid layouts with mobile-first breakpoints
- Custom color system based on HSL values for easy theming

### Backend Architecture

**Server Framework**
- **Express.js** running on Node.js for the HTTP server
- **TypeScript** for type safety across the entire stack
- Development mode uses Vite middleware for SSR-like capabilities
- Production mode serves pre-built static files from `dist/public`

**API Design**
RESTful API with `/api` prefix for all endpoints:
- `GET /api/stats` - Retrieve site statistics (downloads, community members, etc.)
- `POST /api/stats/download` - Increment download counter
- `GET /api/downloads` - List all available downloads/releases
- `GET /api/downloads/latest` - Get the latest download information

**Data Layer**
Currently uses **in-memory storage** (`MemStorage` class) with initialized mock data for:
- Download statistics (total, weekly, monthly counts)
- Release information (versions, checksums, download URLs)
- FAQ entries
- Feature descriptions
- Testimonials
- System requirements

The storage interface (`IStorage`) is designed to be swapped with a database implementation (Drizzle ORM is configured for PostgreSQL via `@neondatabase/serverless`).

### State Management

**Client-Side State**
- TanStack Query manages all server state with automatic caching, background refetching, and optimistic updates
- Local React state (`useState`, `useRef`) for UI interactions like modals, menus, and animations
- No global state management library - component state is sufficient for this use case

**Query Configuration**
- Infinite stale time (data doesn't auto-refetch unless invalidated)
- No refetch on window focus
- Manual cache invalidation after mutations (e.g., tracking downloads)

### Build System

**Development**
- `npm run dev` starts the Express server with Vite middleware
- Hot module replacement for instant feedback
- TypeScript compilation on-the-fly without emitting files

**Production**
- `npm run build` executes a custom build script (`script/build.ts`)
- Client built with Vite, output to `dist/public`
- Server built with esbuild, bundled to `dist/index.cjs`
- Selective bundling: common dependencies are bundled to reduce cold start times, while others remain external

**Type Safety**
- Shared schema definitions in `shared/schema.ts` using Zod for runtime validation
- TypeScript path aliases for clean imports (`@/`, `@shared/`, `@assets/`)

## External Dependencies

### Database & ORM
- **Drizzle ORM** configured for PostgreSQL databases
- **@neondatabase/serverless** for Neon database connections (not currently in use, but configured)
- Schema defined in `shared/schema.ts` with Zod validators

### UI Libraries
- **@radix-ui/** - Comprehensive set of headless, accessible UI primitives (accordion, dialog, dropdown, tooltip, etc.)
- **shadcn/ui** - Pre-built components using Radix UI with Tailwind styling
- **Framer Motion** - Animation library for page transitions, scroll animations, and interactive elements
- **Embla Carousel** - Carousel/slider component for gallery and testimonials
- **Lucide React** - Icon library
- **React Icons** - Additional icons (specifically Discord icon)

### Styling
- **Tailwind CSS** with PostCSS and Autoprefixer
- **class-variance-authority** - Type-safe variant API for component styling
- **clsx** & **tailwind-merge** - Utility for conditional class merging

### Form Management
- **React Hook Form** with **@hookform/resolvers** for form validation
- **Zod** for schema validation

### Utilities
- **date-fns** - Date manipulation and formatting
- **nanoid** - ID generation

### Development Tools
- **Vite plugins** from Replit for runtime error overlays, cartographer, and dev banners
- **tsx** - TypeScript execution for build scripts and development server
- **esbuild** - Fast JavaScript bundler for server-side code

### External Services
The site links to external platforms but doesn't integrate their APIs directly:
- **SourceForge** - Download hosting platform
- **GitHub** - Source code repository
- **Discord** - Community server

All download URLs, GitHub links, and Discord invites are hardcoded in the mock data or components.