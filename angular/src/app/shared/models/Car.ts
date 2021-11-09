import { CarType } from "../enums/CarType.enum";
import { FuelType } from "../enums/FuelType.enum";

export interface Car {
    id: number;
    plateNumber: string;
    name: string;
    model: string;
    makeYear: string;
    fuelType: FuelType;
    carType: CarType;
}