import express from "express";
const router = express.Router();

import createUserRules from "../rules/CreateUser.js";
import { register } from "../services/user.service.js";
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

export default router;
