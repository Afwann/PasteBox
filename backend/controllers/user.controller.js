import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET } from "../config.js";

export const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    const token = jwt.sign({ _id: user._id }, JWT_SECRET);
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).send({ error: "Invalid login credentials" });
    }
    const token = jwt.sign({ _id: user._id }, JWT_SECRET);
    res.send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
};

export const searchUsersByName = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Name query parameter is required" });
  }

  try {
    // Create a RegExp that matches the name as part of a word or phrase
    const regex = new RegExp(name, "i"); // Case-insensitive match

    // Search for users where the name contains the search term
    const users = await User.find(
      { name: regex }, // Match any part of the name
      "name profilePicture" // Select only name and profilePicture fields
    );

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error searching users by name:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
