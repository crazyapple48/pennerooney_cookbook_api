const request = require("supertest");
import { Recipe } from "@prisma/client";
import { db } from "../../src/utils/db.server";
import type {
  RecipeWrite,
  RecipeRead,
} from "../../src/routes/recipe/recipe.service";
let server: any;

describe("/recipes", () => {
  let recipe1: RecipeWrite;
  let recipe2: RecipeWrite;

  beforeEach(async () => {
    server = require("../../src/index");
    const { id: method_id } = await db.method.create({
      data: { method: "method1" },
    });
    const { id: genre_id } = await db.genre.create({
      data: { genre: "genre1" },
    });
    const { id: purpose_id } = await db.purpose.create({
      data: { purpose: "purpose1" },
    });
    const { id: source_id } = await db.source.create({
      data: { source: "source1", hasManyRecipes: false },
    });

    recipe1 = {
      title: "Recipe1",
      page: 1,
      rating: 1,
      recipe: "1. Instructions",
      ingredients: "List of ingredients",
      nickelaLevel: 1,
      isFavorite: true,
      methodId: method_id,
      purposeId: purpose_id,
      genreId: genre_id,
      sourceId: source_id,
    };

    recipe2 = {
      title: "Recipe2",
      page: 1,
      rating: 1,
      recipe: "1. Instructions",
      ingredients: "List of ingredients",
      nickelaLevel: 1,
      isFavorite: true,
      methodId: method_id,
      purposeId: purpose_id,
      genreId: genre_id,
      sourceId: source_id,
    };
  });
  afterEach(async () => {
    server.close();
    await db.recipe.deleteMany();
    await db.genre.deleteMany();
    await db.purpose.deleteMany();
    await db.method.deleteMany();
    await db.source.deleteMany();
  });

  describe("GET /", () => {
    it("should return all recipes", async () => {
      await db.recipe.createMany({
        data: [recipe1, recipe2],
      });

      const res = await request(server).get("/recipes");

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((r: Recipe) => r.title === "Recipe1")).toBeTruthy();
      expect(res.body.some((r: Recipe) => r.title === "Recipe2")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return one recipe if valid id is passed", async () => {
      const recipe = await db.recipe.create({
        data: recipe1,
        select: { id: true, recipe: true },
      });

      const res = await request(server).get("/recipes/" + recipe.id);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(recipe);
    });

    it("should return 400 if invalid id is passed", async () => {
      const res = await request(server).get("/recipes/i");

      expect(res.status).toBe(400);
    });

    it("should return 404 if recipe with given ID is not found", async () => {
      const res = await request(server).get("/recipes/1");

      expect(res.status).toBe(404);
    });
  });

  describe("POST /", () => {
    it("should return 400 if invalid recipe was sent", async () => {
      let recipe = recipe1;
      recipe.page = -1;

      const res = await request(server).post("/recipes").send(recipe);

      expect(res.status).toBe(400);
    });

    it("Should save the recipe if it's valid", async () => {
      await request(server).post("/recipes").send(recipe1);

      const check_recipe = db.recipe.findFirst({
        where: { recipe: "recipe1" },
      });

      expect(check_recipe).not.toBeNull();
    });

    it("Should return the recipe if it's valid", async () => {
      const res = await request(server).post("/recipes").send(recipe1);

      console.log(res.body);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("title", "Recipe1");
    });
  });

  describe("PUT /:id", () => {
    it("Should return 400 if invalid object was sent", async () => {
      const recipe = recipe1;
      recipe.page = -1;

      const id = await db.recipe.create({ data: recipe, select: { id: true } });

      const res = await request(server).put("/recipes/" + id);

      expect(res.status).toBe(400);
    });

    it("Should return 400 if invalid ID was given", async () => {
      const res = await request(server).put("/recipes/i");

      expect(res.status).toBe(400);
    });

    it("Should update the recipe if it's valid", async () => {
      await db.recipe.create({ data: recipe1 });

      const res = await request(server).put("/recipes").send(recipe2);

      const check_recipe = db.recipe.findFirst({
        where: { recipe: "recipe2" },
      });

      expect(check_recipe).not.toBeNull();
    });

    it("Should return the new recipe if it's valid", async () => {
      await db.recipe.create({ data: recipe1 });

      const res = await request(server).post("/recipes").send(recipe2);

      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("title", "Recipe2");
    });
  });

  describe("DELETE /:id", () => {
    it("Should return 400 if invalid ID", async () => {
      const res = await request(server).delete("/recipes/i");

      expect(res.status).toBe(400);
    });

    it("Should delete recipe if id is valid", async () => {
      const { id } = await db.recipe.create({
        data: recipe1,
        select: { id: true },
      });

      const res = await request(server).delete("/recipes/" + id);

      const check_recipe = await db.recipe.findFirst({ where: { id: id } });

      expect(check_recipe).toBeNull;
    });
  });
});
