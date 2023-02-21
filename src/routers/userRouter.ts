import { Router } from "express";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();
const userRouter = Router();
const USER_API_URL = process.env.USER_API_URL;

userRouter.post("/users", async (req, res) => {
  try {
    const { data } = await axios.post(`${USER_API_URL}/users`, req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default userRouter;
