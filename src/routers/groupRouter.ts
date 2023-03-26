import { Request, Response, Router } from "express";
import axios from "axios";
import * as dotenv from "dotenv";
import passport from "passport";

import { isAdmin } from "../utils/utils";
import { logger } from "../utils/logger";

dotenv.config();
const groupRouter = Router();
const GROUP_API_URL = process.env.GROUP_API_URL;

groupRouter.get("/groups", async (req: Request, res: Response) => {
  try {
    const { data } = await axios.get(`${groupRouter}/groups`);

    if (!data) {
      return res.status(404).send("Groups not found");
    }

    return res.status(200).json(data);
  } catch (error) {
    logger.error(error.stack);
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

groupRouter.get(
  "/groups/:id",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response) => {
    const groupId: string = req.params.id;

    try {
      const { data } = await axios.get(`${GROUP_API_URL}/groups/${groupId}`);

      if (!data) {
        return res.status(404).send("Group not found");
      }

      return res.status(200).json(data);
    } catch (error) {
      logger.error(error.stack);
      logger.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  },
);

groupRouter.post("/groups", async (req: Request, res: Response) => {
  const group = req.body;

  try {
    const { data } = await axios.post(`${GROUP_API_URL}/groups `, group);

    if (!data) {
      return res.status(409).send("This group is already in the system");
    }

    return res.status(200).json(data);
  } catch (error) {
    logger.error(error.stack);
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

groupRouter.put(
  "/groups/:id",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response) => {
    const groupId = req.params.id;
    const group = req.body;

    try {
      const { data } = await axios.put(`${GROUP_API_URL}/groups/${groupId}`, group);

      if (!data) {
        return res.status(404).send("This group not exists in the system");
      }

      return res.status(200).json(data);
    } catch (error) {
      logger.error(error.stack);
      logger.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  },
);

groupRouter.delete(
  "/groups/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req: Request, res: Response) => {
    const groupId = req.params.id;

    try {
      const { data } = await axios.delete(`${GROUP_API_URL}/groups/${groupId}`);

      if (!data) {
        return res.status(409).send("This group is already in the system");
      }

      return res.status(200).json(data);
    } catch (error) {
      logger.error(error.stack);
      logger.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  },
);

export default groupRouter;
