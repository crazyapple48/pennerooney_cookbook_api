import express from "express";
import type { Request, Response } from "express";
import Joi from "joi";

import * as SourceService from "./source.service";

export const sourceRouter = express.Router();

const schema = Joi.object({
  source: Joi.string().required(),
  hasManyRecipes: Joi.boolean(),
});

// GET: List of all sources

sourceRouter.get("/", async (req: Request, res: Response) => {
  try {
    const sources = await SourceService.listSources();
    return res.status(200).send(sources);
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
});

// GET: Single source by id
// Params: id
sourceRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const source = await SourceService.getSource(id);
    if (source) {
      return res.status(200).send(source);
    }
    return res.status(404).send("Source could not be found");
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
});

// POST: new source
// Params: source
sourceRouter.post("/", async (req: Request, res: Response) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }

  try {
    const source = req.body;
    const new_source = await SourceService.createSource(source);
    return res.status(201).send(new_source);
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
});

// PUT: Update a source
// Params: source
sourceRouter.put("/:id", async (req: Request, res: Response) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  const id: number = parseInt(req.params.id, 10);
  try {
    const source = req.body;
    const updatedSource = await SourceService.updateSource(source, id);
    return res.status(200).send(updatedSource);
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
});

// DELETE: delete a source
// Params: id
sourceRouter.delete("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    await SourceService.deleteSource(id);
    return res.status(204).send("Source has been successfully deleted");
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
});
