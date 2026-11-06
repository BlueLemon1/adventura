# Adventura

A modern D&D 5e character, inventory, spell and campaign manager.

## Stack
- React + TypeScript + Vite
- Tailwind CSS v4
- React Router, TanStack Query
- Supabase Auth + PostgreSQL
- Zod, i18next, Lucide

## Development
```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and configure the Supabase URL and publishable key.

## Deployment
GitHub Actions builds and deploys the static frontend to GitHub Pages. Supabase provides authentication, persistence and authorization.

## Security
Never commit secrets. The Supabase publishable key is intended for browser use; protect all user data with PostgreSQL Row Level Security (RLS). Never expose a Supabase secret/service-role key in this repository.
