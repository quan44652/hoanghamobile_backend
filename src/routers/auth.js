import express from "express";
import {
  getAllUser,
  licensing,
  removeUser,
  signin,
  signup,
} from "../controllers/auth";
import checkPermisstion from "../middleware/checkPermisstion";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/users", getAllUser);
router.put("/licensing/:id", checkPermisstion, licensing);
router.delete("/licensing/:id", checkPermisstion, removeUser);

export default router;
