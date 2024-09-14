"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv").config();
const app = (0, express_1.default)();
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
    res.send(recipes);
});
app.get("/recipes/:id", (req, res) => {
    const recipe = recipes.find((r) => {
        r.id === parseInt(req.params.id);
    });
    if (recipe) {
        res.send(recipe);
    }
    else {
        res.status(404).send("The course with given ID was not found");
    }
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
//# sourceMappingURL=index.js.map