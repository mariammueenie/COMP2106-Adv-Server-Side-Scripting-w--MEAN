import mongoose, { Schema } from "mongoose";

// this interface gives TypeScript a clear shape for one car
interface Car {
  make: string;
  model: string;
  year: number;
  price: number;
  fuelType: string;
}

// defines what a car document should look like in MongoDB
// assignment 1 only needs 3+ properties, but using 5 gives us a better base for assignment 2
const carSchema = new Schema<Car>(
  {
    // brand name, like Toyota or Honda
    make: {
      type: String,
      required: [true, "Make is required"],
      trim: true,
      minlength: 2
    },

    // model name, like Corolla or Civic
    model: {
      type: String,
      required: [true, "Model is required"],
      trim: true,
      minlength: 1
    },

    // basic year validation so nobody adds a car from year 20
    year: {
      type: Number,
      required: [true, "Year is required"],
      min: 1886,
      max: new Date().getFullYear() + 1
    },

    // simple positive number check for price
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0
    },

    // keeping this as an enum helps prevent random inconsistent values
    fuelType: {
      type: String,
      required: [true, "Fuel type is required"],
      trim: true,
      enum: ["Gasoline", "Diesel", "Hybrid", "Electric"]
    }
  },
  {
    // createdAt and updatedAt are useful for sorting and checking edits later
    timestamps: true
  }
);

// this creates the Car model so controllers can call find, create, save, etc.
const Car = mongoose.model<Car>("Car", carSchema);

export default Car;