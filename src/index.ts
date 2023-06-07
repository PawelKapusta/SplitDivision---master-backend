import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import * as dotenv from "dotenv";
import passport from "passport";
import passportJWT from "passport-jwt";

import { sequelize } from "./database/config";
import {
  billApiProxy,
  groupApiProxy,
  userApiProxy,
  subscriptionApiProxy,
  commentApiProxy,
} from "./middleware/proxyMiddleware";
import User from "./models/userModel";
import userRouter from "./routers/userRouter";
import faqRouter from "./routers/faqRouter";
import currencyRouter from "./routers/fiatCurrencyRouter";
import groupRouter from "./routers/groupRouter";
import billRouter from "./routers/billRouter";
import subscriptionRouter from "./routers/subscriptionRouter";
import commentRouter from "./routers/commentRouter";
import { consoleLogger } from "./utils/logger";

dotenv.config();

const app = express();
const port = 5000;
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

passport.use(
  new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    return User.findOne({ where: { id: jwtPayload.id } })
      .then(user => {
        return done(null, user);
      })
      .catch(err => {
        return done(err);
      });
  }),
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

sequelize
  .authenticate()
  .then(() => consoleLogger.info("Database connected successfully"))
  .catch(err => consoleLogger.info("Error when connecting to database...: " + err));

app.get("/", (req, res) => {
  res.send("<h1>Server side :)</h1>");
});

app.get("/users", userRouter);
app.get("/users/:id", userRouter);
app.post("/users/register", userRouter);
app.post("/users/login", userRouter);
app.put("/users/:id", userRouter);
app.put("/users/profile/:id", userRouter);
app.delete("/users/:id", userRouter);

app.get("/groups", groupRouter);
app.get("/groups/:id", groupRouter);
app.get("/groups/:id/users", groupRouter);
app.get("/groups/user/:id", groupRouter);
app.post("/groups", groupRouter);
app.put("/groups/:id", groupRouter);
app.delete("/groups/:id", groupRouter);

app.get("/bills", billRouter);
app.get("/bills/:id", billRouter);
app.get("/bills/user/:id", billRouter);
app.get("/bills/group/:id", billRouter);
app.post("/bills", billRouter);
app.put("/bills/:id", billRouter);
app.delete("/bills/:id", billRouter);

app.get("/subscriptions", subscriptionRouter);
app.get("/subscriptions/:id", subscriptionRouter);
app.post("/subscriptions", subscriptionRouter);
app.put("/subscriptions/:id", subscriptionRouter);
app.delete("/subscriptions/:id", subscriptionRouter);

app.get("/comments", commentRouter);
app.get("/comments/:id", commentRouter);
app.post("/comments", commentRouter);
app.put("/comments/:id", commentRouter);
app.delete("/comments/:id", commentRouter);
app.get("/subcomments", commentRouter);
app.get("/subcomments/:id", commentRouter);
app.post("/subcomments", commentRouter);
app.put("/subcomments/:id", commentRouter);
app.delete("/subcomments/:id", commentRouter);

app.get("/faqs", faqRouter);
app.post("/faqs", faqRouter);
app.put("/faqs/:id", faqRouter);
app.delete("/faqs/:id", faqRouter);

app.get("/currency/fiat", currencyRouter);

app.use(userApiProxy);
app.use(groupApiProxy);
app.use(billApiProxy);
app.use(subscriptionApiProxy);
app.use(commentApiProxy);

app.listen(port, () => {
  consoleLogger.info("Starting running API GATEWAY (BFF) - Master Backend app...");
  consoleLogger.info(`App listening on port ${port}!`);
});
