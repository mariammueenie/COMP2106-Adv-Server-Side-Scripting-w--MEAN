import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Car } from '../../models/car.model';
import { CarService } from '../../services/car-service';

@Component({
  selector: 'app-cars-list',
  imports: [RouterLink],
  templateUrl: './cars-list.html',
  styleUrl: './cars-list.css'
})
export class CarsList implements OnInit {
  cars: Car[] = [];
  errorMessage = '';

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.getCars();
  }

  getCars(): void {
    this.carService.getCars().subscribe({
      next: (data) => {
        this.cars = data;
        this.errorMessage = '';
      },
      error: () => {
        this.cars = [];
        this.errorMessage = 'Could not load cars.';
      }
    });
  }

  deleteCar(id: string): void {
    const confirmed = confirm('Are you sure you want to delete this car?');

    if (!confirmed) {
      return;
    }

    this.carService.deleteCar(id).subscribe({
      next: () => {
        this.getCars();
      },
      error: () => {
        this.errorMessage = 'Delete failed.';
      }
    });
  }
}