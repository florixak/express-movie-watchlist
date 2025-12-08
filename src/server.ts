import express from "express";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";

import movieRouter from "./routes/movieRoutes.js";
import authRouter from "./routes/authRoutes.js";

config();
await connectDB();

const app = express();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/movie", movieRouter);
app.use("/auth", authRouter);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (err: unknown) => {
  console.error(
    `Unhandled Rejection: ${err instanceof Error ? err.message : String(err)}`
  );
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

process.on("uncaughtException", async (err: unknown) => {
  console.error(
    `Uncaught Exception: ${err instanceof Error ? err.message : String(err)}`
  );
  await disconnectDB();
  process.exit(1);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
