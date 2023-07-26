import express from "express";
import { addToCart, getAllToCart, removeToCart } from "../controllers/cart";

const router = express.Router();

router.post("/cart", addToCart);
router.get("/cart", getAllToCart);
router.delete("/cart/:id", removeToCart);

export default router;
