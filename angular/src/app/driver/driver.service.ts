import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Driver } from '../shared/models/Driver';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private apiUrl: string = 'https://localhost:44313/api/drivers/';

  constructor(private http: HttpClient) { }

  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.apiUrl + 'GetList');
  }

  getDriverById(id: number): Observable<Driver> {
    return this.http.get<Driver>(this.apiUrl + 'GetDriverById/' + id);
  }

  createDriver(driver: Driver): Observable<any> {
    return this.http.post<Driver>(this.apiUrl + 'CreateDriver', driver)
  }

  editDriver(driver: Driver): Observable<any> {
    return this.http.put<Driver>(this.apiUrl + "EditDriver/" + driver.id, driver);
  }

  deleteDriver(id: number) : Observable<any> {
    return this.http.delete<Driver>(this.apiUrl + "DeleteDriver/" + id);
  }
}
