# 🌉 edot-bridge

A modern, highly flexible, type-safe full-stack Next.js application utilizing Supabase, Prisma, and OpenAI.

---

## 🚀 Technologies

This application uses a modern web stack designed for speed, type safety, and scalability:

*   **Frontend & API**: Next.js 16 (App Router), React 19, Tailwind CSS v4, NextAuth.js
*   **Database**: Prisma v7, PostgreSQL (via Supabase), `@prisma/adapter-pg`
*   **AI Integration**: OpenAI SDK v6
*   **Core**: TypeScript, ESLint

---

## 📂 Project Structure

The project follows a standard Next.js App Router structure:

```
edot-bridge/
├── app/                  # App Router pages and API routes
│   ├── courses/          # Courses list and detail routes
│   ├── globals.css       # Tailwind CSS styles
│   ├── layout.tsx        # Root HTML layout (with AuthProvider)
│   └── page.tsx          # Home page
├── components/           # Reusable UI and layout components
│   ├── courses/          # Course specific components
│   └── ui/               # Global design system components (Button, Card)
├── hooks/                # Custom React hooks
├── lib/                  # Initialized API clients (Prisma, Supabase, OpenAI, Auth)
├── public/               # Static assets
├── types/                # TypeScript type declarations
├── prisma/               # Database schema
│   └── schema.prisma     # Prisma database model configuration
├── prisma.config.ts      # Prisma v7 configuration file
├── tsconfig.json         # TypeScript configuration
├── next.config.ts        # Next.js configuration
├── package.json          # Dependency packages
└── README.md             # Project documentation
```

---

## 🛠️ Getting Started

Follow the steps below to set up and run this project locally.

### 📋 Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v20+ recommended) installed.

### 1. Clone the repository & enter the folder
```bash
git clone https://github.com/kenenisabeyan/edot-bridge.git
cd edot-bridge
```

### 2. Configure Environment Variables
Copy the environment variables template and fill in your connection strings and API keys:

```bash
cp .env.example .env.local
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Generate Prisma Client
Generates the Prisma Client types locally:
```bash
npm run db:generate
```

### 5. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🎛️ Available Scripts

*   `npm run dev` - Starts the Next.js development server
*   `npm run build` - Compiles the production build
*   `npm run start` - Starts the compiled production server
*   `npm run lint` - Runs ESLint checks
*   `npm run db:generate` - Generates the Prisma Client
*   `npm run db:migrate` - Creates and applies migrations to your database
*   `npm run db:studio` - Launches Prisma Studio (local UI to view your data)

---

## 🔒 Environment Variable Reference

Here is a list of the variables you will need to define in your local `.env.local` file:

| Variable Name | Description |
| :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string (with PgBouncer if pooling) |
| `DIRECT_URL` | Direct PostgreSQL connection string (bypasses pooling) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project API URL endpoint |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase client anonymous API key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase administrative role key |
| `NEXTAUTH_URL` | Host URL for NextAuth (typically `http://localhost:3000`) |
| `NEXTAUTH_SECRET` | Secret key for JWT session encryption |
| `OPENAI_API_KEY` | OpenAI API integration authentication token |

---

## 📄 License

Private repository. All rights reserved.