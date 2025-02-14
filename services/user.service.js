import User from "../models/user.models.js";
import { create } from "../store/user.store.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import { throwErrorWithStatus } from "../errorHandler.js";

function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
}

export async function signup(req, res) {
  try {
    const {
      username,
      fullName,
      email,
      password,
      gender,
      dateOfBirth,
      country,
    } = req.body;

    if (!username || !password) {
      throwErrorWithStatus(400, "Username and password are required");
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      throwErrorWithStatus(400, "Username is already taken");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user
    const user = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
      gender,
      dateOfBirth,
      country,
    });
    const savedUser = await user.save();

    const token = generateToken({ userId: user._id });

    return {
      savedUser,
      token,
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}
