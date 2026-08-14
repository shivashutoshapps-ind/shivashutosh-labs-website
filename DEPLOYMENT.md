# Shivashutosh Labs — Deployment Configuration

This document outlines the verified production configuration for deploying the Shivashutosh Labs website to a VPS.

## Project Details
- **Project Name:** shivashutosh-labs-website
- **Framework:** Next.js 16.3.0 (App Router)
- **Required Node.js Version:** 18.17.0 or higher (Standard Next.js requirement)
- **Deployment Mode:** Standard Next.js Node Server
  - *Why:* The `next.config.mjs` utilizes dynamic security headers (`headers()`), which are incompatible with static export. Standard Node deployment preserves all existing dynamic routes, sitemaps, and server-side configurations.

## Commands
- **Install Dependencies:** `npm install`
- **Production Build:** `npm run build`
- **Production Start:** `npm run start`

## Environment Variables
The application relies on the following environment variables (configured in `.env.production`):
- `NEXT_PUBLIC_SITE_URL` = `https://shivashutoshlabs.com`

*Note: Ensure `.env.local` remains on development machines and is never committed to source control. The `.gitignore` file correctly excludes `.env*`.*

## Network Configuration
- **Production Domain:** `https://shivashutoshlabs.com`
- **Expected Application Port:** `3000` *(Default Next.js production port. Use a reverse proxy like Nginx or Apache to route traffic from port 80/443 to this internal port).*

## Important Deployment Notes
1. Run `npm run build` to generate the `.next` production build folder before starting the server.
2. The server must be kept alive using a process manager (e.g., `pm2 start npm --name "slabs" -- run start`).
3. Ensure no `.in` or old domain (e.g., kaamketools) canonical references exist. All metadata correctly inherits from `NEXT_PUBLIC_SITE_URL`.
