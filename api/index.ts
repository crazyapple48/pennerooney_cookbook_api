import morgan from "morgan";
import recipes from "./routes/recipe";
import express from "express";
import db from "./db";
import { initModels } from "./database/models";
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan enabled");
}
app.use("/recipes", recipes);

async function start(): Promise<void> {
  initModels(db);
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Listening on port ${port}...`));
}

start();
