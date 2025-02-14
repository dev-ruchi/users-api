import express from "express";
const router = express.Router();

import createUserRules from "../rules/CreateUser.js";
import { register, login } from "../services/user.service.js";
import { sendErrorResponse } from "../errorHandler.js";

router.post("/register", ...createUserRules, async (req, res) => {
  try {
    const { user, token } = await register(req, res);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
      },
      token,
    });
  } catch (err) {
    sendErrorResponse(res, err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { user, token } = await login(req.body);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        country: user.country,
      },
      token,
    });
  } catch (err) {
    sendErrorResponse(res, err);
  }
});

export default router;
