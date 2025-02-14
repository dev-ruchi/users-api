import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: [true, "Fullname is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
      },
      dateOfBirth: {
        type: Date,
        required: [true, "Date of Birth is required"],
      },
      country: {
        type: String,
        required: [true, "Country is required"],
      },
  },
  { timestamps: true }
); 

const User = mongoose.model("User", userSchema);

export default User;
