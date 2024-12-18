import express from "express";
import mongoose from "mongoose";
import { PORT, MONGO_URI } from "./config.js";
import userRoutes from "./routes/user.routes.js";
import snippetRoutes from "./routes/snippet.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import cors from "cors";

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

app.use(express.json());

// Serve the uploads directory statically
app.use("/uploads", express.static("uploads"));

const connectWithRetry = () => {
  console.log("MongoDB connection with retry");
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB", err);
      setTimeout(connectWithRetry, 5000); // Retry every 5 seconds
    });
};

connectWithRetry();

app.use("/api/users", userRoutes);
app.use("/api/snippets", snippetRoutes);
app.use("/api/profile", profileRoutes);

app.get("/", (req, res) => {
  return res.status(200).send("PasteBox Server is running");
});

app.get("/db", (_, res) => {
  if (mongoose.connection.readyState === 1) {
    return res.status(200).send("Database ping successful");
  } else {
    return res.status(500).send("Failed to ping database");
  }
});

app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "API endpoint not found" });
});
