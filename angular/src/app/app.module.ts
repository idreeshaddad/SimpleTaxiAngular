import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarComponent } from './car/car.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { CarDetailsComponent } from './car/car-details/car-details.component';
import { HomeComponent } from './home/home.component';
import { CarAddEditComponent } from './car/car-add-edit/car-add-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { DeleteCarDialogComponent } from './car/delete-car-dialog/delete-car-dialog.component';
import { DriverComponent } from './driver/driver.component';
import { DriverAddEditComponent } from './driver/driver-add-edit/driver-add-edit.component';
import { DriverDetailsComponent } from './driver/driver-details/driver-details.component';
import { DriverDeleteDialogComponent } from './driver/driver-delete-dialog/driver-delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    CarDetailsComponent,
    HomeComponent,
    CarAddEditComponent,
    DeleteCarDialogComponent,
    DriverComponent,
    DriverAddEditComponent,
    DriverDetailsComponent,
    DriverDeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
