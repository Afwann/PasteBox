import express from "express";
import {
  register,
  login,
  searchUsers,
} from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/search", searchUsers); // Ensure this route uses the auth middleware

export default router;
