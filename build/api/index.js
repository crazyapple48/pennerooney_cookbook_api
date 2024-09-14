"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const joi_1 = __importDefault(require("joi"));
const express_1 = __importDefault(require("express"));
require("dotenv").config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
if (app.get("env") === "development") {
    app.use((0, morgan_1.default)("tiny"));
    console.log("Morgan enabled");
}
const schema = joi_1.default.object({
    Title: joi_1.default.string().min(3).required(),
    Method: joi_1.default.string().required(),
    Function: joi_1.default.string().required(),
    Genre: joi_1.default.string().required(),
    Source: joi_1.default.string().optional(),
    Page: joi_1.default.number().optional(),
    Rating: joi_1.default.number().min(1).max(5).required(),
    Recipe: joi_1.default.string().required(),
    Ingredients: joi_1.default.string().required(),
});
const recipes = [
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
app.get("/recipes", (req, res) => {
    if (!recipes)
        res.status(404).send("Recipes could not be found");
    res.send(recipes);
});
app.get("/recipes/:id", (req, res) => {
    const recipe = recipes.find((r) => r.id === parseInt(req.params.id));
    if (!recipe)
        return res.status(404).send("The recipe with given ID was not found");
    res.send(recipe);
});
app.post("/recipes", (req, res) => {
    const { error } = schema.validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const recipe = {
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
app.put("/recipes/:id", (req, res) => {
    const recipe = recipes.find((r) => r.id === parseInt(req.params.id));
    if (!recipe)
        return res.status(404).send("The recipe with given ID was not found");
    const { error } = schema.validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    if (recipe.Title)
        recipe.Title = req.body.Title;
    if (recipe.Method)
        recipe.Method = req.body.Method;
    if (recipe.Function)
        recipe.Function = req.body.Function;
    if (recipe.Genre)
        recipe.Genre = req.body.Genre;
    if (recipe.Source)
        recipe.Source = req.body.Source;
    if (recipe.Page)
        recipe.Page = req.body.Page;
    if (recipe.Rating)
        recipe.Rating = req.body.Rating;
    if (recipe.Recipe)
        recipe.Recipe = req.body.Recipe;
    if (recipe.Ingredients)
        recipe.Ingredients = req.body.Ingredients;
    res.send(recipe);
});
app.delete("/recipes/:id", (req, res) => {
    const recipe = recipes.find((r) => r.id === parseInt(req.params.id));
    if (!recipe)
        return res.status(404).send("The recipe with given ID was not found");
    const index = recipes.indexOf(recipe);
    recipes.splice(index, 1);
    res.send(recipe);
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
//# sourceMappingURL=index.js.map