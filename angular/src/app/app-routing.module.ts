import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailsComponent } from './car/car-details/car-details.component';
import { CarComponent } from './car/car.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'car', component: CarComponent },
  { path: 'car/:id', component: CarDetailsComponent },
  // Wildcard ** should be the last route
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
