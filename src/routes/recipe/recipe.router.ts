import express from "express";
import type { Request, Response } from "express";
import Joi from "joi";

import * as RecipeService from "./recipe.service";
import { matchedData, param, validationResult } from "express-validator";

export const recipeRouter = express.Router();

const schema = Joi.object({
  title: Joi.string(),
  page: Joi.number().integer().min(0),
  rating: Joi.number().integer().positive(),
  recipe: Joi.string(),
  ingredients: Joi.string(),
  nickelaLevel: Joi.number().integer().positive(),
  isFavorite: Joi.boolean(),
  method: { id: Joi.number().integer().positive(), method: Joi.string() },
  source: {
    id: Joi.number().integer().positive(),
    source: Joi.string(),
    hasManyRecipes: Joi.boolean(),
  },
  purpose: { id: Joi.number().integer().positive(), purpose: Joi.string() },
  genre: { id: Joi.number().integer().positive(), genre: Joi.string() },
});

// GET: List of all recipes

recipeRouter.get("/", async (req: Request, res: Response) => {
  try {
    const recipes = await RecipeService.listRecipes();
    return res.status(200).json(recipes);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json(err.message);
  }
});

// GET: Single recipe by id
// Params: id
recipeRouter.get(
  "/:id",
  param("id").trim().notEmpty().isNumeric(),
  async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send("Invalid ID");
    }

    const { id } = matchedData(req, { locations: ["params"] });
    try {
      const recipe = await RecipeService.getRecipe(parseInt(id));
      if (recipe) {
        return res.status(200).send(recipe);
      }
      return res.status(404).send("Recipe could not be found");
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
);

// POST: new recipe
// Params: recipe
recipeRouter.post("/", async (req: Request, res: Response) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }

  try {
    const recipe = req.body;
    const new_recipe = await RecipeService.createRecipe(recipe);
    return res.status(201).send(new_recipe);
  } catch (err: any) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

// PUT: Update a recipe
// Params: recipe
recipeRouter.put(
  "/:id",
  param("id").trim().notEmpty().isNumeric(),
  async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send("Invalid ID");
    }

    const { id } = matchedData(req, { locations: ["params"] });
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).send(error.message);
    }
    try {
      const recipe = req.body;
      const updatedRecipe = await RecipeService.updateRecipe(
        recipe,
        parseInt(id)
      );
      return res.status(200).send(updatedRecipe);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
);

// DELETE: delete a recipe
// Params: id
recipeRouter.delete(
  "/:id",
  param("id").trim().notEmpty().isNumeric(),
  async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send("Invalid ID");
    }

    const { id } = matchedData(req, { locations: ["params"] });
    try {
      await RecipeService.deleteRecipe(parseInt(id));
      return res.status(204).send("recipe has been successfully deleted");
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
);
