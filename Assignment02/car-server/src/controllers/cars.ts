import { Request, Response } from "express";
import Car from "../models/car";

/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: Cars resource endpoints
 */

/**
 * @swagger
 * /api/v1/cars:
 *   post:
 *     summary: Create a new car
 *     tags: [Cars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - make
 *               - model
 *               - year
 *               - price
 *               - fuelType
 *             properties:
 *               make:
 *                 type: string
 *                 example: Toyota
 *               model:
 *                 type: string
 *                 example: Corolla
 *               year:
 *                 type: integer
 *                 example: 2022
 *               price:
 *                 type: number
 *                 example: 24000
 *               fuelType:
 *                 type: string
 *                 example: Gasoline
 *               serviceRecords:
 *                 type: array
 *     responses:
 *       201:
 *         description: Car created
 *       400:
 *         description: Validation error
 */
export const createCar = async (req: Request, res: Response) => {
  try {
    const createdCar = await Car.create(req.body);
    return res.status(201).json(createdCar);
  } catch (error) {
    return res.status(400).json({
      error: "Create failed",
      details: error
    });
  }
};

/**
 * @swagger
 * /api/v1/cars:
 *   get:
 *     summary: Get all cars
 *     tags: [Cars]
 *     parameters:
 *       - in: query
 *         name: make
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: fuelType
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of cars
 *       404:
 *         description: No cars found
 */
export const getCars = async (req: Request, res: Response) => {
  try {
    const filter: Record<string, string> = {};

    if (typeof req.query.make === "string") {
      filter.make = req.query.make;
    }

    if (typeof req.query.fuelType === "string") {
      filter.fuelType = req.query.fuelType;
    }

    const cars = await Car.find(filter).sort({ createdAt: -1 });

    if (cars.length === 0) {
      return res.status(404).json({ error: "No cars found" });
    }

    return res.status(200).json(cars);
  } catch (error) {
    return res.status(500).json({
      error: "Fetch failed",
      details: error
    });
  }
};

/**
 * @swagger
 * /api/v1/cars/{id}:
 *   get:
 *     summary: Get one car by id
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Car found
 *       404:
 *         description: Car not found
 *       400:
 *         description: Invalid id
 */
export const getCarById = async (req: Request, res: Response) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    return res.status(200).json(car);
  } catch (error) {
    return res.status(400).json({
      error: "Invalid id",
      details: error
    });
  }
};

/**
 * @swagger
 * /api/v1/cars/{id}:
 *   put:
 *     summary: Update a car by id
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               make:
 *                 type: string
 *               model:
 *                 type: string
 *               year:
 *                 type: integer
 *               price:
 *                 type: number
 *               fuelType:
 *                 type: string
 *               serviceRecords:
 *                 type: array
 *     responses:
 *       200:
 *         description: Car updated
 *       404:
 *         description: Car not found
 *       400:
 *         description: Validation error
 */
export const updateCar = async (req: Request, res: Response) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    car.set(req.body);

    await car.validate();
    await car.save();

    return res.status(200).json(car);
  } catch (error) {
    return res.status(400).json({
      error: "Update failed",
      details: error
    });
  }
};

/**
 * @swagger
 * /api/v1/cars/{id}:
 *   delete:
 *     summary: Delete a car by id
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Car deleted
 *       404:
 *         description: Car not found
 *       400:
 *         description: Delete failed
 */
export const deleteCar = async (req: Request, res: Response) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    await car.deleteOne();

    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({
      error: "Delete failed",
      details: error
    });
  }
};

/**
 * @swagger
 * /api/v1/cars/{id}/service-records:
 *   post:
 *     summary: Add a service record to a car
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - serviceType
 *               - serviceDate
 *               - cost
 *               - notes
 *             properties:
 *               serviceType:
 *                 type: string
 *                 example: Oil Change
 *               serviceDate:
 *                 type: string
 *                 example: 2026-03-31
 *               cost:
 *                 type: number
 *                 example: 79.99
 *               notes:
 *                 type: string
 *                 example: Changed oil and filter
 *     responses:
 *       201:
 *         description: Service record added
 *       404:
 *         description: Car not found
 *       400:
 *         description: Validation error
 */
export const addServiceRecord = async (req: Request, res: Response) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    car.serviceRecords.push(req.body);

    await car.validate();
    await car.save();

    return res.status(201).json(car);
  } catch (error) {
    return res.status(400).json({
      error: "Add service record failed",
      details: error
    });
  }
};