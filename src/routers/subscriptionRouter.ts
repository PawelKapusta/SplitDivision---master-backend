import { Router } from "express";
import axios from "axios";
import * as dotenv from "dotenv";
import passport from "passport";

import { isAdmin } from "../utils/utils";
import { logger } from "../utils/logger";

dotenv.config();
const subscriptionRouter = Router();
const SUBSCRIPTION_API_URL = process.env.SUBSCRIPTION_API_URL;

subscriptionRouter.get("/subscriptions", async (req, res) => {
  try {
    const { data } = await axios.get(`${SUBSCRIPTION_API_URL}/subscriptions`);

    if (!data) {
      return res.status(404).send("Subscriptions not found");
    }

    return res.status(200).json(data);
  } catch (error) {
    logger.error(error.stack);
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

subscriptionRouter.get(
  "/subscriptions/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const subscriptionId: string = req.params.id;

    try {
      const { data } = await axios.get(`${SUBSCRIPTION_API_URL}/subscriptions/${subscriptionId}`);

      if (!data) {
        return res.status(404).send("Subscription not found");
      }

      return res.status(200).json(data);
    } catch (error) {
      logger.error(error.stack);
      logger.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  },
);

subscriptionRouter.post("/subscriptions", async (req, res) => {
  const subscription = req.body;

  try {
    const { data } = await axios.post(`${SUBSCRIPTION_API_URL}/subscriptions `, subscription);

    if (!data) {
      return res.status(409).send("This subscription is already in the system");
    }

    return res.status(200).json(data);
  } catch (error) {
    logger.error(error.stack);
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

subscriptionRouter.put(
  "/subscriptions/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const subscriptionId = req.params.id;
    const subscription = req.body;

    try {
      const { data } = await axios.put(
        `${SUBSCRIPTION_API_URL}/subscriptions/${subscriptionId}`,
        subscription,
      );

      if (!data) {
        return res.status(404).send("This subscription not exists in the system");
      }

      return res.status(200).json(data);
    } catch (error) {
      logger.error(error.stack);
      logger.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  },
);

subscriptionRouter.delete(
  "/subscriptions/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req, res) => {
    const subscriptionId = req.params.id;

    try {
      const { data } = await axios.delete(
        `${SUBSCRIPTION_API_URL}/subscriptions/${subscriptionId}`,
      );

      if (!data) {
        return res.status(409).send("This subscription is already in the system");
      }

      return res.status(200).json(data);
    } catch (error) {
      logger.error(error.stack);
      logger.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  },
);

export default subscriptionRouter;