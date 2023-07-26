import express from "express";
import {
  addProduct,
  getProduct,
  getProducts,
  removeProduct,
  updateProduct,
} from "../controllers/product";
import checkPermisstion from "../middleware/checkPermisstion";
const router = express.Router();
router.get("/products", getProducts);
router.post("/products", addProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", removeProduct);
router.get("/products/:id", getProduct);

export default router;
