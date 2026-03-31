// .\controllers\cars.ts as opposed to
// .\models\car.ts , since latter models 1 car,
// while former controls many cars (CRUD operations on collection of cars)

import { Request, Response } from "express";
import Car from "../models/car";

/**
 * NOTE:
 * These Swagger blocks are what build your docs at /api-docs.
 * You can keep them above each route handler like this.
 */

/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: Cars resource endpoints
 */

/**
 * CREATE - POST /api/cars
 * Adds a new car to MongoDB.
 */

/**
 * @swagger
 * /api/cars:
 *   post:
 *     summary: Create a new car
 *     tags: [Cars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [make, model, year]
 *             properties:
 *               make: { type: string, example: Toyota }
 *               model: { type: string, example: Corolla }
 *               year: { type: integer, example: 2020 }
 *     responses:
 *       201: { description: Created }
 *       400: { description: Validation error }
 */
export const createCar = async (req: Request, res: Response) => {
  try {
    // Car.create() validates against the schema rules in models/car.ts
    const created = await Car.create(req.body);

    // 201 = Created
    return res.status(201).json(created);
  } catch (err) {
    // Bad input (missing make/model/year, invalid year, etc.)
    return res.status(400).json({ error: "Create failed", details: err });
  }
};

/**
 * READ ALL - GET /api/cars
 * Returns a list of all cars.
 */

/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Get all cars
 *     tags: [Cars]
 *     responses:
 *       200: { description: OK }
 */
export const getCars = async (_req: Request, res: Response) => {
  try {
    // Find all cars, newest first (optional but nice)
    const cars = await Car.find().sort({ createdAt: -1 });
    return res.status(200).json(cars);
  } catch (err) {
    return res.status(500).json({ error: "Fetch failed", details: err });
  }
};

/**
 * READ ONE - GET /api/cars/:id
 * Returns one car by MongoDB ObjectId.
 */

/**
 * @swagger
 * /api/cars/{id}:
 *   get:
 *     summary: Get one car by id
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: MongoDB ObjectId
 *     responses:
 *       200: { description: OK }
 *       404: { description: Not found }
 */
export const getCarById = async (req: Request, res: Response) => {
  try {
    const car = await Car.findById(req.params.id);

    // If the id is valid format but not found in DB
    if (!car) return res.status(404).json({ error: "Car not found" });

    return res.status(200).json(car);
  } catch (err) {
    // If the id format is invalid, Mongoose can throw
    return res.status(400).json({ error: "Invalid id", details: err });
  }
};

/**
 * UPDATE - PUT /api/cars/:id
 * Updates a car by id. You can update any fields you send in JSON.
 */

/**
 * @swagger
 * /api/cars/{id}:
 *   put:
 *     summary: Update a car by id
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               make: { type: string, example: Honda }
 *               model: { type: string, example: Civic }
 *               year: { type: integer, example: 2021 }
 *     responses:
 *       200: { description: Updated }
 *       404: { description: Not found }
 *       400: { description: Validation error }
 */
export const updateCar = async (req: Request, res: Response) => {
  try {
    const updated = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,          // return the updated document
      runValidators: true // IMPORTANT: re-run schema validation on update
    });

    if (!updated) return res.status(404).json({ error: "Car not found" });

    return res.status(200).json(updated);
  } catch (err) {
    return res.status(400).json({ error: "Update failed", details: err });
  }
};

/**
 * DELETE - DELETE /api/cars/:id
 * Deletes a car by id.
 */

/**
 * @swagger
 * /api/cars/{id}:
 *   delete:
 *     summary: Delete a car by id
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204: { description: Deleted (no content) }
 *       404: { description: Not found }
 */
export const deleteCar = async (req: Request, res: Response) => {
  try {
    const deleted = await Car.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ error: "Car not found" });

    // 204 = success, but no JSON body returned
    return res.status(204).send();
  } catch (err) {
    return res.status(400).json({ error: "Delete failed", details: err });
  }
};
