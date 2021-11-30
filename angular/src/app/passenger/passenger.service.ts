import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Passenger } from '../shared/models/Passenger';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  apiUrl = "https://localhost:44313/api/Passengers/"

  constructor(private http: HttpClient) { }

  getPassengers(): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(this.apiUrl + "GetPassengers");
  }

  getPassengerById(id: number): Observable<Passenger> {
    return this.http.get<Passenger>(this.apiUrl + "GetPassengerById/" + id);
  }

  createPassenger(passenger: Passenger): Observable<Passenger> {
    return this.http.post<Passenger>(this.apiUrl + "CreatePassenger", passenger);
  }

  editPassenger(passenger: Passenger): Observable<any> {
    return this.http.put<Passenger>(this.apiUrl + "EditPassenger/" + passenger.id, passenger);
  }

  deletePassenger(id: number): Observable<any> {
    return this.http.delete<Passenger>(this.apiUrl + "DeletePassenger/" + id);
  }
}
