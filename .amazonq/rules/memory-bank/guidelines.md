# Radici Pugliesi - Development Guidelines

## Code Quality Standards

### TypeScript Usage
- **Strict Type Safety**: All files use TypeScript with comprehensive type definitions
- **Generated Types**: Prismic types are auto-generated and should never be manually edited
- **Interface Definitions**: Complex data structures use interfaces for better maintainability
- **Type Imports**: Use `import type` for type-only imports to optimize bundle size

### Code Formatting Patterns
- **Consistent Indentation**: 2-space indentation throughout the codebase
- **Semicolon Usage**: Semicolons are omitted following modern JavaScript conventions
- **Quote Style**: Single quotes preferred for strings
- **Object Destructuring**: Extensive use of destructuring for cleaner code
- **Arrow Functions**: Preferred over function declarations for consistency

### Naming Conventions
- **camelCase**: Variables, functions, and methods use camelCase
- **PascalCase**: Components, interfaces, and types use PascalCase
- **UPPER_SNAKE_CASE**: Constants and environment variables
- **kebab-case**: File names and CSS classes
- **Descriptive Names**: Variables and functions have clear, descriptive names

### Documentation Standards
- **JSDoc Comments**: Comprehensive documentation for complex functions
- **Inline Comments**: Strategic comments explaining business logic
- **Type Annotations**: Explicit type annotations for better code clarity
- **API Documentation**: GraphQL queries and mutations are well-documented

## Structural Conventions

### File Organization
- **Feature-based Structure**: Components organized by functionality (Product/, Search/)
- **Index Files**: Use index.ts files for clean imports and exports
- **Separation of Concerns**: Clear separation between components, stores, and utilities
- **Consistent Naming**: File names match their primary export

### Component Architecture
- **Composition API**: Vue 3 Composition API used throughout
- **Single Responsibility**: Each component has a focused, single purpose
- **Props Validation**: TypeScript interfaces for prop validation
- **Reactive References**: Consistent use of ref() and reactive() for state management

### State Management Patterns
- **Pinia Stores**: Centralized state management with Pinia
- **Persistent State**: Strategic use of persistence for cart and user preferences
- **Computed Properties**: Derived state using computed properties
- **Store Composition**: Stores are composable and focused on specific domains

## Semantic Patterns

### API Integration Patterns
- **GraphQL First**: All external API calls use GraphQL
- **Error Handling**: Comprehensive try-catch blocks with meaningful error messages
- **Loading States**: Consistent loading state management across components
- **Data Transformation**: Clean data transformation patterns for API responses

### Common Implementation Patterns

#### Store Pattern
```typescript
export const useStoreStore = defineStore('storeName', () => {
  const state = ref(initialValue)
  const computed = computed(() => derivedValue)
  
  const action = async () => {
    try {
      // API call or logic
    } catch (error) {
      console.error('Error message', error)
    }
  }
  
  return { state, computed, action }
}, {
  persist: { storage: piniaPluginPersistedstate.localStorage() }
})
```

#### Composable Pattern
```typescript
export function useFeature() {
  const state = ref()
  
  const method = () => {
    // Implementation
  }
  
  return { state, method }
}
```

### Frequently Used Code Idioms

#### Conditional Rendering
- Use `v-if` for conditional rendering with clear boolean expressions
- Ternary operators for simple conditional values
- Optional chaining (`?.`) for safe property access

#### Array Operations
- `map()`, `filter()`, and `reduce()` for data transformation
- Spread operator for array/object manipulation
- Destructuring for clean parameter handling

#### Async Operations
- `async/await` pattern consistently used over Promises
- Error boundaries with try-catch blocks
- Loading states managed with reactive references

### Popular Annotations and Patterns

#### Console Logging
- Styled console logs for debugging: `console.log('%cMessage', 'styles', data)`
- Color-coded logs for different types of information
- Conditional logging based on environment

#### Environment Handling
- `import.meta.client` for client-side only code
- `process.env` for environment variables
- Conditional logic based on development/production modes

#### GraphQL Integration
- Consistent naming: `Gql` prefix for GraphQL operations
- Destructuring of GraphQL responses
- Error handling for GraphQL operations

## Best Practices

### Performance Optimization
- **Lazy Loading**: Components and routes are lazy-loaded where appropriate
- **Image Optimization**: Use Nuxt Image module for responsive images
- **Bundle Optimization**: Strategic imports and code splitting
- **Caching**: Appropriate use of computed properties and memoization

### Security Practices
- **Environment Variables**: Sensitive data stored in environment variables
- **Input Validation**: Client-side validation with server-side verification
- **HTTPS**: All external API calls use secure protocols
- **Token Management**: Secure handling of authentication tokens

### Accessibility Standards
- **Semantic HTML**: Proper use of semantic HTML elements
- **ARIA Labels**: Appropriate ARIA attributes for screen readers
- **Keyboard Navigation**: Keyboard-accessible interactive elements
- **Color Contrast**: Sufficient color contrast for readability

### Error Handling
- **Graceful Degradation**: Fallbacks for failed API calls
- **User Feedback**: Clear error messages for users
- **Logging**: Comprehensive error logging for debugging
- **Recovery**: Automatic retry mechanisms where appropriate

## Development Workflow

### Code Review Standards
- **Type Safety**: All code must pass TypeScript compilation
- **Linting**: ESLint rules must be followed
- **Testing**: Components should be testable and maintainable
- **Documentation**: Complex logic must be documented

### Git Practices
- **Conventional Commits**: Use conventional commit messages
- **Feature Branches**: Develop features in separate branches
- **Code Reviews**: All changes require code review
- **Clean History**: Maintain clean commit history