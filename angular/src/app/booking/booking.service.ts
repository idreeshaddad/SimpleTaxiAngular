import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../shared/models/Booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  
  private apiUrl: string = "https://localhost:44313/api/Bookings/";

  constructor(private http: HttpClient) { }

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl + "GetBookings");
  }

  getBookingById(id: number): Observable<Booking> {

    return this.http.get<Booking>(this.apiUrl + "GetBookingById/" + id);
  }

  createBooking(booking: Booking): Observable<any> {

    return this.http.post<Booking>(this.apiUrl + "CreateBooking", booking);
  }

  editBooking(booking: Booking): Observable<any> {

    return this.http.put<Booking>(this.apiUrl + "EditBooking/" + booking.id, booking);
  }

  deleteBooking(id: number): Observable<any> {
    return this.http.delete<Booking>(this.apiUrl + "DeleteBooking/" + id);
  }
}
