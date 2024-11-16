import User from "../models/user.model.js";

// Create or Update Profile
export const upsertProfile = async (req, res) => {
  const { name, bio } = req.body;

  const userId = req.user?._id;

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "User ID is missing" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, bio },
      { new: true, upsert: true, runValidators: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    console.error("Error in updating profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Read Profile
export const getProfile = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error in fetching profile: ", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Read Public Profile
export const getPublicProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select(
      "username name bio profilePicture"
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error in fetching public profile: ", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete Profile
export const deleteProfile = async (req, res) => {
  const userId = req.user._id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "User profile deleted" });
  } catch (error) {
    console.error("Error in deleting profile: ", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Upload Profile Picture
export const uploadProfilePicture = async (req, res) => {
  const userId = req.user._id;
  const profilePicture = `/uploads/${req.file.filename}`; // Store the URL

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    console.error("Error in uploading profile picture: ", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
