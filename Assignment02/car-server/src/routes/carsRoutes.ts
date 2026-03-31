import express, { Router } from "express";
import {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
  addServiceRecord
} from "../controllers/cars";

const router: Router = express.Router();

// keep all route mappings here so app.ts stays cleaner
router.get("/", getCars);
router.get("/:id", getCarById);
router.post("/", createCar);
router.put("/:id", updateCar);
router.delete("/:id", deleteCar);

// child-data route
router.post("/:id/service-records", addServiceRecord);

export default router;