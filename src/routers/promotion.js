import express from "express";
import {
  addPromotion,
  getPromotion,
  getPromotions,
  removePromotion,
  updatePromotion,
} from "../controllers/promotion";
import checkPermisstion from "../middleware/checkPermisstion";

const router = express.Router();

router.get("/promotion", getPromotions);
router.post("/promotion", checkPermisstion, addPromotion);
router.put("/promotion/:id", checkPermisstion, updatePromotion);
router.delete("/promotion/:id", checkPermisstion, removePromotion);
router.get("/promotion/:id", getPromotion);

export default router;
