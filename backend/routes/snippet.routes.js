import express from "express";
import auth from "../middleware/auth.js";
import {
  getAllSnippets,
  createSnippet,
  updateSnippet,
  deleteSnippet,
  getSnippetById,
  getSharedSnippetById,
  searchSharedSnippets,
} from "../controllers/snippet.controller.js";

const router = express.Router();

router.get("/", auth, getAllSnippets);
router.post("/", auth, createSnippet);
router.put("/:id", auth, updateSnippet);
router.delete("/:id", auth, deleteSnippet);
router.get("/:id", auth, getSnippetById);
router.get("/shared/:id", getSharedSnippetById);
router.get("/search", searchSharedSnippets); // Route for searching shared snippets

export default router;
