import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Car } from '../../models/car.model';
import { CarService } from '../../services/car-service';

@Component({
  selector: 'app-add-car',
  imports: [FormsModule],
  templateUrl: './add-car.html',
  styleUrl: './add-car.css'
})
export class AddCar {
  errorMessage = '';

  car: Car = {
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    fuelType: 'Gasoline',
    serviceRecords: [
      {
        serviceType: '',
        serviceDate: '',
        cost: 0,
        notes: ''
      }
    ]
  };

  constructor(
    private carService: CarService,
    private router: Router
  ) {}

  saveCar(): void {
    const firstRecord = this.car.serviceRecords[0];

    const recordIsBlank =
      !firstRecord.serviceType.trim() &&
      !firstRecord.serviceDate.trim() &&
      firstRecord.cost === 0 &&
      !firstRecord.notes.trim();

    const carToSave: Car = {
      ...this.car,
      serviceRecords: recordIsBlank ? [] : [firstRecord]
    };

    this.carService.createCar(carToSave).subscribe({
      next: () => {
        this.router.navigate(['/cars']);
      },
      error: () => {
        this.errorMessage = 'Could not save car.';
      }
    });
  }
}