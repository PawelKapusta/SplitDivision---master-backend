import { Request, Response, Router } from "express";
import axios from "axios";
import * as dotenv from "dotenv";
import passport from "passport";

import { isAdmin } from "../utils/utils";
import { logger } from "../utils/logger";

dotenv.config();
const billRouter = Router();
const BILL_API_URL = process.env.BILL_API_URL;

billRouter.get("/bills", async (req: Request, res: Response) => {
  try {
    const { data } = await axios.get(`${BILL_API_URL}/bills`);

    if (!data) {
      return res.status(404).send("Bills not found");
    }

    return res.status(200).json(data);
  } catch (error) {
    logger.error(error.stack);
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

billRouter.get(
  "/bills/:id",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response) => {
    const billId: string = req.params.id;

    try {
      const { data } = await axios.get(`${BILL_API_URL}/bills/${billId}`);

      if (!data) {
        return res.status(404).send("Bill not found");
      }

      return res.status(200).json(data);
    } catch (error) {
      logger.error(error.stack);
      logger.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  },
);

billRouter.get(
  "/bills/user/:id",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response) => {
    const userId: string = req.params.id;

    try {
      const { data } = await axios.get(`${BILL_API_URL}/bills/user/${userId}`);

      if (!data) {
        return res.status(404).send("Bills-users not found");
      }

      return res.status(200).json(data);
    } catch (error) {
      logger.error(error.stack);
      logger.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  },
);

billRouter.post("/bills", async (req: Request, res: Response) => {
  const bill = req.body;

  try {
    const { data } = await axios.post(`${BILL_API_URL}/bills `, bill);

    if (!data) {
      return res.status(409).send("This bill is already in the system");
    }

    return res.status(200).json(data);
  } catch (error) {
    logger.error(error.stack);
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

billRouter.put(
  "/bills/:id",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response) => {
    const billId = req.params.id;
    const bill = req.body;

    try {
      const { data } = await axios.put(`${BILL_API_URL}/bills/${billId}`, bill);

      if (!data) {
        return res.status(404).send("This bill not exists in the system");
      }

      return res.status(200).json(data);
    } catch (error) {
      logger.error(error.stack);
      logger.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  },
);

billRouter.delete(
  "/bills/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req: Request, res: Response) => {
    const billId = req.params.id;

    try {
      const { data } = await axios.delete(`${BILL_API_URL}/bills/${billId}`);

      if (!data) {
        return res.status(409).send("This bill is already in the system");
      }

      return res.status(200).json(data);
    } catch (error) {
      logger.error(error.stack);
      logger.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  },
);

export default billRouter;
