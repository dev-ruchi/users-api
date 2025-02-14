import express from "express";
const router = express.Router();

import createUserRules from "../rules/CreateUser.js";
import { signup } from "../services/user.service.js";
import { sendErrorResponse } from "../errorHandler.js";

router.post("/signup", ...createUserRules, async (req, res) => {
  try {
    const { savedUser, token } = await signup(req, res);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: savedUser._id,
        username: savedUser.username,
      },
      token,
    });
  } catch (err) {
    sendErrorResponse(res, err);
  }
});

export default router;
