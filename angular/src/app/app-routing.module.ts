import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailsComponent } from './car/car-details/car-details.component';
import { CarComponent } from './car/car.component';

const routes: Routes = [
  { path: 'car', component: CarComponent },
  { path: 'car/:id', component: CarDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
