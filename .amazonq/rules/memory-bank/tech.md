# Radici Pugliesi - Technology Stack

## Core Technologies

### Frontend Framework
- **Nuxt.js 4.1.2** - Vue.js meta-framework for server-side rendering and static generation
- **Vue.js 3.5.22** - Progressive JavaScript framework for building user interfaces
- **TypeScript 5.9.3** - Typed superset of JavaScript for enhanced development experience

### Styling & UI
- **Tailwind CSS 4.1.14** - Utility-first CSS framework for rapid UI development
- **@nuxt/ui 4.0.1** - Pre-built UI components for Nuxt applications
- **Custom Fonts** - Google Fonts integration (Roboto, Playfair Display, Libre Baskerville, Style Script)

### State Management & Data
- **Pinia 3.0.3** - Vue.js state management library
- **pinia-plugin-persistedstate 4.7.1** - Persistent state across browser sessions
- **nuxt-graphql-client 0.2.46** - GraphQL client for API communication

### Content Management & E-commerce
- **Prismic CMS** - Headless CMS for content management
  - `@prismicio/client 7.20.1` - Prismic JavaScript client
  - `@nuxtjs/prismic 4.1.0` - Nuxt integration for Prismic
- **Shopify Storefront API** - E-commerce backend integration
- **Slice Machine** - Visual editor for Prismic content slices

### Development Tools
- **ESLint 9.37.0** - Code linting and formatting
- **@antfu/eslint-config 5.4.1** - Opinionated ESLint configuration
- **Vite** - Fast build tool and development server

### Additional Integrations
- **@nuxt/image 1.11.0** - Image optimization and responsive images
- **@vueuse/nuxt 13.9.0** - Collection of Vue composition utilities
- **@stefanobartoletti/nuxt-social-share 2.2.1** - Social media sharing functionality
- **vue3-carousel 0.17.0** - Carousel component for product galleries
- **vue3-lottie 3.3.1** - Lottie animations integration

## Environment Configuration

### Required Environment Variables
```bash
# Shopify Configuration
SHOPIFY_PUBLIC_TOKEN=<storefront_access_token>
SHOPIFY_PRIVATE_TOKEN=<admin_api_token>
SHOPIFY_STOREURL=<store_url>
SHOPIFY_CLIENT_ID=<app_client_id>
SHOPIFY_DOMAIN=<graphql_endpoint>

# Prismic Configuration
PRISMIC_WRITE_TOKEN=<write_access_token>
PRISMIC_ACCESS_TOKEN=<read_access_token>
```

### Development Commands

#### Primary Commands
- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Build application for production
- **`npm run generate`** - Generate static site
- **`npm run preview`** - Preview production build locally

#### Additional Commands
- **`npm run postinstall`** - Prepare Nuxt environment after installation
- **`npm run slicemachine`** - Start Slice Machine for content editing

### Build Configuration

#### Nuxt Configuration Highlights
- **Compatibility Date**: 2025-07-15 (latest Nuxt features)
- **SSR/SPA**: Server-side rendering enabled by default
- **Image Domains**: Configured for Shopify CDN (`*.myshopify.com`)
- **Router**: Smooth scroll behavior enabled
- **Development**: Console/debugger statements removed in production

#### Vite Configuration
- **Tailwind CSS Plugin**: Integrated via Vite plugin system
- **ESBuild**: Optimized JavaScript/TypeScript compilation
- **Development Mode**: Console statements preserved for debugging

### API Integration

#### GraphQL Configuration
- **Default Client**: Shopify Storefront API
- **Authentication**: X-Shopify-Storefront-Access-Token header
- **Token Retention**: Enabled for persistent authentication

#### Prismic Configuration
- **Repository**: Configured via slicemachine.config.json
- **Routes**: Custom routing for different content types
- **Client Routes**: Homepage, blog, collections, products, and pages

### Performance Optimizations
- **Image Optimization**: Automatic image resizing and format conversion
- **Font Loading**: Optimized Google Fonts loading
- **Code Splitting**: Automatic code splitting for optimal bundle sizes
- **Tree Shaking**: Unused code elimination in production builds