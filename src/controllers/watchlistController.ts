import { Request, Response } from "express";
import { getPrisma } from "../config/db.js";
import { WatchlistStatus } from "@prisma/client";

const addToWatchlist = async (req: Request, res: Response) => {
  const { movieId, status, rating, notes } = req.body as {
    movieId: string;
    status: WatchlistStatus;
    rating: number;
    notes: string;
  };

  const movie = await getPrisma().movie.findUnique({
    where: { id: movieId },
  });

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  const isInWatchlist = await getPrisma().watchlistItem.findUnique({
    where: { userId_movieId: { userId: (req as any).user.id, movieId } },
  });

  if (isInWatchlist) {
    return res.status(400).json({ error: "Movie already in the watchlist" });
  }

  const watchlistItem = await getPrisma().watchlistItem.create({
    data: {
      userId: (req as any).user.id,
      movieId,
      status: status || WatchlistStatus.PLANNED,
      rating,
      notes,
    },
  });

  res.status(201).json({
    status: "success",
    data: {
      watchlistItem,
    },
  });
};

const deleteFromWatchlist = async (req: Request, res: Response) => {
  const { movieId } = req.params;
  const userId = (req as any).user.id;

  const existingItem = await getPrisma().watchlistItem.findUnique({
    where: { userId_movieId: { userId, movieId } },
  });

  if (!existingItem) {
    return res.status(404).json({ error: "Watchlist item not found" });
  }

  const deleted = await getPrisma().watchlistItem.delete({
    where: { userId_movieId: { userId, movieId } },
  });

  res.status(200).json({ status: "success", data: deleted });
};

const updateWatchlistItem = async (req: Request, res: Response) => {
  const { movieId } = req.params;
  const userId = (req as any).user.id;

  const { status, rating, notes } = req.body as {
    status?: WatchlistStatus;
    rating?: number;
    notes?: string;
  };

  const existingItem = await getPrisma().watchlistItem.findUnique({
    where: { userId_movieId: { userId, movieId } },
  });

  if (!existingItem) {
    return res.status(404).json({ error: "Watchlist item not found" });
  }
  try {
    const updatedItem = await getPrisma().watchlistItem.update({
      where: { userId_movieId: { userId, movieId } },
      data: {
        status,
        rating,
        notes,
      },
    });

    res.status(200).json({ status: "success", data: updatedItem });
  } catch (error) {
    res.status(500).json({ error: "Failed to update watchlist item" });
  }
};

export { addToWatchlist, deleteFromWatchlist, updateWatchlistItem };
