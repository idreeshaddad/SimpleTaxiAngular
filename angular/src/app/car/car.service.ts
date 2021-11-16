import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../shared/models/Car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl: string = 'https://localhost:44313/api/cars/';

  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl + 'GetList');
  }

  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(this.apiUrl + 'GetById/' + id);
  }

  createCar(car: Car): Observable<any> {
    return this.http.post<Car>(this.apiUrl + 'Create', car);
  }

  editCar(car: Car): Observable<any> {
    return this.http.put<Car>(this.apiUrl + 'Edit/' + car.id, car)
  }
}
