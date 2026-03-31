import mongoose, { Schema } from "mongoose";

// one nested child record for car service record
interface ServiceRecord {
  serviceType: string;
  serviceDate: string;
  cost: number;
  notes: string;
}

// this interface gives TypeScript a clear shape for one car
// main parent document for car
interface Car {
  make: string;
  model: string;
  year: number;
  price: number;
  fuelType: string;
  serviceRecords: ServiceRecord[];
}

// nested schema for related child data
const serviceRecordSchema = new Schema<ServiceRecord>(
  {
    serviceType: {
      type: String,
      required: [true, "Service type is required"],
      trim: true,
      minlength: 2
    },
    serviceDate: {
      type: String,
      required: [true, "Service date is required"],
      trim: true
    },
    cost: {
      type: Number,
      required: [true, "Cost is required"],
      min: 0
    },
    notes: {
      type: String,
      required: [true, "Notes are required"],
      trim: true,
      minlength: 2
    }
  },
  {
    timestamps: true
  }
);

// defines what a car document should look like in MongoDB
// main car schema
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
    },

    // related child data for serviceRecord
    serviceRecords: {
      type: [serviceRecordSchema],
      default: []
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