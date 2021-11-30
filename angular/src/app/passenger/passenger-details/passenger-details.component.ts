import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Passenger } from 'src/app/shared/models/Passenger';
import { PassengerService } from '../passenger.service';

@Component({
  selector: 'app-passenger-details',
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.css']
})
export class PassengerDetailsComponent implements OnInit {

  passenger!: Passenger;

  constructor(
    private passengerSvc: PassengerService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    const passengerId: number = Number(this.route.snapshot.paramMap.get("id"));

    this.passengerSvc.getPassengerById(passengerId).subscribe(
      passengerFromServer =>
        this.passenger = passengerFromServer
    );
  }

}
