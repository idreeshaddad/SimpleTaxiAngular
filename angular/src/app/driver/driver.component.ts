import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Driver } from '../shared/models/Driver';
import { DriverDeleteDialogComponent } from './driver-delete-dialog/driver-delete-dialog.component';
import { DriverService } from './driver.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  drivers!: Driver[];
  showSpinner: boolean = true;

  constructor(
    private driverSvc: DriverService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    this.getDrivers();
  }

  deleteDriver(id: number): void {

    const dialogRef = this.dialog.open(DriverDeleteDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.driverSvc.deleteDriver(id).subscribe(
          res => {
            this.snackBar.open("Driver has been deleted successfully");
            this.getDrivers();
          },
          err => {
            this.snackBar.open("INTERNAL SERVER ERROR 500");
          }
        );

      }
    });
  }

  private getDrivers(): void {

    this.driverSvc.getDrivers().subscribe(
      driversFromServer => {
        this.drivers = driversFromServer;
        this.showSpinner = false;
      }
    );

  }

}
