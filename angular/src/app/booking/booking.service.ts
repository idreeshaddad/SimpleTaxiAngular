import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../shared/models/Booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  apiUrl: string = "https://localhost:44313/api/Bookings/";

  constructor(private http: HttpClient) { }

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl + "GetBookings");
  }
}
