import express from "express";
import { Recipe } from "./../types/Recipe";

const app = express();

type Recipes = Recipe[];

const recipes: Recipes = [
  {
    id: 0,
    Title: "Corn",
    Method: "InstaPot",
    Function: "Side",
    Genre: "American",
    Source: "Fresh from the Vegetarian Garden",
    Page: 192,
    Rating: 5,
    Recipe: "List of instructions",
    Ingredients: "List of ingredients",
  },
  {
    id: 1,
    Title: "Beans",
    Method: "Pots",
    Function: "Side",
    Genre: "American",
    Source: null,
    Page: null,
    Rating: 3,
    Recipe: "List of instructions",
    Ingredients: "List of ingredients",
  },
];

app.get("/", (req, res) => {
  res.send(recipes);
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3, 4]);
});

app.listen(3000, () => console.log("Listening on port 3000"));
