import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMode } from 'src/app/shared/enums/pageMode.enum';
import { Driver } from 'src/app/shared/models/Driver';
import { DriverService } from '../driver.service';

@Component({
  selector: 'app-driver-add-edit',
  templateUrl: './driver-add-edit.component.html',
  styleUrls: ['./driver-add-edit.component.css']
})
export class DriverAddEditComponent implements OnInit {

  pageModeEnum = PageMode;

  driverId: number = 0;
  pageMode: PageMode = PageMode.Add;

  driverForm = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    email: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    rating: ['', Validators.required],
    gender: ['', Validators.required]
  });
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private driverSvc: DriverService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.setPageMode();

    if (this.pageMode == PageMode.Edit) {
      this.preparePageForEditMode();
    }

  }

  addEditDriver(): void {

    if (this.driverForm.valid) {

      const driver: Driver = this.driverForm.value;

      if (this.pageMode == PageMode.Add) {
        this.driverSvc.createDriver(driver).subscribe(
          res => {
            this.snackBar.open("Driver has been created successfully");
            this.router.navigate(["/drivers"]);
          }
        )
      }
      else {
        this.driverSvc.editDriver(driver).subscribe(
          res => {
            this.snackBar.open("Driver has been updated successfully");
            this.router.navigate(["/drivers"]);
          }
        );
      }
    }
  }

  //#region Private functions

  private setPageMode(): void {

    if (this.route.snapshot.paramMap.get("id")) {
      this.driverId = Number(this.route.snapshot.paramMap.get("id"));
      this.pageMode = PageMode.Edit;
    }
  }

  private preparePageForEditMode(): void {

    this.driverSvc.getDriverById(this.driverId).subscribe(
      driver => {

        this.driverForm.patchValue({
          id: driver.id,
          name: driver.name,
          email: driver.email,
          phoneNumber: driver.phoneNumber,
          rating: driver.rating,
          gender: driver.gender
        });
      }
    );
  }

  //#endregion

}
