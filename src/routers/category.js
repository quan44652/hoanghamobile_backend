import express from "express";
import {
  addCategory,
  getCategories,
  getCategory,
  getCategoryById,
  removeCategory,
  updateCategory,
} from "../controllers/category";
import checkPermisstion from "../middleware/checkPermisstion";

const router = express.Router();

router.get("/category", getCategories);
router.post("/category", addCategory);
router.put("/category/:id", updateCategory);
router.delete("/category/:id", removeCategory);
router.get("/category/:id", getCategory);
router.get("/categoryId/:id", getCategoryById);

export default router;
