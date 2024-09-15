import express from "express";
const router = express.Router();
import Joi from "joi";
import { Recipe, Method, Genre, Purpose, Source } from "../../models/models";

const schema = Joi.object({
  title: Joi.string().min(3).required(),
  method: Joi.string().required(),
  purpose: Joi.string().required(),
  genre: Joi.string().required(),
  source: Joi.string().optional(),
  page: Joi.number().optional(),
  rating: Joi.number().min(1).max(5).required(),
  recipe: Joi.string().required(),
  ingredients: Joi.string().required(),
});

// const recipes: Recipes = [
//   {
//     id: 0,
//     title: "Corn",
//     method: "InstaPot",
//     function: "Side",
//     genre: "American",
//     source: "Fresh from the Vegetarian Garden",
//     page: 192,
//     rating: 5,
//     recipe: "List of instructions",
//     ingredients: "List of ingredients",
//   },
//   {
//     id: 1,
//     title: "Beans",
//     method: "Pots",
//     function: "Side",
//     genre: "American",
//     source: null,
//     page: null,
//     rating: 3,
//     recipe: "List of instructions",
//     ingredients: "List of ingredients",
//   },
// ];

// router.get("/", async (req, res) => {
//   // const recipes = await prisma.recipe.findMany();
//   if (!recipes) res.status(404).send("Recipes could not be found");
//   res.send(recipes);
// });

// router.get("/:id", async (req, res) => {
//   const recipe = await prisma.recipe.findUnique({
//     where: { id: parseInt(req.params.id) },
//   });

//   if (!recipe)
//     return res.status(404).send("The recipe with given ID was not found");

//   res.send(recipe);
// });

router.post("/", async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const {
    title,
    method,
    purpose,
    genre,
    source,
    page,
    rating,
    recipe,
    ingredients,
  } = req.body;

  const [got_method, method_created] = await Method.findOrCreate({
    where: { method: method },
  });
  const [got_purpose, purpose_created] = await Purpose.findOrCreate({
    where: { purpose: purpose },
  });
  const [got_genre, genre_created] = await Genre.findOrCreate({
    where: { genre: genre },
  });
  const [got_source, source_created] = await Source.findOrCreate({
    where: { source: source },
  });

  const new_recipe = await Recipe.create({
    title: title,
    methodId: got_method.id,
    purposeId: got_purpose.id,
    genreId: got_genre.id,
    sourceId: got_source.id,
    page: page,
    rating: rating,
    recipe: recipe,
    ingredients: ingredients,
  });
});

// router.put("/:id", async (req, res) => {
//   const recipe = await prisma.recipe.findUnique({
//     where: { id: parseInt(req.params.id) },
//   });

//   if (!recipe)
//     return res.status(404).send("The recipe with given ID was not found");

//   const { error } = schema.validate(req.body);

//   if (error) return res.status(400).send(error.details[0].message);

//   if (recipe!.title) recipe!.title = req.body.title;
//   if (recipe!.method) recipe!.method = req.body.method;
//   if (recipe!.function) recipe!.function = req.body.function;
//   if (recipe!.genre) recipe!.genre = req.body.genre;
//   if (recipe!.source) recipe!.source = req.body.source;
//   if (recipe!.page) recipe!.page = req.body.page;
//   if (recipe!.rating) recipe!.rating = req.body.rating;
//   if (recipe!.recipe) recipe!.recipe = req.body.recipe;
//   if (recipe!.ingredients) recipe!.ingredients = req.body.ingredients;

//   res.send(recipe);
// });

// router.delete("/:id", (req, res) => {
//   const recipe = recipes.find((r) => r.id === parseInt(req.params.id));

//   if (!recipe)
//     return res.status(404).send("The recipe with given ID was not found");

//   const index = recipes.indexOf(recipe!);
//   recipes.splice(index, 1);

//   res.send(recipe);
// });

export default router;
