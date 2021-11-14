import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarType } from 'src/app/shared/enums/CarType.enum';
import { FuelType } from 'src/app/shared/enums/FuelType.enum';
import { Car } from 'src/app/shared/models/Car';
import { CarService } from '../car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  detailsCar!: Car;
  fuelType = FuelType;
  carType = CarType;

  constructor(private carSvc: CarService, 
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    const carId = Number(this.route.snapshot.paramMap.get('id'));

    this.carSvc.getCarById(carId).subscribe(
      car => {
        this.detailsCar = car;
      }
    );
  }

}
