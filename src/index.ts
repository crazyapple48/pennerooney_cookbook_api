import morgan from "morgan";
import express from "express";
import { methodRouter } from "./routes/method/method.router";
import { genreRouter } from "./routes/genre/genre.router";
import { purposeRouter } from "./routes/purpose/purpose.router";
import { sourceRouter } from "./routes/source_route/source.router";
import { recipeRouter } from "./routes/recipe/recipe.router";
require("dotenv").config();

export const app = express();

let PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

if (process.env.NODE_ENV == "test") {
  PORT = 0;
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan enabled");
}

// Routers
app.use("/methods", methodRouter);
app.use("/genres", genreRouter);
app.use("/purposes", purposeRouter);
app.use("/sources", sourceRouter);
app.use("/recipes", recipeRouter);

const server = app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});

module.exports = server;
