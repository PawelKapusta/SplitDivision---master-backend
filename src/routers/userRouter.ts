import { Request, Response, Router } from "express";
import axios from "axios";
import * as dotenv from "dotenv";
import passport from "passport";

import { isAdmin } from "../utils/utils";
import { logger } from "../utils/logger";

dotenv.config();
const userRouter = Router();
const USER_API_URL = process.env.USER_API_URL;

userRouter.get("/users", async (req: Request, res: Response) => {
  try {
    const { data } = await axios.get(`${USER_API_URL}/users`);

    if (!data) {
      return res.status(404).send("Users not found");
    }

    return res.status(200).json(data);
  } catch (error) {
    logger.error(error.stack);
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

userRouter.get(
  "/users/:id",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response) => {
    const userId: string = req.params.id;

    try {
      const { data } = await axios.get(`${USER_API_URL}/users/${userId}`);

      if (!data) {
        return res.status(404).send("User not found");
      }

      return res.status(200).json(data);
    } catch (error) {
      logger.error(error.stack);
      logger.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  },
);

userRouter.post("/users/register", async (req: Request, res: Response) => {
  const user = req.body;

  try {
    const { data } = await axios.post(`${USER_API_URL}/users/register `, user);

    if (!data) {
      return res.status(409).send("This user is already in the system");
    }

    return res.status(200).json(data);
  } catch (error) {
    logger.error(error.stack);
    logger.error(error.message);
    return res.status(500).json({ error: error.response.data });
  }
});

userRouter.post("/users/login", async (req: Request, res: Response) => {
  const user = req.body;
  try {
    const { data } = await axios.post(`${USER_API_URL}/users/login `, user);
    if (data.error) {
      return res.status(409).json({ error: data.error });
    }

    return res.status(200).json(data);
  } catch (error) {
    logger.error(error.stack);
    logger.error(error.message);
    logger.error(error.response.data);
    return res.status(500).json({ error: error.response.data });
  }
});

userRouter.put(
  "/users/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req: Request, res: Response) => {
    const userId = req.params.id;
    const user = req.body;

    try {
      const { data } = await axios.put(`${USER_API_URL}/users/${userId}`, user);

      if (!data) {
        return res.status(404).send("This user not exists in the system");
      }

      return res.status(200).json(data);
    } catch (error) {
      logger.error(error.stack);
      logger.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  },
);

userRouter.put(
  "/users/profile/:id",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response) => {
    const userId = req.params.id;
    const user = req.body;

    try {
      const { data } = await axios.put(`${USER_API_URL}/users/profile/${userId}`, user);

      if (!data) {
        return res.status(404).send("This user not exists in the system");
      }

      return res.status(200).json(data);
    } catch (error) {
      logger.error(error.stack);
      logger.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  },
);

userRouter.delete(
  "/users/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
      const { data } = await axios.delete(`${USER_API_URL}/users/${userId}`);

      if (!data) {
        return res.status(409).send("This user not exists in the system");
      }

      return res.status(200).json(data);
    } catch (error) {
      logger.error(error.stack);
      logger.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  },
);

export default userRouter;
