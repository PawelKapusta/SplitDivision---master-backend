import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import * as dotenv from "dotenv";
import passport from "passport";
import passportJWT from "passport-jwt";

import { sequelize } from "./database/config";
import { groupApiProxy, userApiProxy } from "./middleware/proxyMiddleware";
import User from "./models/userModel";
import userRouter from "./routers/userRouter";
import faqRouter from "./routers/faqRouter";
import currencyRouter from "./routers/fiatCurrencyRouter";
import groupRouter from "./routers/groupRouter";

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
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.log("Error when connecting to database...: " + err));

app.get("/", (req, res) => {
  res.send("<h1>Server side :)</h1>");
});

//users
app.get("/users", userRouter);
app.get("/users/:id", userRouter);
app.post("/users/register", userRouter);
app.post("/users/login", userRouter);
app.put("/users/:id", userRouter);
app.put("/users/profile/:id", userRouter);
app.delete("/users/:id", userRouter);

//groups
app.get("/groups", groupRouter);
app.get("/groups/:id", groupRouter);
app.post("/groups", groupRouter);
app.put("/groups/:id", groupRouter);
app.delete("/groups/:id", groupRouter);

//faqs
app.get("/faqs", faqRouter);
app.post("/faqs", faqRouter);
app.put("/faqs/:id", faqRouter);
app.delete("/faqs/:id", faqRouter);

//currency
app.get("/currency/fiat", currencyRouter);

//Proxy
app.use(userApiProxy);
app.use(groupApiProxy);

app.listen(port, () => {
  console.log("Starting running Master Backend app...");
  console.log(`App listening on port ${port}!`);
});
