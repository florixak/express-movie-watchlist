import { WatchlistStatus } from "@prisma/client";
import { z } from "zod";

const watchlistItemSchema = z.object({
  movieId: z.string().uuid(),
  status: z
    .enum(
      [
        WatchlistStatus.PLANNED,
        WatchlistStatus.WATCHING,
        WatchlistStatus.COMPLETED,
        WatchlistStatus.DROPPED,
      ],
      {
        error: "Status must be one of: PLANNED, WATCHING, COMPLETED, DROPPED",
      }
    )
    .optional(),
  rating: z.coerce
    .number()
    .int({ error: "Rating must be an integer" })
    .min(1, { error: "Rating must be between 1 and 10" })
    .max(10, { error: "Rating must be between 1 and 10" })
    .optional(),
  notes: z.string().max(500).optional(),
});
const watchlistItemUpdateSchema = watchlistItemSchema
  .pick({
    status: true,
    rating: true,
    notes: true,
  })
  .partial();

export { watchlistItemSchema, watchlistItemUpdateSchema };
