# Kanbex

A modern, full-stack Kanban project management platform built with Next.js 15 and Express.js.

```
██╗  ██╗ █████╗ ███╗   ██╗██████╗ ███████╗██╗  ██╗
██║ ██╔╝██╔══██╗████╗  ██║██╔══██╗██╔════╝╚██╗██╔╝
█████╔╝ ███████║██╔██╗ ██║██████╔╝█████╗   ╚███╔╝ 
██╔═██╗ ██╔══██║██║╚██╗██║██╔══██╗██╔══╝   ██╔██╗ 
██║  ██╗██║  ██║██║ ╚████║██████╔╝███████╗██╔╝ ██╗
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝
```

## Features

- **Kanban Board** — Drag-and-drop task management with smooth animations
- **Real-time Collaboration** — Live presence indicators and instant updates via WebSocket
- **Multiple Views** — Board, List, and Grid view modes
- **Task Management** — Labels, priorities, due dates, assignees, and file attachments
- **Search & Filter** — Global search with advanced filtering options
- **Authentication** — Email/password and Google OAuth support
- **Dashboard & Reports** — Project analytics and activity tracking

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                          CLIENT (Browser)                            │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                    Next.js 15 (App Router)                   │    │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐ │    │
│  │  │  shadcn   │  │ TanStack  │  │  @dnd-kit │  │ Socket.io │ │    │
│  │  │    /ui    │  │   Query   │  │   (DnD)   │  │  Client   │ │    │
│  │  └───────────┘  └───────────┘  └───────────┘  └───────────┘ │    │
│  └─────────────────────────────────────────────────────────────┘    │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ HTTPS / WSS
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          SERVER (API)                                │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                     Express.js + TypeScript                  │    │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐ │    │
│  │  │ Passport  │  │    Zod    │  │  Prisma   │  │ Socket.io │ │    │
│  │  │  (Auth)   │  │ (Validate)│  │   (ORM)   │  │  Server   │ │    │
│  │  └───────────┘  └───────────┘  └───────────┘  └───────────┘ │    │
│  └─────────────────────────────────────────────────────────────┘    │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                           DATA LAYER                                 │
│    ┌─────────────┐      ┌─────────────┐      ┌─────────────┐        │
│    │ PostgreSQL  │      │    Redis    │      │ Cloudflare  │        │
│    │  (Neon)     │      │  (Upstash)  │      │     R2      │        │
│    │             │      │             │      │             │        │
│    │  Database   │      │  Sessions   │      │   Files     │        │
│    │  Storage    │      │  Presence   │      │  Storage    │        │
│    │             │      │   Cache     │      │             │        │
│    └─────────────┘      └─────────────┘      └─────────────┘        │
└─────────────────────────────────────────────────────────────────────┘
```

## Data Flow

### Task Drag & Drop
```
User Drags Task ──► Optimistic UI Update ──► API Request (Background)
                          │                         │
                          ▼                         ▼
                    Instant Visual            Success? ─► Done
                      Feedback                    │
                                           Failure? ─► Rollback + Error
```

### Real-time Presence
```
User Starts Editing
        │
        ▼
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│ Socket Emit   │────►│ Redis Store   │────►│ Broadcast to  │
│ editing:start │     │ (30s TTL)     │     │ Other Users   │
└───────────────┘     └───────────────┘     └───────────────┘
                                                    │
                                                    ▼
                                            "X is editing..."
```

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | Next.js 15, TypeScript, Tailwind CSS | React framework with App Router |
| UI Components | shadcn/ui, Framer Motion | Accessible components + animations |
| State Management | TanStack Query | Server state + caching |
| Drag & Drop | @dnd-kit | Smooth task reordering |
| Backend | Express.js, TypeScript | REST API + WebSocket server |
| Database | PostgreSQL via Prisma ORM | Primary data storage |
| Cache/Sessions | Redis | Presence state, caching |
| File Storage | Cloudflare R2 | Attachments (S3-compatible) |
| Authentication | Passport.js, JWT | Local + Google OAuth strategies |

## Project Structure

```
kanbex/
├── frontend/                    # Next.js 15 application
│   ├── src/
│   │   ├── app/                 # App Router pages
│   │   │   ├── (auth)/          # Login, Register, Callback
│   │   │   ├── (dashboard)/     # Protected routes
│   │   │   │   ├── dashboard/   # Overview
│   │   │   │   ├── projects/    # Project boards
│   │   │   │   ├── reports/     # Analytics
│   │   │   │   └── profile/     # User settings
│   │   │   └── page.tsx         # Landing page
│   │   ├── components/
│   │   │   ├── board/           # Kanban board components
│   │   │   ├── task/            # Task card & modal
│   │   │   ├── landing/         # Marketing pages
│   │   │   ├── ui/              # shadcn/ui components
│   │   │   └── ...
│   │   ├── hooks/               # Custom React hooks
│   │   ├── lib/                 # Utilities, API client
│   │   └── providers/           # Context providers
│   └── public/                  # Static assets
│
├── backend/                     # Express.js API
│   ├── src/
│   │   ├── config/              # Database, Redis, Passport
│   │   ├── controllers/         # Route handlers
│   │   ├── services/            # Business logic
│   │   ├── middleware/          # Auth, validation, rate limiting
│   │   ├── routes/              # API endpoints
│   │   ├── sockets/             # WebSocket handlers
│   │   └── validators/          # Zod schemas
│   └── prisma/
│       └── schema.prisma        # Database schema
│
├── docker-compose.yml           # Local development
├── render.yaml                  # Render deployment blueprint
└── .github/
    └── workflows/
        └── ci.yml               # CI pipeline (lint, test, build)
