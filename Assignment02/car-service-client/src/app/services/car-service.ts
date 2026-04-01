import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Car, ServiceRecord } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private serverUrl = environment.serverUrl;

  constructor(private http: HttpClient) {}

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.serverUrl}/api/v1/cars`);
  }

  getCarById(id: string): Observable<Car> {
    return this.http.get<Car>(`${this.serverUrl}/api/v1/cars/${id}`);
  }

  createCar(car: Car): Observable<Car> {
    return this.http.post<Car>(`${this.serverUrl}/api/v1/cars`, car);
  }

  updateCar(id: string, car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.serverUrl}/api/v1/cars/${id}`, car);
  }

  deleteCar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.serverUrl}/api/v1/cars/${id}`);
  }

  addServiceRecord(id: string, record: ServiceRecord): Observable<Car> {
    return this.http.post<Car>(`${this.serverUrl}/api/v1/cars/${id}/service-records`, record);
  }
}