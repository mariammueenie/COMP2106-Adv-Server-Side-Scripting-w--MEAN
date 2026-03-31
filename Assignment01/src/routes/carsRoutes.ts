import express, { Router } from "express";
import {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar
} from "../controllers/cars";

const router: Router = express.Router();

// keep all route mappings here so app.ts stays cleaner
router.get("/", getCars);
router.get("/:id", getCarById);
router.post("/", createCar);
router.put("/:id", updateCar);
router.delete("/:id", deleteCar);

export default router;