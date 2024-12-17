import mongoose from "mongoose";
import Snippet from "../models/snippet.model.js";

export const getAllSnippets = async (req, res) => {
  try {
    const snippets = await Snippet.find({ user: req.user._id });
    res.status(200).json({ success: true, data: snippets });
  } catch (error) {
    console.error("Error in fetching snippets: ", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createSnippet = async (req, res) => {
  const snippet = req.body;

  if (!snippet.title || !snippet.content) {
    return res
      .status(400)
      .json({ success: false, message: "Title and content are required" });
  }

  const newSnippet = new Snippet({ ...snippet, user: req.user._id });

  try {
    await newSnippet.save();
    res.status(201).json({ success: true, data: newSnippet });
  } catch (error) {
    console.error("Error in creating snippet: ", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateSnippet = async (req, res) => {
  const { title, content, shared } = req.body;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid ID format1" });
  }

  if (!title || !content) {
    return res
      .status(400)
      .json({ success: false, message: "Title and content are required" });
  }

  try {
    const updatedSnippet = await Snippet.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { title, content, shared },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedSnippet) {
      return res
        .status(404)
        .json({ success: false, message: "Snippet not found" });
    }

    res.status(200).json({ success: true, data: updatedSnippet });
  } catch (error) {
    console.error("Error in updating snippet: ", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteSnippet = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid ID format2" });
  }

  try {
    const deletedSnippet = await Snippet.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });
    if (!deletedSnippet) {
      return res
        .status(404)
        .json({ success: false, message: "Snippet not found" });
    }
    res.status(200).json({ success: true, message: "Snippet deleted" });
  } catch (error) {
    console.error("Error in deleting snippet: ", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getSnippetById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid ID format" });
  }

  try {
    const snippet = await Snippet.findOne({ _id: id, user: req.user._id });
    if (!snippet) {
      return res
        .status(404)
        .json({ success: false, message: "Snippet not found" });
    }
    res.status(200).json({ success: true, data: snippet });
  } catch (error) {
    console.error("Error in fetching snippet: ", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getSharedSnippetById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid ID format" });
  }

  try {
    const snippet = await Snippet.findOne(
      { _id: id, shared: true },
      "title user content"
    ).populate("user", "username");
    if (!snippet) {
      return res
        .status(404)
        .json({ success: false, message: "Snippet not found" });
    }
    res.status(200).json({ success: true, data: snippet });
  } catch (error) {
    console.error("Error in fetching shared snippet: ", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const searchSnippetsByTitle = async (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Title query parameter is required" });
  }

  try {
    // Create a RegExp with word boundary
    const regex = new RegExp(`\\b${title}\\b`, "i"); // \b ensures exact word match

    // Search for snippets
    const snippets = await Snippet.find(
      { title: regex, shared: true }, // Match title with exact word
      "title user" // Only select `title` and `user` fields
    ).populate("user", "username");

    res.status(200).json({ success: true, data: snippets });
  } catch (error) {
    console.error("Error searching snippets:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
