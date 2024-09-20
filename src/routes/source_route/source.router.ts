import express from "express";
import type { Request, Response } from "express";
import Joi from "joi";

import * as SourceService from "./source.service";
import { matchedData, param, validationResult } from "express-validator";

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
sourceRouter.get(
  "/:id",
  param("id").trim().notEmpty().isNumeric(),
  async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send("Invalid ID");
    }

    const { id } = matchedData(req, { locations: ["params"] });
    try {
      const source = await SourceService.getSource(parseInt(id));
      if (source) {
        return res.status(200).send(source);
      }
      return res.status(404).send("Source could not be found");
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
);

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
sourceRouter.put(
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
      const source = req.body;
      const updatedSource = await SourceService.updateSource(
        source,
        parseInt(id)
      );
      return res.status(200).send(updatedSource);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
);

// DELETE: delete a source
// Params: id
sourceRouter.delete(
  "/:id",
  param("id").trim().notEmpty().isNumeric(),
  async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send("Invalid ID");
    }

    const { id } = matchedData(req, { locations: ["params"] });
    try {
      await SourceService.deleteSource(parseInt(id));
      return res.status(204).send("Source has been successfully deleted");
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
);
