import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarAddEditComponent } from './car/car-add-edit/car-add-edit.component';
import { CarDetailsComponent } from './car/car-details/car-details.component';
import { CarComponent } from './car/car.component';
import { DriverAddEditComponent } from './driver/driver-add-edit/driver-add-edit.component';
import { DriverDetailsComponent } from './driver/driver-details/driver-details.component';
import { DriverComponent } from './driver/driver.component';
import { HomeComponent } from './home/home.component';
import { PassengerAddEditComponent } from './passenger/passenger-add-edit/passenger-add-edit.component';
import { PassengerDetailsComponent } from './passenger/passenger-details/passenger-details.component';
import { PassengerComponent } from './passenger/passenger.component';

const routes: Routes = [
  { path: 'cars', component: CarComponent },
  { path: 'cars/add', component: CarAddEditComponent }, // Works ONLY car/add
  { path: 'cars/:id', component: CarDetailsComponent }, // Works car/8 or car/[ANYTHING]
  { path: 'cars/edit/:id', component: CarAddEditComponent },
  
  { path: 'drivers', component: DriverComponent },
  { path: 'drivers/add', component: DriverAddEditComponent },
  { path: 'drivers/:id', component: DriverDetailsComponent },
  { path: 'drivers/edit/:id', component: DriverAddEditComponent },

  { path: 'passengers', component: PassengerComponent},
  { path: 'passengers/add', component: PassengerAddEditComponent },
  { path: 'passengers/:id', component: PassengerDetailsComponent },
  { path: 'passengers/edit/:id', component: PassengerAddEditComponent },

  // Wildcard ** should be the last route
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
