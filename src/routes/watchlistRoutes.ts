import express from "express";
import {
  addToWatchlist,
  deleteFromWatchlist,
  updateWatchlistItem,
} from "../controllers/watchlistController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  watchlistItemSchema,
  watchlistItemUpdateSchema,
} from "../validators/watchlistValidators.js";

const router = express.Router();

router.use(authMiddleware);
// or router.post("/", authMiddleware, addToWatchlist);, specifying middleware for a single route

router.post("/", validateRequest(watchlistItemSchema), addToWatchlist);
router.delete("/:movieId", deleteFromWatchlist);
router.put(
  "/:movieId",
  validateRequest(watchlistItemUpdateSchema),
  updateWatchlistItem
);

export default router;
