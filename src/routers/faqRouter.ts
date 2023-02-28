import { Router } from "express";
import * as dotenv from "dotenv";
import passport from "passport";
import { v4 as uuidv4 } from "uuid";

import Faq from "../models/faqModel";
import { isAdmin } from "../utils/utils";
import { logger } from "../utils/logger";

dotenv.config();
const faqRouter = Router();

faqRouter.get("/faqs", async (req, res) => {
  try {
    const faqs = await Faq.findAll();

    if (!faqs) {
      return res.status(404).send("FAQs not found");
    }

    return res.status(200).json(faqs);
  } catch (error) {
    logger.error(error.stack);
    logger.error(error.message);
    logger.error(error.errors[0].message);
    return res.status(500).json({ error: error.errors[0].message });
  }
});

faqRouter.post(
  "/faqs",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req, res) => {
    const { question, answer } = req.body;

    try {
      if (question === undefined) {
        return res.status(409).json({ message: "The question can not be empty" });
      }

      if (answer === undefined) {
        return res.status(409).json({ message: "The answer can not be empty" });
      }

      const newFaq = await Faq.create({
        id: uuidv4(),
        question,
        answer,
      });

      return res.status(201).json(newFaq);
    } catch (error) {
      logger.error(error.stack);
      logger.error(error.message);
      logger.error(error.errors[0].message);
      return res.status(500).json({ error: error.errors[0].message });
    }
  },
);

faqRouter.put(
  "/faqs/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req, res) => {
    const faqId = req.params.id;
    const { question, answer } = req.body;

    try {
      const faq = await Faq.findOne({ where: { id: faqId } });
      if (!faq) {
        return res.status(404).json({ message: "This faq not exists in the system" });
      }

      const updatedData = { question, answer };

      const dataToUpdate = Object.keys(updatedData).filter(key => updatedData[key] !== undefined);

      dataToUpdate.forEach(key => (faq[key] = updatedData[key]));

      await faq.save();

      return res.status(200).json(faq);
    } catch (error) {
      logger.error(error.stack);
      logger.error(error.message);
      logger.error(error.errors[0].message);
      return res.status(500).json({ error: error.errors[0].message });
    }
  },
);

faqRouter.delete(
  "/faqs/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req, res) => {
    try {
      const faqId = req.params.id;

      const deletedFaq = await Faq.destroy({ where: { id: faqId } });

      if (!deletedFaq) {
        return res.status(404).json({ message: "FAQ with this id not exists in the system" });
      }

      return res.status(200).json({ message: "FAQ successfully deleted from the system!" });
    } catch (error) {
      console.error(error);
      logger.error(error.stack);
      logger.error(error.message);
      logger.error(error.errors[0].message);
      return res.status(500).json({ error: error.errors[0].message });
    }
  },
);

export default faqRouter;
