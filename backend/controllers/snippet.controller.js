import mongoose from "mongoose";
import Snippet from "../models/snippet.model.js";
import User from "../models/user.model.js";

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
      .json({ success: false, message: "Invalid ID format" });
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
      .json({ success: false, message: "Invalid ID format" });
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
    const snippet = await Snippet.findOne({ _id: id, shared: true });
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

export const searchSharedSnippets = async (req, res) => {
  const { search } = req.query;

  try {
    let query = { shared: true };

    if (search) {
      const searchRegex = new RegExp(search, "i"); // Case-insensitive search
      query.title = searchRegex;
    }

    const snippets = await Snippet.find(query).populate("user", "username");
    res.status(200).json({ success: true, data: snippets });
  } catch (error) {
    console.error("Error in searching snippets: ", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
