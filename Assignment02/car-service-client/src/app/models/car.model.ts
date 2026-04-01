export interface ServiceRecord {
    serviceType: string;
    serviceDate: string;
    cost: number;
    notes: string;
  }
  
  export interface Car {
    _id?: string;
    make: string;
    model: string;
    year: number;
    price: number;
    fuelType: string;
    serviceRecords: ServiceRecord[];
  }