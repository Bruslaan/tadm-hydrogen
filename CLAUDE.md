# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Shopify Hydrogen storefront built with React Router, TypeScript, and Tailwind CSS. It's a headless commerce solution that combines Shopify's GraphQL APIs with modern web technologies.

## Development Commands

- `npm run dev` - Start development server with GraphQL codegen
- `npm run build` - Build for production with GraphQL codegen
- `npm run preview` - Preview production build locally  
- `npm run lint` - Run ESLint linter
- `npm run typecheck` - Run TypeScript type checking
- `npm run codegen` - Generate GraphQL types from Shopify APIs

## Architecture Overview

### Core Technologies
- **Hydrogen**: Shopify's React-based framework for headless commerce
- **React Router 7**: Full-stack web framework for routing and data loading
- **Oxygen**: Shopify's edge runtime for deployment
- **Vite**: Build tool and development server
- **TypeScript**: Type safety throughout the codebase
- **Tailwind CSS**: Utility-first CSS framework

### Key Directories
- `app/routes/` - File-based routing with locale support `($locale).*.tsx`
- `app/components/` - Reusable React components
- `app/lib/` - Utility functions and core logic
- `app/graphql/` - GraphQL queries and mutations
- `app/styles/` - CSS and Tailwind configuration

### Internationalization
- Locale-based routing with `($locale)` prefix in route files
- `getLocaleFromRequest()` in `app/lib/i18n.ts` extracts locale from URL
- Supports format: `/en-us/products/example`

### GraphQL Integration
- Storefront API queries in `storefrontapi.generated.d.ts`
- Customer Account API queries in `customer-accountapi.generated.d.ts`
- Fragment definitions in `app/lib/fragments.ts`
- Always run `npm run codegen` after GraphQL schema changes

### Session Management
- Custom session implementation in `app/lib/session.ts`
- Requires `SESSION_SECRET` environment variable
- Cart state managed through Hydrogen context

### Path Aliases
- `~/*` maps to `app/*` (configured in `tsconfig.json`)
- Use `~/components/Header` instead of `../../components/Header`

## Important Files
- `app/root.tsx` - Root layout component
- `app/entry.server.tsx` - Server-side entry point
- `app/entry.client.tsx` - Client-side entry point
- `app/lib/context.ts` - Application context setup
- `server.ts` - Oxygen server configuration
- `vite.config.ts` - Vite configuration with Hydrogen plugins

## Development Notes
- Always run linting and type checking before commits
- Use the `~/*` path alias for imports within the app directory
- GraphQL codegen runs automatically with dev/build commands
- Routes follow Shopify's commerce patterns (products, collections, cart, account)
- Customer account features require proper domain setup as per Shopify docs