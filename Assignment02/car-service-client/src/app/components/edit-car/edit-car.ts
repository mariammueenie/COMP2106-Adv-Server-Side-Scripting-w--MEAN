import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Car, ServiceRecord } from '../../models/car.model';
import { CarService } from '../../services/car-service';

@Component({
  selector: 'app-edit-car',
  imports: [FormsModule],
  templateUrl: './edit-car.html',
  styleUrl: './edit-car.css'
})
export class EditCar implements OnInit {
  errorMessage = '';
  successMessage = '';
  carId = '';

  car: Car = {
    _id: '',
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    fuelType: 'Gasoline',
    serviceRecords: []
  };

  newServiceRecord: ServiceRecord = {
    serviceType: '',
    serviceDate: '',
    cost: 0,
    notes: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.carId = this.route.snapshot.paramMap.get('id') || '';

    if (!this.carId) {
      this.errorMessage = 'Invalid car id.';
      return;
    }

    this.loadCar();
  }

  loadCar(): void {
    this.carService.getCarById(this.carId).subscribe({
      next: (data) => {
        this.car = data;
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Could not load car.';
      }
    });
  }

  updateCar(): void {
    this.carService.updateCar(this.carId, this.car).subscribe({
      next: () => {
        this.successMessage = 'Car updated successfully.';
        this.errorMessage = '';
      },
      error: () => {
        this.successMessage = '';
        this.errorMessage = 'Update failed.';
      }
    });
  }

  addServiceRecord(): void {
    this.carService.addServiceRecord(this.carId, this.newServiceRecord).subscribe({
      next: () => {
        this.successMessage = 'Service record added successfully.';
        this.errorMessage = '';
        this.newServiceRecord = {
          serviceType: '',
          serviceDate: '',
          cost: 0,
          notes: ''
        };
        this.loadCar();
      },
      error: () => {
        this.successMessage = '';
        this.errorMessage = 'Could not add service record.';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/cars']);
  }
}