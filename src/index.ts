import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import * as dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { database } from "./database/config";

dotenv.config();

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

database
  .authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.log("%c Error when connecting to database...: " + err, 'color: red'));

app.get("/", (req, res) => {
  res.send("<h1>Server side :)</h1>");
});

// app.get('/users', (req, res) => {
//     mysqlConnection.query("SELECT * from users", (err, results, fields) => {
//         if(!err) {
//             res.send(results);
//         } else {
//             console.log(err);
//         }
//     })
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
