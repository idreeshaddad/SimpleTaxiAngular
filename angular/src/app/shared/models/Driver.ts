import { Gender } from "../enums/gender.enum";

export interface Driver {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    rating: number;
    gender: Gender;
}