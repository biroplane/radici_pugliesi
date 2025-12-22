# Radici Pugliesi - Project Structure

## Directory Organization

### Core Application (`/app/`)
The main application directory following Nuxt.js conventions:

- **`assets/`** - Static assets including CSS, fonts, and images
  - `css/` - Global styles (app.css, typography.css)
  - `fonts/` - Custom font files (nordminne.otf, nordminne.woff2)
  - `img/` - Application images and logos

- **`components/`** - Vue.js reusable components
  - `Product/` - Product-related components (Card, Item, Sort)
  - `Search/` - Search functionality components (Bar, Collections, Price, Availability)
  - Global components (AppHeader, AppFooter, Cart, etc.)

- **`pages/`** - File-based routing structure
  - `blog/` - Blog listing and individual post pages
  - `collections/` - Product collection pages
  - `products/` - Product listing and detail pages
  - Dynamic routes using `[handle].vue` and `[uid].vue`

- **`layouts/`** - Application layout templates
- **`stores/`** - Pinia state management (cart, customer, products, shop)
- **`composables/`** - Vue composables for reusable logic
- **`plugins/`** - Nuxt plugins for third-party integrations
- **`utils/`** - Utility functions and helpers

### Content Management (`/slices/`)
Prismic slice components for modular content:
- **Hero** - Landing page hero sections
- **ProductsGrid** - Product display grids
- **AlternateGrid** - Alternating content layouts
- **Newsletter** - Email subscription components
- **ContactForm** - Contact and inquiry forms
- **Gallery** - Image galleries and showcases
- **Reviews** - Customer review displays

### API & Server (`/server/`)
Server-side functionality:
- **`api/migrate/`** - Data migration endpoints for collections and products
- **`routes/`** - Custom server routes including sitemap generation

### Configuration & Types
- **`customtypes/`** - Prismic custom type definitions
- **`prismicio-types.d.ts`** - TypeScript definitions for Prismic content
- **`nuxt.config.ts`** - Main Nuxt configuration
- **`tsconfig.json`** - TypeScript configuration

### GraphQL Integration (`/app/graphql/`)
GraphQL queries for Shopify API:
- `products.gql` - Product queries
- `collections.gql` - Collection queries
- `cart.gql` - Shopping cart operations
- `checkout.gql` - Checkout processes

## Architectural Patterns

### Headless Commerce Architecture
- **Frontend**: Nuxt.js application for user interface
- **E-commerce Backend**: Shopify for product management and transactions
- **Content Backend**: Prismic CMS for content management
- **API Layer**: GraphQL for data fetching and mutations

### Component Architecture
- **Atomic Design**: Components organized by complexity and reusability
- **Slice-based Content**: Modular content blocks for flexible page composition
- **Layout System**: Consistent layouts across different page types

### State Management Pattern
- **Pinia Stores**: Centralized state management for cart, products, and user data
- **Persistent State**: Cart and user preferences persist across sessions
- **Reactive Updates**: Real-time updates for cart and product availability

### Routing Strategy
- **File-based Routing**: Automatic route generation from page structure
- **Dynamic Routes**: Handle-based routing for products and collections
- **Nested Routes**: Organized routing for blog and product categories

## Core Relationships

### Data Flow
1. **Content**: Prismic CMS → Nuxt pages → Vue components
2. **Products**: Shopify API → GraphQL → Pinia stores → Components
3. **User Actions**: Components → Stores → API calls → State updates

### Integration Points
- **Shopify-Prismic**: Product data enriched with CMS content
- **Cart-Checkout**: Seamless flow from cart management to Shopify checkout
- **SEO-Content**: Prismic content automatically generates SEO metadata