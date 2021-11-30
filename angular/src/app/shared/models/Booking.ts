import { Car } from "./Car";
import { Driver } from "./Driver";
import { Passenger } from "./Passenger";

export interface Booking {
    id: number;
    pickUpTime: Date;
    fromAddress: string;
    toAddress: string;
    price: number;
    isPaid: boolean;
    paymentDate: Date;
    car: Car;
    driver: Driver;
    passengers: Passenger[]
}