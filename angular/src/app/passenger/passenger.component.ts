import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Passenger } from '../shared/models/Passenger';
import { PassengerDeleteDialogComponent } from './passenger-delete-dialog/passenger-delete-dialog.component';
import { PassengerService } from './passenger.service';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css']
})
export class PassengerComponent implements OnInit {

  passengers!: Passenger[];
  showSpinner: boolean = true;

  constructor(
    private passengerSvc: PassengerService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {

    this.getPassengersList();
  }

  deletePassenger(id: number): void {

    const dialogRef = this.dialog.open(PassengerDeleteDialogComponent, {
      width: '460px'
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if(result) {

        this.passengerSvc.deletePassenger(id).subscribe(
          res => {
            this.snackbar.open("Passenger has been deleted successfully");
            this.getPassengersList();
          },
          err => {
            this.snackbar.open("Server Error!!");

          }
        );
      }

    });

  }


  private getPassengersList(): void {

    this.passengerSvc.getPassengers().subscribe(
      passengerFromServer => {
          this.passengers = passengerFromServer;
          this.showSpinner = false;
      }
    );
  }
}
