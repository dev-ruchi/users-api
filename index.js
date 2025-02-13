import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const port = process.env.PORT;
const host = process.env.HOST;

(async () => {
  try {
    await mongoose
      .connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
      .then(() => console.log("Connected to DB"));
  } catch (error) {
    console.error("Failed to connect to DB:", error);
    throw error;
  }
})();

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, host, () => {
  console.log(`Listening on ${host}:${port}`);
});
