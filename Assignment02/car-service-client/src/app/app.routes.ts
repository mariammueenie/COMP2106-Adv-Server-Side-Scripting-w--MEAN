import { Routes } from '@angular/router';

import { Home } from './components/home/home';
import { CarsList } from './components/cars-list/cars-list';
import { AddCar } from './components/add-car/add-car';
import { EditCar } from './components/edit-car/edit-car';

export const routes: Routes =  [
    { path: '', component: Home, title: 'Home' },
    { path: 'cars', component: CarsList, title: 'Cars' },
    { path: 'cars/add', component: AddCar, title: 'Add Car' },
    { path: 'cars/edit/:id', component: EditCar, title: 'Edit Car' }
  ];
