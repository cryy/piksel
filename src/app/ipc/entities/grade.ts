import { Subject } from "./subject";

export interface Grade {
    name: string;
    date: string;
    schoolName: string;
    passingGrade: string;
    href: string;
    subjects: Subject[];
}