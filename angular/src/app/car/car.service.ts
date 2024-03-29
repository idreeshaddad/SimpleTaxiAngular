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
    return this.http.get<Car[]>(this.apiUrl + 'GetCars');
  }

  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(this.apiUrl + 'GetCarById/' + id);
  }

  createCar(car: Car): Observable<any> {
    return this.http.post<Car>(this.apiUrl + 'CreateCar', car);
  }

  editCar(car: Car): Observable<any> {
    return this.http.put<Car>(this.apiUrl + 'EditCar/' + car.id, car);
  }

  deleteCar(id: number): Observable<any> {
    return this.http.delete<Car>(this.apiUrl + 'DeleteCar/' + id);
  }

}
