import { Request, Response, Router } from "express";
import axios from "axios";
import * as dotenv from "dotenv";
import passport from "passport";

import { isAdmin } from "../utils/utils";
import { logger } from "../utils/logger";

dotenv.config();
const commentRouter = Router();
const COMMENT_API_URL = process.env.COMMENT_API_URL;

commentRouter.get("/comments", async (req: Request, res: Response) => {
  try {
    const { data } = await axios.get(`${COMMENT_API_URL}/comments`);

    if (!data) {
      return res.status(404).send("Comments not found");
    }

    return res.status(200).json(data);
  } catch (error) {
    logger.error(error.stack);
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

commentRouter.get(
  "/comments/:id",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response) => {
    const commentId: string = req.params.id;

    try {
      const { data } = await axios.get(`${COMMENT_API_URL}/comments/${commentId}`);

      if (!data) {
        return res.status(404).send("Comment not found");
      }

      return res.status(200).json(data);
    } catch (error) {
      logger.error(error.stack);
      logger.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  },
);

commentRouter.post("/comments", async (req: Request, res: Response) => {
  const comment = req.body;

  try {
    const { data } = await axios.post(`${COMMENT_API_URL}/comments `, comment);

    if (!data) {
      return res.status(409).send("This comment is already in the system");
    }

    return res.status(200).json(data);
  } catch (error) {
    logger.error(error.stack);
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

commentRouter.put(
  "/comments/:id",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response) => {
    const commentId = req.params.id;
    const comment = req.body;

    try {
      const { data } = await axios.put(`${COMMENT_API_URL}/comments/${commentId}`, comment);

      if (!data) {
        return res.status(404).send("This comment not exists in the system");
      }

      return res.status(200).json(data);
    } catch (error) {
      logger.error(error.stack);
      logger.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  },
);

commentRouter.delete(
  "/comments/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req: Request, res: Response) => {
    const commentId = req.params.id;

    try {
      const { data } = await axios.delete(`${COMMENT_API_URL}/comments/${commentId}`);

      if (!data) {
        return res.status(409).send("This comment is already in the system");
      }

      return res.status(200).json(data);
    } catch (error) {
      logger.error(error.stack);
      logger.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  },
);

commentRouter.get("/subcomments", async (req: Request, res: Response) => {
  try {
    const { data } = await axios.get(`${COMMENT_API_URL}/subcomments`);

    if (!data) {
      return res.status(404).send("Subcomments not found");
    }

    return res.status(200).json(data);
  } catch (error) {
    logger.error(error.stack);
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

commentRouter.get(
  "/subcomments/:id",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response) => {
    const subcommentId: string = req.params.id;

    try {
      const { data } = await axios.get(`${COMMENT_API_URL}/subcomments/${subcommentId}`);

      if (!data) {
        return res.status(404).send("Subcomment not found");
      }

      return res.status(200).json(data);
    } catch (error) {
      logger.error(error.stack);
      logger.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  },
);

commentRouter.post("/subcomments", async (req: Request, res: Response) => {
  const subcomment = req.body;

  try {
    const { data } = await axios.post(`${COMMENT_API_URL}/subcomments `, subcomment);

    if (!data) {
      return res.status(409).send("This subcomment is already in the system");
    }

    return res.status(200).json(data);
  } catch (error) {
    logger.error(error.stack);
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

commentRouter.put(
  "/subcomments/:id",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response) => {
    const subcommentId = req.params.id;
    const subcomment = req.body;

    try {
      const { data } = await axios.put(
        `${COMMENT_API_URL}/subcomments/${subcommentId}`,
        subcomment,
      );

      if (!data) {
        return res.status(404).send("This subcomment not exists in the system");
      }

      return res.status(200).json(data);
    } catch (error) {
      logger.error(error.stack);
      logger.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  },
);

commentRouter.delete(
  "/subcomments/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req: Request, res: Response) => {
    const subcommentId = req.params.id;

    try {
      const { data } = await axios.delete(`${COMMENT_API_URL}/subcomments/${subcommentId}`);

      if (!data) {
        return res.status(409).send("This subcomment is already in the system");
      }

      return res.status(200).json(data);
    } catch (error) {
      logger.error(error.stack);
      logger.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  },
);

export default commentRouter;
