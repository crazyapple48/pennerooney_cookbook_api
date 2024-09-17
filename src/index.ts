import morgan from "morgan";
import express from "express";
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan enabled");
}