```

## Database Schema

```
┌──────────┐       ┌──────────┐       ┌──────────┐       ┌──────────┐
│   User   │◄──────│ Project  │◄──────│  Column  │◄──────│   Task   │
└──────────┘       └──────────┘       └──────────┘       └──────────┘
     │                  │                                      │
     │                  ▼                                      │
     │            ┌──────────┐                                 │
     │            │  Label   │◄────────────────────────────────┤
     │            └──────────┘                                 │
     │                                                         │
     └─────────────────────────────────────────────────────────┤
                                                               │
                      ┌──────────┐    ┌──────────┐    ┌────────▼───┐
                      │ Comment  │    │Attachment│    │  Activity  │
                      └──────────┘    └──────────┘    └────────────┘
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| **Auth** | | |
| POST | `/api/v1/auth/register` | Register new user |
| POST | `/api/v1/auth/login` | Login |
| POST | `/api/v1/auth/refresh` | Refresh token |
| GET | `/api/v1/auth/google` | Google OAuth |
| **Projects** | | |
| GET | `/api/v1/projects` | List projects |
| POST | `/api/v1/projects` | Create project |
| PATCH | `/api/v1/projects/:id` | Update project |
| DELETE | `/api/v1/projects/:id` | Delete project |
| **Tasks** | | |
| POST | `/api/v1/tasks` | Create task |
| PATCH | `/api/v1/tasks/:id` | Update task |
| PATCH | `/api/v1/tasks/:id/move` | Move task |
| DELETE | `/api/v1/tasks/:id` | Delete task |
| **Columns** | | |
| GET | `/api/v1/projects/:id/columns` | List columns |
| POST | `/api/v1/projects/:id/columns` | Create column |
| PATCH | `/api/v1/columns/:id/reorder` | Reorder columns |

## WebSocket Events

| Event | Direction | Payload |
|-------|-----------|---------|
| `editing:start` | Client → Server | `{ taskId, field }` |
| `editing:stop` | Client → Server | `{ taskId, field }` |
| `editing:active` | Server → Client | `{ taskId, field, user }` |
| `task:updated` | Server → Client | `{ task }` |
| `task:created` | Server → Client | `{ task }` |
| `task:moved` | Server → Client | `{ taskId, fromColumn, toColumn }` |

## Getting Started

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- npm 10+

### Local Development

```bash
# Clone the repository
git clone https://github.com/akash1723tripathi/Kanbex--A-Kanban-Board-Plaftorm.git
cd Kanbex--A-Kanban-Board-Plaftorm

# Install dependencies
npm install

# Start all services (PostgreSQL, Redis, Frontend, Backend)
docker-compose up -d --build

# Or run services individually
npm run dev:frontend    # http://localhost:3000
npm run dev:backend     # http://localhost:4000
```

### Environment Variables

Create `backend/.env`:

```env
# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://user:password@host/kanbex?sslmode=require

# Redis (Upstash or local)
REDIS_URL=redis://localhost:6379

# JWT — generate with: node -e "console.log(require('crypto').randomBytes(48).toString('base64'))"
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret

# CORS
CORS_ORIGIN=http://localhost:3000
FRONTEND_URL=http://localhost:3000
APP_URL=http://localhost:3000
API_URL=http://localhost:4000

# OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:4000/api/v1/auth/google/callback

# File Storage — Cloudflare R2 (optional)
R2_ACCOUNT_ID=your-account-id
R2_ACCESS_KEY_ID=your-access-key
R2_SECRET_ACCESS_KEY=your-secret-key
R2_BUCKET_NAME=kanbex-files
R2_PUBLIC_URL=your-public-url
```

