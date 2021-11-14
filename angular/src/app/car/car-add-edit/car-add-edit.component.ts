import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../car.service';

@Component({
  selector: 'app-car-add-edit',
  templateUrl: './car-add-edit.component.html',
  styleUrls: ['./car-add-edit.component.css']
})
export class CarAddEditComponent implements OnInit {

  carForm = this.fb.group({
    id: [0],
    plateNumber: ['', Validators.required],
    name: ['', Validators.required],
    model: ['', Validators.required],
    makeYear: ['', Validators.required],
    fuelType: ['', Validators.required],
    carType: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private carSvc: CarService
  ) { }

  ngOnInit(): void {

    if (this.route.snapshot.paramMap.get('id')) {

      const carId = Number(this.route.snapshot.paramMap.get('id'));

    }
  }

}
