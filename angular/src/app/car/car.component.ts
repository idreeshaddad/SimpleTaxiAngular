import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarType } from '../shared/enums/CarType.enum';
import { FuelType } from '../shared/enums/FuelType.enum';
import { Car } from '../shared/models/Car';
import { CarService } from './car.service';
import { DeleteCarDialogComponent } from './delete-car-dialog/delete-car-dialog.component';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  myBeautifulCars!: Car[];
  carType = CarType;
  fuelType = FuelType;

  constructor(
    private carSvc: CarService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    this.getCars();

  }

  deleteCar(id: number): void {

    const dialogRef = this.dialog.open(DeleteCarDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.carSvc.deleteCar(id).subscribe(
          res => {
            this.snackBar.open("Car has been deleted successfully");
            this.getCars();
          },
          err => {
            this.snackBar.open("INTERNAL SERVER ERROR 500");
          }
    
        );

      }
    });
  }

  private getCars(): void {

    this.carSvc.getCars().subscribe(
      cars => {
        this.myBeautifulCars = cars;
      }
    );
  }

}
