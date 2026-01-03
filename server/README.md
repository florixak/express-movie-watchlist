# Express Movie Watchlist

A RESTful API for managing a movie watchlist, built with Express.js, PostgreSQL, Prisma ORM, and TypeScript.

## Features

- User authentication (JWT-based)
- Add, update, and delete movies from a personal watchlist
- Movie and user management
- Input validation with Zod
- PostgreSQL database with Prisma ORM
- Dockerized for easy development

## Project Structure

```
.
├── prisma/
│   ├── [`prisma/schema.prisma`](prisma/schema.prisma )
│   ├── [`prisma/seed.ts`](prisma/seed.ts )
│   └── migrations/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── utils/
│   └── validators/
├── .env
├── [`docker-compose.yml`](docker-compose.yml )
├── [`package.json`](package.json )
├── [`tsconfig.json`](tsconfig.json )
└── [`README.md`](README.md )
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm or npm
- Docker (for local PostgreSQL)

### Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/florixak/express-movie-watchlist.git
   cd express-movie-watchlist
   ```

2. **Install dependencies:**

   ```sh
   pnpm install
   # or
   npm install
   ```

3. **Configure environment variables:**

   - Copy `.env.example` to `.env` and fill in the required values.

4. **Start PostgreSQL with Docker:**

   ```sh
   docker-compose up -d
   ```

5. **Run database migrations:**

   ```sh
   pnpm run prisma:migrate
   ```

6. **Seed the database (optional):**

   ```sh
   pnpm run seed:movies
   ```

7. **Start the development server:**
   ```sh
   pnpm run dev
   ```

## API Endpoints

### Auth

- `POST /auth/register` — Register a new user
- `POST /auth/login` — Login and receive a JWT

### Watchlist

- `GET /watchlist` — Get user's watchlist (requires auth)
- `POST /watchlist` — Add a movie to watchlist (requires auth)
- `PUT /watchlist/:movieId` — Update a watchlist item (requires auth)
- `DELETE /watchlist/:movieId` — Remove a movie from watchlist (requires auth)

## Technologies Used

- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Zod](https://zod.dev/) (validation)
- [Docker](https://www.docker.com/)

## Scripts

- `pnpm run dev` — Start development server with hot reload
- `pnpm run build` — Compile TypeScript to JavaScript
- `pnpm run start` — Start production server
- `pnpm run prisma:migrate` — Run Prisma migrations
- `pnpm run prisma:generate` — Generate Prisma client
- `pnpm run prisma:studio` — Open Prisma Studio
- `pnpm run seed:movies` — Seed the database with movies

## License

MIT

---

**Author:** [Ondřej Pták](https://github.com/florixak)

## Credits

This project was created by following a tutorial by PedroTech. Check out his content for more great tutorials!
