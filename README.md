# NextJS Auth Starter

A complete authentication boilerplate for Next.js applications with user management features.

## Features

- 🔐 Complete authentication with NextAuth.js
- 👤 User registration with email and password
- 🔒 Protected routes with middleware
- 🧑‍💼 User profile management (CRUD)
- 🗄️ Prisma ORM with SQLite database
- 🎨 Clean, modern UI with Tailwind CSS

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Prisma](https://www.prisma.io/) - ORM
- [SQLite](https://www.sqlite.org/) - Database
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/latham91/nextjs-auth-starter.git
cd nextjs-auth-starter
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables

Copy the example env file and make the necessary changes:

```bash
cp .env.example .env
```

Update the `.env` file with your own values:

```
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

4. Run database migrations

```bash
npx prisma migrate dev
```

5. Start the development server

```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
├── prisma/               # Prisma schema and migrations
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API routes
│   │   ├── dashboard/    # Dashboard page
│   │   ├── login/        # Login page
│   │   ├── signup/       # Signup page
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   ├── components/       # React components
│   │   └── ui/           # UI components
│   ├── lib/              # Utilities and libraries
│   │   └── prisma.ts     # Prisma client
│   ├── providers/        # React providers
│   │   └── AuthProvider.tsx  # Auth provider
│   └── middleware.ts     # Next.js middleware for route protection
└── ...
```

## License

MIT
