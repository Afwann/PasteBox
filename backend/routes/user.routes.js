import express from "express";
import {
  register,
  login,
  searchUsersByName,
} from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/search", auth, searchUsersByName);

export default router;
