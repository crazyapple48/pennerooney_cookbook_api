import express from "express";
import type { Request, Response } from "express";
import Joi from "joi";

import * as GenreService from "./genre.service";

export const genreRouter = express.Router();

const schema = Joi.object({
  genre: Joi.string().required(),
});

// GET: List of all genres

genreRouter.get("/", async (req: Request, res: Response) => {
  try {
    const genres = await GenreService.listGenres();
    return res.status(200).send(genres);
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
});

// GET: Single genre by id

genreRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const genre = await GenreService.getGenre(id);
    if (genre) {
      return res.status(200).send(genre);
    }
    return res.status(404).send("Genre could not be found");
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
});

// POST: new genre

genreRouter.post("/", async (req: Request, res: Response) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }

  try {
    const genre = req.body;
    const new_genre = await GenreService.createGenre(genre);
    return res.status(201).send(new_genre);
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
});

// PUT: Update a genre
// Params: genre
genreRouter.put("/:id", async (req: Request, res: Response) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  const id: number = parseInt(req.params.id, 10);
  try {
    const genre = req.body;
    const updatedGenre = await GenreService.updateGenre(genre, id);
    return res.status(200).send(updatedGenre);
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
});

// DELETE: delete a genre
// Params: id
genreRouter.delete("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    await GenreService.deleteGenre(id);
    return res.status(204).send("Genre has been successfully deleted");
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
});
