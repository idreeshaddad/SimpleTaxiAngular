import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/car/car.service';
import { DriverService } from 'src/app/driver/driver.service';
import { PassengerService } from 'src/app/passenger/passenger.service';
import { PageMode } from 'src/app/shared/enums/pageMode.enum';
import { Car } from 'src/app/shared/models/Car';
import { Driver } from 'src/app/shared/models/Driver';
import { Passenger } from 'src/app/shared/models/Passenger';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-booking-add-edit',
  templateUrl: './booking-add-edit.component.html',
  styleUrls: ['./booking-add-edit.component.css']
})
export class BookingAddEditComponent implements OnInit {

  pageModeEnum = PageMode;

  bookingId: number = 0;
  pageMode: PageMode = PageMode.Add;

  driversLookup!: Driver[];
  carsLookup!: Car[];
  passengersLookup!: Passenger[];

  bookingForm = this.fb.group({
    id: [0],
    pickupTime: ['', Validators.required],
    fromAddress: ['', Validators.required],
    toAddress: ['', Validators.required],
    price: ['', Validators.required],
    isPaid: [false],
    paymentDate: [''],
    carId: [''],
    driverId: [''],
    passengers: ['']
  });

  constructor(
    private bookingSvc: BookingService,
    private driverSvc: DriverService,
    private passengerSvc: PassengerService,
    private carSvc: CarService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.setPageMode();

    if (this.pageMode == PageMode.Edit) {
      this.preparePageForEdit();
    }

    this.getLookups();
  }

  submitForm(): void {

    if (this.bookingForm.valid) {

      if (this.pageMode == PageMode.Add) {

        this.bookingSvc.createBooking(this.bookingForm.value).subscribe(
          res => {
            this.snackBar.open("Booking has been created successfully");
            this.router.navigate(["/bookings"]);
          },
          err => {
            this.snackBar.open("Server Error!!");
          }
        );
      }
      else {

        this.bookingSvc.editBooking(this.bookingForm.value).subscribe(
          res => {
            this.snackBar.open("Booking has been edited successfully");
            this.router.navigate(["/bookings"]);
          },
          err => {
            this.snackBar.open("Server Error!!");
          }
        );
      }

    }

  }

  //#region Private Functions


  private setPageMode() {

    if (this.route.snapshot.paramMap.get('id')) {

      this.bookingId = Number(this.route.snapshot.paramMap.get('id'));
      this.pageMode = PageMode.Edit;
    }
  }

  private preparePageForEdit() {

    this.bookingSvc.getBookingById(this.bookingId).subscribe(
      bookingFromServer => {

        this.bookingForm.patchValue({
          id: bookingFromServer.id,
          pickupTime: bookingFromServer.pickUpTime,
          fromAddress: bookingFromServer.fromAddress,
          toAddress: bookingFromServer.toAddress,
          price: bookingFromServer.price,
          isPaid: bookingFromServer.isPaid,
          paymentDate: bookingFromServer.paymentDate,
          carId: bookingFromServer.carId,
          driverId: bookingFromServer.driverId,
          passengers: bookingFromServer.passengers,
        });
      }
    );
  }

  private getLookups() {
    
    this.getDrivers();
    this.getCars();
    this.getPassengers();
  }

  private getDrivers() {

    this.driverSvc.getDrivers().subscribe(
      driversFromServer => {
        this.driversLookup = driversFromServer;
      }
    );
  }

  private getCars() {

    this.carSvc.getCars().subscribe(
      carsFromServer => {
        this.carsLookup = carsFromServer;
      }
    );
  }

  private getPassengers() {

    this.passengerSvc.getPassengers().subscribe(
      res => {
        this.passengersLookup = res;
      }
    );
  }

  //#endregion
}
