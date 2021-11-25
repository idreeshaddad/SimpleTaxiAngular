import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Driver } from 'src/app/shared/models/Driver';
import { DriverService } from '../driver.service';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.css']
})
export class DriverDetailsComponent implements OnInit {

  detailsDriver!: Driver;

  constructor(
    private driverSvc: DriverService, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    const driverId = Number(this.route.snapshot.paramMap.get('id'));


    this.driverSvc.getDriverById(driverId).subscribe(
      driverFromServer => {
        this.detailsDriver = driverFromServer;
      }
    );
  }

}
