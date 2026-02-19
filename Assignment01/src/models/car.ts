import mongoose, { Schema } from "mongoose";

// Mongoose schema = what a Car must look like in MongoDB
const CarSchema = new Schema(
  {
    // make of car: required string, trimmed, at least 2 characters
    make: { type: String, required: true, trim: true, minlength: 2 },

    // model of car: required string, trimmed
    model: { type: String, required: true, trim: true, minlength: 1 },

    // year of car: required number with validation range
    year: {
      type: Number,
      required: true,
      min: 1886, // first real car year
      max: new Date().getFullYear() + 1 // allow next year's models
    }
  },
  {
    // timestamps adds createdAt and updatedAt automatically
    timestamps: true
  }
);

// export the model so controllers can do Car.find(), Car.create(), etc.
export default mongoose.model("Car", CarSchema);
