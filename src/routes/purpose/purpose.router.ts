import express from "express";
import type { Request, Response } from "express";
import Joi from "joi";

import * as PurposeServie from "./purpose.service";
import { matchedData, param, validationResult } from "express-validator";

export const purposeRouter = express.Router();

const schema = Joi.object({
  purpose: Joi.string().required(),
});

// GET: List of all purposes

purposeRouter.get("/", async (req: Request, res: Response) => {
  try {
    const purposes = await PurposeServie.listPurposes();
    return res.status(200).send(purposes);
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
});

// GET: Single purpose by id
// Params: id
purposeRouter.get(
  "/:id",
  param("id").trim().notEmpty().isNumeric(),
  async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send("Invalid ID");
    }

    const { id } = matchedData(req, { locations: ["params"] });
    try {
      const purpose = await PurposeServie.getPurpose(parseInt(id));
      if (purpose) {
        return res.status(200).send(purpose);
      }
      return res.status(404).send("Purpose could not be found");
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
);

// POST: new purpose
// Params: purpose
purposeRouter.post("/", async (req: Request, res: Response) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }

  try {
    const purpose = req.body;
    const new_purpose = await PurposeServie.createPurpose(purpose);
    return res.status(201).send(new_purpose);
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
});

// PUT: Update a purpose
// Params: purpose
purposeRouter.put(
  "/:id",
  param("id").trim().notEmpty().isNumeric(),
  async (req: Request, res: Response) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).send(error.message);
    }
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send("Invalid ID");
    }

    const { id } = matchedData(req, { locations: ["params"] });
    try {
      const purpose = req.body;
      const updatedPurpose = await PurposeServie.updatePurpose(
        purpose,
        parseInt(id)
      );
      return res.status(200).send(updatedPurpose);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
);

// DELETE: delete a purpose
// Params: id
purposeRouter.delete(
  "/:id",
  param("id").trim().notEmpty().isNumeric(),
  async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send("Invalid ID");
    }

    const { id } = matchedData(req, { locations: ["params"] });
    try {
      await PurposeServie.deletePurpose(parseInt(id));
      return res.status(204).send("Purpose has been successfully deleted");
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
);
