import express from "express";
import auth from "../middleware/auth.js";
import {
  getAllSnippets,
  createSnippet,
  updateSnippet,
  deleteSnippet,
  getSnippetById,
  getSharedSnippetById,
  searchSnippetsByTitle,
} from "../controllers/snippet.controller.js";

const router = express.Router();

router.get("/", auth, getAllSnippets);
router.post("/", auth, createSnippet);
router.put("/:id", auth, updateSnippet);
router.delete("/:id", auth, deleteSnippet);
router.get("/search/title", auth, searchSnippetsByTitle);
router.get("/:id", auth, getSnippetById);
router.get("/shared/:id", getSharedSnippetById);

export default router;
