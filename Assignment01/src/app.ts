// Basic app functions (fix up later)

import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import carsRoutes from "./routes/carsRoutes";

// load values from .env before trying to use them
dotenv.config();

const app: Application = express();

// parse incoming JSON bodies
app.use(express.json());

// allow requests from other apps later on too
// this also helps for assignment 2 when Angular starts talking to this API
app.use(cors());

// basic swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cars API",
      version: "1.0.0",
      description: "A REST API for managing car records with Node, Express, TypeScript, and MongoDB."
    }
  },
  // include both src and dist so docs work during local dev and after build
  apis: ["./src/controllers/*.ts", "./dist/controllers/*.js"]
};

const openApiSpecs = swaggerJsDoc(swaggerOptions);

// swagger docs page
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiSpecs));

// simple root route so the browser shows something useful
app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Cars API is running",
    docs: "/api-docs"
  });
});

// mount the cars resource routes
app.use("/api/v1/cars", carsRoutes);

const PORT = Number(process.env.PORT) || 4000;
const DB = process.env.DB;

// start everything in the right order:
// 1) confirm we have a DB string
// 2) connect to mongoDB
// 3) start the express server
const startServer = async () => {
  if (!DB) {
    console.error("Missing DB connection string in .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(DB);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Cars API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();

export default app;
