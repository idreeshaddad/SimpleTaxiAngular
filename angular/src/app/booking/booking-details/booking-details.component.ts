import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Booking } from 'src/app/shared/models/Booking';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {

  booking!: Booking;

  constructor(
    private bookingSvc: BookingService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    const bookingId: number = Number(this.route.snapshot.paramMap.get("id"));

    this.bookingSvc.getBookingById(bookingId).subscribe(
      res =>
        this.booking = res
    );
  }

}
