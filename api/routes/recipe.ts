import express from "express";
const router = express.Router();
import { Recipe } from "../types/Recipe";
import Joi from "joi";

type Recipes = Recipe[];

const schema = Joi.object({
  title: Joi.string().min(3).required(),
  method: Joi.string().required(),
  function: Joi.string().required(),
  genre: Joi.string().required(),
  source: Joi.string().optional(),
  page: Joi.number().optional(),
  rating: Joi.number().min(1).max(5).required(),
  recipe: Joi.string().required(),
  ingredients: Joi.string().required(),
});

const recipes: Recipes = [
  {
    id: 0,
    title: "Corn",
    method: "InstaPot",
    function: "Side",
    genre: "American",
    source: "Fresh from the Vegetarian Garden",
    page: 192,
    rating: 5,
    recipe: "List of instructions",
    ingredients: "List of ingredients",
  },
  {
    id: 1,
    title: "Beans",
    method: "Pots",
    function: "Side",
    genre: "American",
    source: null,
    page: null,
    rating: 3,
    recipe: "List of instructions",
    ingredients: "List of ingredients",
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
    title: req.body.title,
    method: req.body.method,
    function: req.body.function,
    genre: req.body.genre,
    source: req.body.source,
    page: req.body.page,
    rating: req.body.rating,
    recipe: req.body.recipe,
    ingredients: req.body.ingredients,
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

  if (recipe!.title) recipe!.title = req.body.title;
  if (recipe!.method) recipe!.method = req.body.method;
  if (recipe!.function) recipe!.function = req.body.function;
  if (recipe!.genre) recipe!.genre = req.body.genre;
  if (recipe!.source) recipe!.source = req.body.source;
  if (recipe!.page) recipe!.page = req.body.page;
  if (recipe!.rating) recipe!.rating = req.body.rating;
  if (recipe!.recipe) recipe!.recipe = req.body.recipe;
  if (recipe!.ingredients) recipe!.ingredients = req.body.ingredients;

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
