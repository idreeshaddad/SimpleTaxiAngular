import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarAddEditComponent } from './car/car-add-edit/car-add-edit.component';
import { CarDetailsComponent } from './car/car-details/car-details.component';
import { CarComponent } from './car/car.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'car', component: CarComponent },
  { path: 'car/add', component: CarAddEditComponent }, // Works ONLY car/add
  { path: 'car/:id', component: CarDetailsComponent }, // Works car/8 or car/[ANYTHING]
  { path: 'car/edit/:id', component: CarAddEditComponent },
  // Wildcard ** should be the last route
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
