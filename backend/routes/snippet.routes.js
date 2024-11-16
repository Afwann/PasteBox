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
import Snippet from "../models/snippet.model.js";

const router = express.Router();

router.get("/", auth, getAllSnippets);
router.post("/", auth, createSnippet);
router.put("/:id", auth, updateSnippet);
router.delete("/:id", auth, deleteSnippet);
router.get("/search", auth, searchSnippetsByTitle);
router.get("/:id", auth, getSnippetById);
router.get("/shared/:id", getSharedSnippetById);
// router.get("/search", () => {
//   console.log("Hello");
// });

export default router;
// /api/snippets / id
// /api/Snippets/search/id?ndasfsadak
