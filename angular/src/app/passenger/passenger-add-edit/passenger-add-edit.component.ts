import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMode } from 'src/app/shared/enums/pageMode.enum';
import { PassengerService } from '../passenger.service';

@Component({
  selector: 'app-passenger-add-edit',
  templateUrl: './passenger-add-edit.component.html',
  styleUrls: ['./passenger-add-edit.component.css']
})
export class PassengerAddEditComponent implements OnInit {

  pageModeEnum = PageMode;

  passengerId: number = 0;
  pageMode: PageMode = PageMode.Add;

  passengerForm = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    email: [''],
    phoneNumber: ['', Validators.required],
    gender: ['', Validators.required]
  });

  constructor(
    private passengerSvc: PassengerService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.setPageMode();

    if (this.pageMode == PageMode.Edit) {
      this.preparePageForEdit();
    }

  }

  submitForm(): void {

    if (this.passengerForm.valid) {

      if (this.pageMode == PageMode.Add) {

        this.passengerSvc.createPassenger(this.passengerForm.value).subscribe(
          res => {
            this.snackBar.open("Passenger has been created successfully");
            this.router.navigate(["/passengers"]);
          },
          err => {
            this.snackBar.open("Server Error!!");
          }
        );
      }
      else {

        this.passengerSvc.editPassenger(this.passengerForm.value).subscribe(
          res => {
            this.snackBar.open("Passenger has been edited successfully");
            this.router.navigate(["/passengers"]);
          },
          err => {
            this.snackBar.open("Server Error!!");
          }
        );
      }

    }

  }

  private setPageMode() {

    if (this.route.snapshot.paramMap.get('id')) {

      this.passengerId = Number(this.route.snapshot.paramMap.get('id'));
      this.pageMode = PageMode.Edit;
    }
  }

  private preparePageForEdit() {

    this.passengerSvc.getPassengerById(this.passengerId).subscribe(
      passengerFromServer => {
        this.passengerForm.patchValue({
          id: passengerFromServer.id,
          name: passengerFromServer.name,
          email: passengerFromServer.email,
          phoneNumber: passengerFromServer.phoneNumber,
          gender: passengerFromServer.gender
        });
      }
    );

  }

}
