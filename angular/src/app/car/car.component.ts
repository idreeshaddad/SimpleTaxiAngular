import { Component, OnInit } from '@angular/core';
import { CarType } from '../shared/enums/CarType.enum';
import { FuelType } from '../shared/enums/FuelType.enum';
import { Car } from '../shared/models/Car';
import { CarService } from './car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars!: Car[];
  carType = CarType;
  fuelType = FuelType;

  constructor(private carSvc: CarService) { }

  ngOnInit(): void {
    
    this.carSvc.getCars().subscribe( 
      cars => {
        this.cars = cars;
      }
    );

  }

}
