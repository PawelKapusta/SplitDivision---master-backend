import express from "express";
import axios from "axios";
import * as dotenv from "dotenv";
import { logger } from "../utils/logger";

dotenv.config();
const currencyRouter = express.Router();
const FIAT_CURRENCY_API_URL = process.env.FIAT_CURRENCY_API_URL;

currencyRouter.get("/currency/fiat", async (req, res) => {
  try {
    const data = axios.get(FIAT_CURRENCY_API_URL);
    const currency = await Promise.all([data]);
    const allCurrencies = currency[0].data[0].rates;
    allCurrencies.push({
      currency: "Polski złoty",
      code: "PLN",
      mid: 1.0,
    });
    const filterXDR = allCurrencies.filter(element => element.code !== "XDR");
    res.status(200).send({
      success: "true",
      message: "currencies",
      currencies: filterXDR,
    });
    res.end();
  } catch (error) {
    logger.error(error.stack);
    logger.error(error.message);
    return res.status(500).json({ error: error.toString() });
  }
});

export default currencyRouter;
