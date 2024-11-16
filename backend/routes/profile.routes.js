import express from "express";
import auth from "../middleware/auth.js";
import {
  upsertProfile,
  getProfile,
  deleteProfile,
  uploadProfilePicture,
  getPublicProfile,
} from "../controllers/profile.controller.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Configure multer for file uploads

router.put("/update", auth, upsertProfile); // Create or Update Profile
router.get("/", auth, getProfile); // Read Profile
router.delete("/", auth, deleteProfile); // Delete Profile
router.post(
  "/upload-picture",
  auth,
  upload.single("profilePicture"),
  uploadProfilePicture
); // Upload Profile Picture
router.get("/:id", getPublicProfile); // Read Public Profile

export default router;
