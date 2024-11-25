import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    bio: {
      type: String,
      default: "Hallo Pak Eko",
    },
    profilePicture: {
      type: String,
      default: "/uploads/Template_pic.png", // Default profile picture
    },
  },
  {
    timestamps: true,
  }
);

// Middleware untuk hashing password sebelum menyimpan
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Middleware untuk mengisi default 'name' dengan '_id'
userSchema.pre("save", function (next) {
  if (!this.name) {
    this.name = this._id.toString(); // Gunakan _id sebagai name
  }
  next();
});

// Method untuk membandingkan password
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
