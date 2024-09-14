import express from "express";
const router = express.Router();
import { Recipe } from "../types/Recipe";
import Joi from "joi";

type Recipes = Recipe[];

const schema = Joi.object({
  Title: Joi.string().min(3).required(),
  Method: Joi.string().required(),
  Function: Joi.string().required(),
  Genre: Joi.string().required(),
  Source: Joi.string().optional(),
  Page: Joi.number().optional(),
  Rating: Joi.number().min(1).max(5).required(),
  Recipe: Joi.string().required(),
  Ingredients: Joi.string().required(),
});

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

router.get("/", (req, res) => {
  if (!recipes) res.status(404).send("Recipes could not be found");
  res.send(recipes);
});

router.get("/:id", (req, res) => {
  const recipe = recipes.find((r) => r.id === parseInt(req.params.id));

  if (!recipe)
    return res.status(404).send("The recipe with given ID was not found");

  res.send(recipe);
});

router.post("/", (req, res) => {
  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const recipe: Recipe = {
    id: recipes.length + 1,
    Title: req.body.Title,
    Method: req.body.Method,
    Function: req.body.Function,
    Genre: req.body.Genre,
    Source: req.body.Source,
    Page: req.body.Page,
    Rating: req.body.Rating,
    Recipe: req.body.Recipe,
    Ingredients: req.body.Ingredients,
  };

  recipes.push(recipe);

  res.send(recipe);
});

router.put("/:id", (req, res) => {
  const recipe = recipes.find((r) => r.id === parseInt(req.params.id));

  if (!recipe)
    return res.status(404).send("The recipe with given ID was not found");

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  if (recipe!.Title) recipe!.Title = req.body.Title;
  if (recipe!.Method) recipe!.Method = req.body.Method;
  if (recipe!.Function) recipe!.Function = req.body.Function;
  if (recipe!.Genre) recipe!.Genre = req.body.Genre;
  if (recipe!.Source) recipe!.Source = req.body.Source;
  if (recipe!.Page) recipe!.Page = req.body.Page;
  if (recipe!.Rating) recipe!.Rating = req.body.Rating;
  if (recipe!.Recipe) recipe!.Recipe = req.body.Recipe;
  if (recipe!.Ingredients) recipe!.Ingredients = req.body.Ingredients;

  res.send(recipe);
});

router.delete("/:id", (req, res) => {
  const recipe = recipes.find((r) => r.id === parseInt(req.params.id));

  if (!recipe)
    return res.status(404).send("The recipe with given ID was not found");

  const index = recipes.indexOf(recipe!);
  recipes.splice(index, 1);

  res.send(recipe);
});

export default router;
