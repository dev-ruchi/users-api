import { create, findUser, searchUsers } from "../store/user.store.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import { throwErrorWithStatus, sendErrorResponse } from "../errorHandler.js";

function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
}

export async function register(req, res) {
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

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user
    const user = await create({
      fullName,
      username,
      email,
      password: hashedPassword,
      gender,
      dateOfBirth,
      country,
    });

    const token = generateToken({ userId: user._id });

    return {
      user,
      token,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function login(data) {
  const { username, password } = data;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const user = await findUser({ username });

  if (!user) {
    throwErrorWithStatus(400, "Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throwErrorWithStatus(400, "Invalid credentials");
  }

  const token = generateToken({ userId: user._id, username: user.username });

  return {
    user,
    token,
  };
}

export async function searchUser(req, res) {
  try {
    const searchQuery = (req.query.username || req.query || "").toString();

    if (!searchQuery || searchQuery === "") {
      throwErrorWithStatus(400, "Search query is required");
    }

    const users = await searchUsers({
      $or: [
        { username: searchQuery ? new RegExp(`^${searchQuery}`, "i") : null },
        { email: new RegExp(`^${searchQuery}$`, "i") },
      ],
    })
      .select("-password")
      .lean();

    return users;
  } catch (error) {
    sendErrorResponse(res, error);
  }
}
