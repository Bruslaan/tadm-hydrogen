# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Shopify Hydrogen storefront built with React Router (not Remix). Hydrogen is Shopify's stack for headless commerce that provides Shopify-specific React components and utilities for building e-commerce storefronts.

## Architecture

### Core Technologies
- **React Router v7** (NOT Remix - see import rules below)
- **Hydrogen** - Shopify's React framework for storefronts
- **Vite** - Build tool and dev server
- **Oxygen** - Shopify's deployment platform

### Key Directories
- `app/routes/` - File-based routing using React Router conventions
- `app/components/` - Reusable React components
- `app/lib/` - Utility functions, GraphQL fragments, context setup
- `app/graphql/` - GraphQL queries and mutations

### Data Loading Pattern
- Root loader (`app/root.jsx`) handles critical data (header) and deferred data (footer, cart)
- Uses Shopify's Storefront API via GraphQL
- Customer Account API integration for account features

## Critical Import Rules

**NEVER** use Remix imports. This project uses React Router v7:

```js
// CORRECT
import { useLoaderData, Link, Form } from 'react-router';

// INCORRECT
import { useLoaderData, Link, Form } from '@remix-run/react';
import { Link } from 'react-router-dom'; // Also incorrect
```

## Environment & Context

- Storefront context setup in `app/lib/context.js`
- Session management via `app/lib/session.js`
- GraphQL fragments centralized in `app/lib/fragments.js`
- Environment variables required: `SESSION_SECRET`, `PUBLIC_STORE_DOMAIN`, etc.

## GraphQL & Code Generation

- GraphQL schemas auto-generated: `storefrontapi.generated.d.ts`, `customer-accountapi.generated.d.ts`
- Run `npm run codegen` after GraphQL changes
- Shopify CLI handles codegen during dev/build

## Route Patterns

- File-based routing: `routes/products.$handle.jsx` → `/products/[handle]`
- Account routes: `account_.login.jsx` (pathless layout)
- API routes: `api.$version.[graphql.json].jsx`

## Component Conventions

- JSX files (not TSX)
- Shopify Hydrogen components and hooks
- React Router navigation components