Create `frontend/.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_ENABLE_OAUTH=true
```

### Database Commands

```bash
# Generate Prisma client
npm run db:generate

# Run migrations (dev)
npm run db:migrate

# Run migrations (production)
docker-compose exec backend npm run db:migrate:prod

# Open Prisma Studio
npm run db:studio
```

## CI/CD Pipeline

### CI (GitHub Actions)

Runs automatically on every Pull Request to `main`. Three jobs run in sequence:

```
Pull Request opened
        │
        ▼
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│    check      │────►│     test      │     │  build-test   │
│               │     │               │     │               │
│ lint          │     │ prisma migrate│     │ build backend │
│ type-check    │     │ vitest suite  │     │ Dockerfile    │
└───────────────┘     └───────────────┘     │ build frontend│
                      (real postgres +       │ Dockerfile    │
                       redis containers)     └───────────────┘
```

All three must pass before merging to `main`.

### CD (Render Auto-Deploy)

Render watches the `main` branch and automatically redeploys both services on every push. No manual steps required.

```
Merge PR to main
        │
        ▼
Render detects push
        │
        ├──► Rebuild kanbex-api   (backend Docker image)
        └──► Rebuild kanbex-frontend (frontend Docker image)
                │
                ▼
        Health check passes → Live
```

## Deployment

```
┌─────────────────────────────────────────────────────────────────────┐
│                       PRODUCTION STACK                               │
│                                                                      │
│    ┌───────────────────┐        ┌───────────────────────────────┐   │
│    │      Render       │        │       Managed Services        │   │
│    │                   │        │                               │   │
│    │  kanbex-frontend  │───────►│  Neon       (PostgreSQL)      │   │
│    │  kanbex-api       │        │  Upstash    (Redis)           │   │
│    │  (Docker, SG)     │        │  Cloudflare R2  (Files)       │   │
│    └───────────────────┘        └───────────────────────────────┘   │
│                                                                      │
│    Free Tier: $0/month                                               │
└─────────────────────────────────────────────────────────────────────┘
```

| Service | Purpose | Free Tier |
|---------|---------|-----------|
| Render | Frontend + Backend hosting | 750 hours/month |
| Neon | PostgreSQL | 0.5 GB storage |
| Upstash | Redis | 500K commands/month |
| Cloudflare R2 | File storage | 10 GB storage |

### Production Environment Variables (Render Dashboard)

**kanbex-api:**

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Neon pooled connection string |
| `REDIS_URL` | Upstash TCP connection string (`rediss://...`) |
| `JWT_SECRET` | Random 48-byte base64 string |
| `JWT_REFRESH_SECRET` | Different random 48-byte base64 string |
| `CORS_ORIGIN` | `https://kanbex-frontend.onrender.com` |
| `FRONTEND_URL` | `https://kanbex-frontend.onrender.com` |
| `APP_URL` | `https://kanbex-frontend.onrender.com` |
| `API_URL` | `https://kanbex-api.onrender.com` |
| `GOOGLE_CLIENT_ID` | From Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | From Google Cloud Console |
| `GOOGLE_CALLBACK_URL` | `https://kanbex-api.onrender.com/api/v1/auth/google/callback` |

**kanbex-frontend:**

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | `https://kanbex-api.onrender.com` |

## Scripts

```bash
npm run dev              # Start all services with Docker
npm run dev:frontend     # Run frontend only (http://localhost:3000)
npm run dev:backend      # Run backend only (http://localhost:4000)
npm run build            # Build frontend and backend
npm run lint             # Run ESLint across workspaces
npm run format           # Format with Prettier
npm run db:migrate       # Run database migrations (dev)
npm run db:generate      # Generate Prisma client
npm run db:studio        # Open Prisma Studio GUI
npm run test             # Run all tests
npm run test:backend     # Run backend tests only
npm run test:frontend    # Run frontend tests only
```

## Live Demo

- Frontend: [https://kanbex-frontend.onrender.com](https://kanbex-frontend.onrender.com)
- API: [https://kanbex-api.onrender.com](https://kanbex-api.onrender.com)

> Note: Render free tier services spin down after inactivity. First load may take 30–60 seconds to wake up.

## License

MIT License — see [LICENSE](LICENSE) for details.

---

Built with Next.js, Express.js, and PostgreSQL
