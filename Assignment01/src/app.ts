import express, { Application } from "express";

const app: Application = express();

app.get("/", (req, res) => {
  res.send("Cars API is running...");
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
