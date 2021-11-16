import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMode } from 'src/app/shared/enums/pageMode.enum';
import { Car } from 'src/app/shared/models/Car';
import { CarService } from '../car.service';

@Component({
  selector: 'app-car-add-edit',
  templateUrl: './car-add-edit.component.html',
  styleUrls: ['./car-add-edit.component.css']
})
export class CarAddEditComponent implements OnInit {

  pageModeEnum = PageMode;

  carId: number = 0;
  pageMode: PageMode = PageMode.Add;

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
    private carSvc: CarService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.setPageMode();

    if (this.pageMode == PageMode.Edit) {
      this.preparePageForEditMode();
    }
  }

  addEditCar(): void {

    if (this.carForm.valid) {

      const car: Car = this.carForm.value;

      if (this.pageMode == PageMode.Add) {
        this.carSvc.createCar(car).subscribe(
          res => {
            this.snackBar.open("Car has been created successfully");
            this.router.navigate(["/car"]);
          }
        )
      }
      else {
        this.carSvc.editCar(car).subscribe( 
          res => {
            this.snackBar.open("Car has been updated successfully");
            this.router.navigate(["/car"]);
          }
        );
      }
    }
  }

  //#region Private functions

  private setPageMode(): void {

    if (this.route.snapshot.paramMap.get("id")) {
      this.carId = Number(this.route.snapshot.paramMap.get("id"));
      this.pageMode = PageMode.Edit;
    }
  }

  private preparePageForEditMode(): void {

    this.carSvc.getCarById(this.carId).subscribe(
      car => {

        this.carForm.patchValue({
          id: car.id,
          plateNumber: car.plateNumber,
          name: car.name,
          model: car.model,
          makeYear: car.makeYear,
          fuelType: car.fuelType,
          carType: car.carType
        });
      }
    );
  }

  // private getLookups(): void {

  //   this.getBrands();
  //   this.getCountries();
  // }

  // private getCountries(): void {

  //   this.CarsSvc.getCountries().subscribe(countries => {

  //     this.countries = countries;

  //     this.filteredCountries = this.carForm.controls.country.valueChanges
  //       .pipe(
  //         startWith(''),
  //         map(value => typeof value === 'string' ? value : value.name),
  //         map(name => name ? this.filterCountry(name) : this.countries.slice())
  //       );
  //   })
  // }

  // private filterCountry(name: string): Country[] {

  //   const filterValue = name.toLowerCase();
  //   return this.countries.filter(country => country.name.toLowerCase().includes(filterValue));
  // }

  // private getBrands(): void {

  //   this.CarsSvc.getBrands().subscribe(brands => {

  //     this.brands = brands;
  //   })
  // }

  // private getCarModels(brandId: number): void {

  //   this.CarsSvc.getCarModels(brandId).subscribe(carModel => {
  //     this.carModels = carModel;
  //   })
  // }

  //#endregion

}
