import morgan from "morgan";
import recipes from "./routes/recipe";
import express from "express";
import { Sequelize } from "sequelize";
require("dotenv").config();

const db_name = process.env.DB_NAME;
const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const db_port = process.env.DB_PORT;

export const sequelize = new Sequelize(db_name!, db_username!, db_password!, {
  host: process.env.DB_HOST,
  port: parseInt(db_port!),
  dialect: "mysql",
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan enabled");
}
app.use("/recipes", recipes);

const port = process.env.PORT || 3000;

async function start(): Promise<void> {
  try {
    await sequelize.authenticate();
    app.listen(port, () => console.log(`Listening on port ${port}...`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();
