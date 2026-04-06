# Sufi Science Center — Developer Guide

A complete walkthrough for developers to understand, run, migrate, seed, deploy, and make this application fully standalone and dependency-free in production.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Prerequisites](#3-prerequisites)
4. [Local Development Setup](#4-local-development-setup)
5. [Environment Variables](#5-environment-variables)
6. [Database — Supabase Setup](#6-database--supabase-setup)
7. [Running Migrations & Seed Data](#7-running-migrations--seed-data)
8. [Application Structure](#8-application-structure)
9. [Frontend Architecture](#9-frontend-architecture)
10. [Backend & API Routes](#10-backend--api-routes)
11. [Authentication System](#11-authentication-system)
12. [Stripe Payments Integration](#12-stripe-payments-integration)
13. [Admin Panel](#13-admin-panel)
14. [User Portal](#14-user-portal)
15. [Making It Standalone — Self-Hosted Supabase](#15-making-it-standalone--self-hosted-supabase)
16. [Docker Deployment](#16-docker-deployment)
17. [Deploying to Production](#17-deploying-to-production)
18. [Going Live Checklist](#18-going-live-checklist)

---

## 1. Project Overview

The Sufi Science Center (SSC) platform is a full-stack knowledge and community portal for a consciousness research institute. It includes:

- A public-facing website with 140+ pages covering saints, lineages, research, dialogues, inner development, and more
- An admin CMS to manage content, applications, and users
- A user portal with session-based authentication, profiles, and activity tracking
- Stripe-powered donation processing
- A Supabase PostgreSQL database with 30+ tables, full-text search, and Row Level Security
- Seed data for saints, lineages, themes, assessments, practices, and more

---

## 2. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js | 13.5.1 |
| Language | TypeScript | 5.2.2 |
| UI Library | React | 18.2.0 |
| Styling | Tailwind CSS | 3.3.3 |
| Components | Radix UI + shadcn/ui | Latest |
| Icons | Lucide React | ^0.446.0 |
| Database | Supabase (PostgreSQL) | ^2.58.0 |
| Auth | Supabase Auth | Built-in |
| Payments | Stripe | ^20.3.1 |
| Forms | React Hook Form + Zod | ^7.53.0 / ^3.23.8 |
| Charts | Recharts | ^2.12.7 |
| Notifications | Sonner | ^1.5.0 |
| Deployment | Netlify (or Docker) | — |

---

## 3. Prerequisites

Before starting, install:

```bash
# Node.js 18 or higher (required)
node --version  # must be >= 18

# npm (comes with Node.js)
npm --version

# Optional: Supabase CLI (for local self-hosted setup)
npm install -g supabase

# Optional: Docker (for containerized deployment)
docker --version
docker compose version
```

You will also need accounts on:
- **Supabase** — https://supabase.com (free tier works for development)
- **Stripe** — https://stripe.com (test mode is free)

---

## 4. Local Development Setup

### Step 1 — Clone the repository

```bash
git clone <your-repo-url> sufi-science-center
cd sufi-science-center
```

### Step 2 — Install dependencies

```bash
npm install
```

### Step 3 — Configure environment variables

```bash
cp .env.example .env
# Then edit .env with your real keys (see Section 5)
```

### Step 4 — Run the development server

```bash
npm run dev
# App runs at: http://localhost:3000
```

### Step 5 — Build for production (verify it compiles)

```bash
npm run build
```

### Step 6 — Type-check (optional but recommended)

```bash
npm run typecheck
```

---

## 5. Environment Variables

Create a `.env` file in the project root. All variables are required for full functionality.

```env
# ─── Supabase ─────────────────────────────────────────────────────────────────
# Get from: https://supabase.com/dashboard → Your Project → Settings → API

NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ─── Stripe ───────────────────────────────────────────────────────────────────
# Get from: https://dashboard.stripe.com/apikeys
# Use sk_test_ and pk_test_ for development, sk_live_ and pk_live_ for production

STRIPE_SECRET_KEY=sk_test_your_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# ─── App ──────────────────────────────────────────────────────────────────────
# Your production domain — used by Stripe for redirect URLs

NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Where to find each key

| Variable | Location |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API → anon public |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Settings → API → service_role (keep secret!) |
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API Keys → Secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard → Developers → API Keys → Publishable key |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard → Developers → Webhooks → Signing secret |

> **Security:** Never commit `.env` to git. It is already in `.gitignore`.

---

## 6. Database — Supabase Setup

### Option A — Use Supabase Cloud (Recommended for quickstart)

1. Go to https://supabase.com and create a new project
2. Wait for the project to provision (~2 minutes)
3. Copy your Project URL, anon key, and service role key into `.env`
4. Run migrations (see Section 7)

### Option B — Self-Hosted Supabase (Standalone / No cloud dependency)

See Section 15 for the full self-hosted Docker setup.

---

## 7. Running Migrations & Seed Data

All database schema and seed data live in SQL migration files under:

```
supabase/migrations/
```

There are 50+ migration files totaling over 10,000 lines of SQL. They are numbered chronologically and must be applied in order.

### Method 1 — Supabase CLI (Recommended)

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link to your project (get project-ref from your Supabase dashboard URL)
supabase link --project-ref your-project-ref

# Apply all migrations (schema + seed data)
supabase db push
```

### Method 2 — Supabase Dashboard SQL Editor

If you prefer a GUI:

1. Open Supabase Dashboard → SQL Editor
2. Create a new query
3. Copy and paste each migration file content in order (oldest timestamp first)
4. Run each one

### Method 3 — psql direct (for self-hosted or advanced users)

```bash
# Get your database URL from Supabase Dashboard → Settings → Database → Connection string
DATABASE_URL="postgresql://postgres:your-password@db.your-project-ref.supabase.co:5432/postgres"

# Apply all migrations in order
for f in supabase/migrations/*.sql; do
  echo "Applying $f..."
  psql "$DATABASE_URL" -f "$f"
done
```

### What the migrations create

| Migration Group | What It Creates |
|----------------|----------------|
| `initial_schema` | Core tables: saints, lineages, themes, research_papers, dialogues, assessments, relationships |
| `support_engagement_tables` | donations, volunteer_applications, collaboration_proposals |
| `dialogue_engagement_formats` | dialogue_series, hard_talk_sessions, practices_profiles, inspiring_interviews |
| `media_architecture` | Media content tables |
| `seed_assessment_data` | Assessment questions and dimensions |
| `normalize_saint_metadata` | Regions, historical periods, geographic normalization |
| `inner_development_architecture` | Stages, stations, practices schema |
| `application_system` | Pathway and mentorship applications |
| `quran_commentary_tables` | Surah commentary and annotations |
| `portal_engagement_tables` | Portal sessions, profiles, activity logs |
| `membership_applications` | Membership tier applications |
| `conference_submission_system` | Conference abstract submissions |
| `phase1_rls_hardening` | Row Level Security policies for all tables |
| `seed_*` (multiple) | Inserts saints, lineages, themes, practices, dialogues, etc. |
| `portal_full_functionality_v3` | Full portal schema with reflections and progress tracking |

### Seed data included

- **Saints**: Prophet Muhammad, Hasan al-Basri, Rabia al-Adawiyya, Uways al-Qarani, and many more
- **Lineages**: Complete teacher-student chain hierarchy
- **Themes**: Taxonomy of spiritual, scientific, ethical, and interdisciplinary themes
- **Assessment questions**: Cognitive patterns, emotional intelligence, contemplative capacity
- **Hard inquiry sessions**: Sample critical dialogue sessions
- **Practices**: Sacred geometry, inner development practices with step-by-step instructions
- **Regions and historical periods**: Geographic and temporal taxonomy

---

## 8. Application Structure

```
sufi-science-center/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (metadata, global styles)
│   ├── page.tsx                  # Homepage
│   ├── globals.css               # Global CSS
│   ├── admin/                    # Admin panel (protected)
│   │   ├── login/                # Admin login
│   │   ├── cms/                  # Content management (saints, dialogues, research, conference)
│   │   ├── users/                # User management
│   │   ├── donations/            # Donation records
│   │   ├── membership/           # Membership applications
│   │   ├── mentorship/           # Mentorship applications
│   │   ├── pathway/              # Pathway applications
│   │   ├── volunteer/            # Volunteer applications
│   │   ├── collaboration/        # Collaboration proposals
│   │   ├── support/              # Support tickets
│   │   └── conference/           # Conference submissions
│   ├── portal/                   # User portal (session-based auth)
│   │   ├── page.tsx              # Portal dashboard
│   │   ├── account/              # Profile, security, donations, membership
│   │   └── support/              # Support ticket creation and tracking
│   ├── api/                      # Next.js API routes (backend)
│   │   ├── create-checkout-session/  # Stripe checkout
│   │   ├── donations/            # Direct donation recording
│   │   ├── webhooks/stripe/      # Stripe webhooks
│   │   ├── donation-status/      # Payment status check
│   │   ├── view-count/           # Content view tracking
│   │   └── admin/                # Admin session and users
│   ├── foundations/              # Sufi foundations content
│   ├── knowledge-systems/        # Knowledge architecture
│   ├── inner-development/        # Transformative practices
│   ├── dialogues/                # Discussion series and interviews
│   ├── research/                 # Academic publications
│   ├── media/                    # Audio/video content
│   ├── institute/                # Institutional information
│   ├── applied-civilization/     # Applied wisdom
│   ├── interfaith-coherence/     # Scripture commentary
│   ├── membership/               # Membership applications
│   ├── assessment/               # Self-assessment tools
│   ├── contribute/               # Contribution and conference
│   ├── support/                  # Donations and engagement
│   └── nextgen-sufi-seeker/      # Next-gen programs
├── components/                   # Reusable React components
│   ├── ui/                       # Base UI (shadcn/ui components)
│   ├── portal/                   # Portal-specific components
│   └── sacred-professions/       # Specialized visualization components
├── lib/                          # Utilities and data
│   ├── supabase.ts               # Supabase public client
│   ├── supabase-server.ts        # Supabase server client
│   ├── supabase-admin.ts         # Supabase admin client
│   ├── database.types.ts         # Generated TypeScript types
│   ├── heritage-data.ts          # Static heritage content data
│   ├── nextgen-disciplines.ts    # Next-gen discipline frameworks
│   ├── sacred-professions-data.ts # Sacred professions taxonomy
│   ├── qa-data.ts                # Q&A content
│   ├── professional-ethics.ts    # Ethics frameworks
│   └── utils.ts                  # Shared utilities
├── hooks/                        # Custom React hooks
│   ├── use-portal-session.ts     # Portal auth and session management
│   └── use-toast.ts              # Toast notifications
├── supabase/
│   └── migrations/               # 50+ SQL migration files
├── public/                       # Static assets (logos, images)
├── middleware.ts                  # Next.js middleware (admin route protection)
├── next.config.js                 # Next.js configuration
├── netlify.toml                   # Netlify deployment config
├── tailwind.config.ts             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
└── .env                          # Environment variables (not committed)
```

---

## 9. Frontend Architecture

### Component System

The UI is built on **shadcn/ui** — a collection of Radix UI primitives styled with Tailwind CSS. All base components are in `components/ui/`.

```bash
# Available base components
components/ui/
  accordion.tsx, alert.tsx, avatar.tsx, badge.tsx, button.tsx
  card.tsx, dialog.tsx, drawer.tsx, dropdown-menu.tsx
  form.tsx, input.tsx, label.tsx, progress.tsx
  select.tsx, separator.tsx, sheet.tsx, skeleton.tsx
  tabs.tsx, textarea.tsx, toast.tsx, tooltip.tsx
  # ... and more
```

### Styling Conventions

- All styling uses **Tailwind CSS utility classes**
- No CSS modules or styled-components
- Theme colors follow the Tailwind config in `tailwind.config.ts`
- Animations via `tailwindcss-animate`
- Dark/light mode via `next-themes`

### Data Flow

Most pages are **React Server Components** by default in Next.js 13 App Router. Pages that need interactivity use the `"use client"` directive.

```typescript
// Server component (default) — can use async/await directly
export default async function Page() {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase.from('saints').select('*');
  return <div>{/* render data */}</div>;
}

// Client component — needs useState, useEffect, event handlers
"use client";
export default function InteractiveComponent() {
  const [state, setState] = useState(null);
  return <div>{/* interactive UI */}</div>;
}
```

### Key Data Libraries

Several pages use large static data files (not database-backed) for performance:

| File | Size | Content |
|------|------|---------|
| `lib/heritage-data.ts` | ~40KB | Intellectual heritage content |
| `lib/nextgen-disciplines.ts` | ~50KB | Professional discipline frameworks |
| `lib/sacred-professions-data.ts` | ~51KB | Sacred professions taxonomy |
| `lib/qa-data.ts` | ~21KB | Questions and understanding content |
| `lib/professional-ethics.ts` | ~21KB | Ethics frameworks |

---

## 10. Backend & API Routes

All API routes are in `app/api/` and run as Next.js serverless functions.

### Route Reference

#### POST `/api/create-checkout-session`
Creates a Stripe Checkout session for donations.

```typescript
// Request body
{
  amount: number,           // in cents (e.g., 5000 = $50)
  frequency: 'one_time' | 'monthly' | 'annual',
  donorName?: string,
  donorEmail?: string,
  message?: string
}

// Response
{
  url: string  // Stripe hosted checkout URL
}
```

#### POST `/api/donations`
Records a donation directly (without Stripe — for cash/in-person donations).

```typescript
// Request body
{
  amount: number,
  currency: string,         // e.g., "USD"
  frequency: string,
  donor_name?: string,
  donor_email?: string,
  message?: string
}
```

#### POST `/api/webhooks/stripe`
Stripe webhook endpoint. Handles `checkout.session.completed` events to update donation records.

- **Must be registered** in Stripe Dashboard → Developers → Webhooks
- Endpoint URL: `https://your-domain.com/api/webhooks/stripe`
- Events to listen for: `checkout.session.completed`

#### GET `/api/donation-status?session_id=cs_xxx`
Checks the status of a Stripe payment.

#### POST `/api/view-count`
Increments view count for content items.

```typescript
// Request body
{ entity_type: string, entity_id: string }
```

#### POST/DELETE `/api/admin/session`
Admin login and logout.

```typescript
// POST — Login
{ email: string, password: string }

// Response
{ success: boolean, user: object }
```

#### GET `/api/admin/users`
Returns paginated list of Supabase auth users (admin only).

---

## 11. Authentication System

The application has two separate auth systems:

### 11.1 Admin Authentication

Admins log in at `/admin/login` with email and password.

**Default admin credentials:**
```
Email:    admin@sufisciencecenter.org
Password: SSCAdmin2026!
```

> **Important:** Change this password immediately in production via Supabase Auth dashboard.

**How it works:**
1. Admin submits credentials to `POST /api/admin/session`
2. Server calls `supabase.auth.signInWithPassword()`
3. JWT tokens stored as HttpOnly cookies: `sb-access-token`, `sb-refresh-token`
4. `middleware.ts` validates the token on every `/admin/*` request
5. Invalid or expired tokens redirect to `/admin/login`

**Changing admin password:**
```
Supabase Dashboard → Authentication → Users → Find admin user → Reset password
```

Or via SQL:
```sql
-- Run in Supabase SQL Editor
UPDATE auth.users
SET encrypted_password = crypt('your-new-password', gen_salt('bf'))
WHERE email = 'admin@sufisciencecenter.org';
```

### 11.2 Portal User Authentication

Portal users authenticate via a session token system (not Supabase Auth).

**How it works:**
1. User visits `/portal`
2. A UUID session token is generated and stored in `localStorage` as `ssc_portal_session_token`
3. Token is associated with a `portal_sessions` record in the database
4. Optional: user can link an email for persistent identity
5. The `usePortalSession()` hook manages all session state

**The `usePortalSession` hook provides:**
```typescript
const {
  sessionToken,      // UUID string
  profile,           // User profile data
  membership,        // Membership tier and status
  activity,          // Recent activity log
  isLoading,
  updateProfile,     // Function to update profile
  recordActivity     // Function to log activity
} = usePortalSession();
```

---

## 12. Stripe Payments Integration

### Setup Steps

1. Create a Stripe account at https://stripe.com
2. Get your API keys (test mode for development, live mode for production)
3. Add keys to `.env`
4. Register the webhook endpoint in Stripe Dashboard

### Webhook Setup

1. Go to Stripe Dashboard → Developers → Webhooks → Add endpoint
2. URL: `https://your-domain.com/api/webhooks/stripe`
3. Select event: `checkout.session.completed`
4. Copy the signing secret → paste as `STRIPE_WEBHOOK_SECRET` in `.env`

### Testing Webhooks Locally

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Copy the webhook signing secret printed by the CLI into your .env
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Donation Flow

```
User clicks "Donate" → Frontend calls /api/create-checkout-session
→ Stripe Checkout page → User pays → Stripe sends webhook
→ /api/webhooks/stripe updates donations table → User sees success page
```

### Supported Donation Modes

| Type | Stripe Mode | Description |
|------|------------|-------------|
| One-time | `payment` | Single charge |
| Monthly | `subscription` | Recurring monthly charge |
| Annual | `subscription` | Recurring yearly charge |

---

## 13. Admin Panel

Access the admin panel at `/admin/login`.

### Admin Sections

| Section | Route | Purpose |
|---------|-------|---------|
| Dashboard | `/admin` | Overview metrics |
| CMS - Saints | `/admin/cms/saints` | Manage saint records |
| CMS - Dialogues | `/admin/cms/dialogues` | Manage dialogue series |
| CMS - Research | `/admin/cms/research` | Manage research papers |
| CMS - Conference | `/admin/cms/conference` | Manage conference content |
| Users | `/admin/users` | View registered users |
| Donations | `/admin/donations` | View donation records |
| Membership | `/admin/membership` | Review membership applications |
| Mentorship | `/admin/mentorship` | Review mentorship applications |
| Pathway | `/admin/pathway` | Review pathway applications |
| Volunteer | `/admin/volunteer` | Review volunteer applications |
| Collaboration | `/admin/collaboration` | Review collaboration proposals |
| Support Tickets | `/admin/support` | Manage support requests |
| Conference | `/admin/conference` | Manage conference submissions |

---

## 14. User Portal

The portal is at `/portal` and provides a dashboard for engaged users.

### Portal Features

| Feature | Route | Description |
|---------|-------|-------------|
| Dashboard | `/portal` | Activity overview, metrics, progress |
| Profile | `/portal/account/profile` | Edit name, bio, location, interests |
| Security | `/portal/account/security` | Manage session tokens |
| Donations | `/portal/account/donations` | View donation history |
| Membership | `/portal/account/membership` | View and manage membership tier |
| Contact | `/portal/account/contact` | Contact preferences |
| Support Tickets | `/portal/support/tickets` | View and manage support requests |
| Create Ticket | `/portal/support/create` | Submit new support request |

---

## 15. Making It Standalone — Self-Hosted Supabase

To run the entire application without any cloud dependencies, self-host Supabase using Docker.

### Step 1 — Clone Supabase Docker setup

```bash
git clone --depth 1 https://github.com/supabase/supabase
cd supabase/docker
cp .env.example .env
```

### Step 2 — Configure Supabase environment

Edit `supabase/docker/.env`:

```env
POSTGRES_PASSWORD=your-super-secret-postgres-password
JWT_SECRET=your-super-secret-jwt-secret-at-least-32-characters
ANON_KEY=your-anon-key-here
SERVICE_ROLE_KEY=your-service-role-key-here
DASHBOARD_USERNAME=supabase
DASHBOARD_PASSWORD=your-dashboard-password
```

> Generate JWT keys: https://supabase.com/docs/guides/self-hosting#generate-api-keys

### Step 3 — Start Supabase locally

```bash
cd supabase/docker
docker compose up -d
```

Supabase will be available at:
- API: `http://localhost:8000`
- Studio: `http://localhost:3001`
- Database: `postgresql://postgres:password@localhost:5432/postgres`

### Step 4 — Update your app `.env`

```env
NEXT_PUBLIC_SUPABASE_URL=http://localhost:8000
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-self-hosted-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-self-hosted-service-role-key
```

### Step 5 — Apply migrations to self-hosted Supabase

```bash
DATABASE_URL="postgresql://postgres:your-password@localhost:5432/postgres"

for f in supabase/migrations/*.sql; do
  echo "Applying $f..."
  psql "$DATABASE_URL" -f "$f"
done
```

---

## 16. Docker Deployment

The application does not include a Dockerfile yet. Here is a complete production-ready setup.

### Step 1 — Create the Dockerfile

Create `Dockerfile` in the project root:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set build-time environment variables
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_GIT_HASH=docker

ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_GIT_HASH=$NEXT_PUBLIC_GIT_HASH

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
```

> **Note:** For the standalone output to work, add `output: 'standalone'` to `next.config.js`.

### Step 2 — Update next.config.js for standalone output

```javascript
const nextConfig = {
  output: 'standalone',   // Add this line
  // ... rest of config
};
```

### Step 3 — Create docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      args:
        NEXT_PUBLIC_SUPABASE_URL: ${NEXT_PUBLIC_SUPABASE_URL}
        NEXT_PUBLIC_SUPABASE_ANON_KEY: ${NEXT_PUBLIC_SUPABASE_ANON_KEY}
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: ${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
        NEXT_PUBLIC_APP_URL: ${NEXT_PUBLIC_APP_URL}
    ports:
      - "3000:3000"
    environment:
      - SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}
      - STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
      - STRIPE_WEBHOOK_SECRET=${STRIPE_WEBHOOK_SECRET}
      - NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
      - NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
    restart: unless-stopped
```

### Step 4 — Build and run the Docker image

```bash
# Build the image
docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key \
  --build-arg NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_... \
  --build-arg NEXT_PUBLIC_APP_URL=https://your-domain.com \
  -t sufi-science-center:latest .

# Run the container
docker run -p 3000:3000 \
  -e SUPABASE_SERVICE_ROLE_KEY=your-service-role-key \
  -e STRIPE_SECRET_KEY=sk_live_... \
  -e STRIPE_WEBHOOK_SECRET=whsec_... \
  sufi-science-center:latest

# Or use docker compose
docker compose up -d
```

### Step 5 — Full self-hosted stack (app + database)

For a completely standalone setup with self-hosted Supabase:

```yaml
# docker-compose.full.yml
version: '3.8'

services:
  # Next.js Application
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_SUPABASE_URL=http://supabase-kong:8000
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=${ANON_KEY}
      - SUPABASE_SERVICE_ROLE_KEY=${SERVICE_ROLE_KEY}
      - STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
      - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
      - STRIPE_WEBHOOK_SECRET=${STRIPE_WEBHOOK_SECRET}
      - NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
    depends_on:
      - supabase-kong
    restart: unless-stopped

  # Supabase services (abbreviated — use full supabase docker-compose)
  # See: https://github.com/supabase/supabase/tree/master/docker
```

---

## 17. Deploying to Production

### Option A — Netlify (Current Setup)

The project includes a `netlify.toml` configuration.

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Login
netlify login

# 3. Link to your Netlify site
netlify link

# 4. Set environment variables in Netlify Dashboard
#    Site Settings → Environment Variables → Add all .env variables

# 5. Deploy
netlify deploy --prod
```

Or connect your git repository to Netlify for automatic deployments on push.

### Option B — Vercel

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy
vercel

# 3. Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add STRIPE_SECRET_KEY production
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production
vercel env add STRIPE_WEBHOOK_SECRET production
vercel env add NEXT_PUBLIC_APP_URL production

# 4. Redeploy
vercel --prod
```

### Option C — VPS / Cloud Server (Ubuntu)

```bash
# 1. Set up server with Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. Install PM2 process manager
npm install -g pm2

# 3. Clone repository and install dependencies
git clone <your-repo> /var/www/ssc
cd /var/www/ssc
npm install

# 4. Create .env with production values
nano .env

# 5. Build
npm run build

# 6. Start with PM2
pm2 start npm --name "ssc" -- start
pm2 save
pm2 startup

# 7. Set up Nginx as reverse proxy
sudo apt-get install nginx
```

Nginx configuration (`/etc/nginx/sites-available/ssc`):

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/ssc /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Install SSL with Let's Encrypt
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### Option D — Docker on Cloud

```bash
# Build image
docker build -t sufi-science-center:latest .

# Push to Docker Hub or registry
docker tag sufi-science-center:latest yourdockerhub/sufi-science-center:latest
docker push yourdockerhub/sufi-science-center:latest

# On your server
docker pull yourdockerhub/sufi-science-center:latest
docker run -d -p 3000:3000 --env-file .env yourdockerhub/sufi-science-center:latest
```

---

## 18. Going Live Checklist

### Security

- [ ] Change admin password from `SSCAdmin2026!` to a strong unique password
- [ ] Rotate all API keys from test to live (Stripe: `sk_live_`, `pk_live_`)
- [ ] Set `SUPABASE_SERVICE_ROLE_KEY` as a server-only secret (never expose to frontend)
- [ ] Enable HTTPS/SSL on your domain
- [ ] Review all Supabase RLS policies (already configured, but verify)
- [ ] Set `NODE_ENV=production` in your deployment environment

### Stripe

- [ ] Switch from test keys (`sk_test_`, `pk_test_`) to live keys (`sk_live_`, `pk_live_`)
- [ ] Register webhook endpoint for production domain in Stripe Dashboard
- [ ] Test a real payment end-to-end
- [ ] Set up Stripe email receipts

### Database

- [ ] Confirm all migrations have been applied (50+ files)
- [ ] Verify seed data is present (check saints table has records)
- [ ] Enable Supabase Point-in-Time Recovery for backups (paid plan)
- [ ] Set database password to something strong and unique

### Application

- [ ] Set `NEXT_PUBLIC_APP_URL` to your production domain
- [ ] Test admin login works
- [ ] Test portal session creation works
- [ ] Test donation flow end-to-end
- [ ] Verify all pages load without errors (`npm run build` passes)
- [ ] Test on mobile devices

### DNS & Domain

- [ ] Point domain DNS to your hosting provider
- [ ] Configure HTTPS certificate
- [ ] Set up `www` redirect to apex domain (or vice versa)
- [ ] Verify `NEXT_PUBLIC_APP_URL` matches your actual domain exactly

### Monitoring (Optional but Recommended)

- [ ] Set up error logging (Sentry, LogRocket, or similar)
- [ ] Set up uptime monitoring (UptimeRobot — free tier)
- [ ] Configure Supabase email alerts for database issues

---

## Quick Reference

### Common Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript type checking
```

### Key URLs (Development)

```
App:              http://localhost:3000
Admin Login:      http://localhost:3000/admin/login
Admin Dashboard:  http://localhost:3000/admin
User Portal:      http://localhost:3000/portal
Supabase Studio:  https://supabase.com/dashboard (cloud) or http://localhost:3001 (self-hosted)
```

### Admin Credentials (Change in Production!)

```
Email:    admin@sufisciencecenter.org
Password: SSCAdmin2026!
```

### Database Connection

```bash
# Via Supabase CLI
supabase db push    # Apply migrations
supabase db reset   # Reset and re-apply all migrations

# Via psql
psql "postgresql://postgres:password@db.your-ref.supabase.co:5432/postgres"
```

---

*This guide covers everything needed to take this application from source code to a fully running production system — standalone, dependency-free from cloud lock-in, and ready to serve users.*
