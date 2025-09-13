# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Package Manager
This project uses **pnpm** as the package manager.

### Development Commands
- `pnpm dev` - Start development server with hot reloading
- `pnpm build` - Build the application for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Run ESLint with auto-fix
- `pnpm test` - Run all tests (integration + e2e)
- `pnpm test:int` - Run integration tests with Vitest
- `pnpm test:e2e` - Run end-to-end tests with Playwright

### Payload-specific Commands
- `pnpm payload` - Access Payload CLI
- `pnpm generate:types` - Generate TypeScript types from Payload config
- `pnpm generate:importmap` - Generate import map for admin panel

## Architecture Overview

This is a **Payload CMS** website template built with **Next.js App Router**. The architecture follows a full-stack pattern where Payload CMS provides the backend/admin interface and Next.js handles the frontend rendering.

### Key Architecture Patterns

**Dual App Structure**: The project uses Next.js with dual app directories:
- `src/app/(frontend)/` - Public-facing website pages
- `src/app/(payload)/` - Payload admin panel integration

**Block-Based Content System**: Content is built using reusable blocks defined in `src/blocks/`:
- ArchiveBlock, Banner, CallToAction, Code, Content, Form, MediaBlock, RelatedPosts
- Blocks are rendered via `src/blocks/RenderBlocks.tsx`

**Collection-Based Data**: Data is organized into Payload collections:
- `Pages` - Static pages with layout builder
- `Posts` - Blog posts and articles
- `Media` - File uploads and assets
- `Categories` - Content taxonomy
- `Users` - Authentication and user management

**Layout Builder System**: Pages and posts use a flexible layout builder that combines multiple blocks to create dynamic page layouts.

### Database
- **MongoDB** via Mongoose adapter (configurable to PostgreSQL)
- Connection string set via `DATABASE_URI` environment variable

### Key Configuration Files
- `src/payload.config.ts` - Main Payload CMS configuration
- `next.config.js` - Next.js configuration with Payload integration
- Collections defined in `src/collections/`
- Global configs in `src/Header/config.ts` and `src/Footer/config.ts`

### Environment Setup
Copy `.env.example` to `.env` and configure:
- `DATABASE_URI` - Database connection string
- `PAYLOAD_SECRET` - JWT encryption secret
- `NEXT_PUBLIC_SERVER_URL` - Public server URL
- `CRON_SECRET` - Cron job authentication
- `PREVIEW_SECRET` - Draft preview validation

### TypeScript & Code Quality
- Full TypeScript support with strict configuration
- ESLint with Next.js config for code quality
- Prettier for code formatting (configured in VS Code settings)
- Format on save enabled for all supported file types

### Testing
- **Vitest** for integration tests (tests run in `tests/int/`)
- **Playwright** for e2e tests (tests run in `tests/e2e/`)
- Tests use separate environment file (`test.env`)

### Key Features
- **Live Preview** - Real-time preview of content changes
- **Draft System** - Content versioning with draft/published states
- **SEO Plugin** - Built-in SEO management
- **Form Builder** - Dynamic form creation
- **Search Plugin** - Full-text search capabilities
- **Redirects Plugin** - URL redirect management
- **Admin Bar** - Frontend editing interface for authenticated users