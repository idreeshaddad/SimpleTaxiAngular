import { Gender } from "../enums/gender.enum";

export interface Passenger {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    gender: Gender;
}