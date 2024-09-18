import express from "express";
import type { Request, Response } from "express";
import Joi from "joi";

import * as MethodService from "./method.service";

export const methodRouter = express.Router();

const schema = Joi.object({
  method: Joi.string().required(),
});

// GET: List of all methods

methodRouter.get("/", async (req: Request, res: Response) => {
  try {
    const methods = await MethodService.listMethods();
    return res.status(200).send(methods);
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
});

// GET: Single method by id
// Params: id
methodRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const method = await MethodService.getMethod(id);
    if (method) {
      return res.status(200).send(method);
    }
    return res.status(404).send("Method could not be found");
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
});

// POST: new method
// Params: method
methodRouter.post("/", async (req: Request, res: Response) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }

  try {
    const method = req.body;
    const new_method = await MethodService.createMethod(method);
    return res.status(201).send(new_method);
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
});

// PUT: Update a method
// Params: method
methodRouter.put("/:id", async (req: Request, res: Response) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  const id: number = parseInt(req.params.id, 10);
  try {
    const method = req.body;
    const updatedMethod = await MethodService.updateMethod(method, id);
    return res.status(200).send(updatedMethod);
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
});

// DELETE: delete a method
// Params: id
methodRouter.delete("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    await MethodService.deleteMethod(id);
    return res.status(204).send("Method has been successfully deleted");
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
});
