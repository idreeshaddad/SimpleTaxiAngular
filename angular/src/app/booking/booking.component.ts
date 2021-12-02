import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Booking } from '../shared/models/Booking';
import { BookingDeleteDialogComponent } from './booking-delete-dialog/booking-delete-dialog.component';
import { BookingService } from './booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  
  bookings!: Booking[];
  showSpinner: boolean = true;
  
  constructor(
    private bookingSvc: BookingService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    
    this.getBookings();

  }

  deleteBooking(id: number): void {
    const dialogRef = this.dialog.open(BookingDeleteDialogComponent, {
      width: '460px'
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if(result) {

        this.bookingSvc.deleteBooking(id).subscribe(
          res => {
            this.snackbar.open("Passenger has been deleted successfully");
            this.getBookings();
          },
          err => {
            this.snackbar.open("Server Error!!");

          }
        );
      }

    });
  }

  //#region Private Functions

  private getBookings() {

    this.bookingSvc.getBookings().subscribe(
      bookingsFromServer => {
        this.bookings = bookingsFromServer;
        this.showSpinner = false;
      }
    );
  }

  //#endregion

}
