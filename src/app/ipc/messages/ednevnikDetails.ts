import { Grade } from "../entities";

export interface EDnevnikDetails {
    studentName: string;
    grades: Grade[];
    at: number;
    refresh: number;
}