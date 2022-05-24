import { GradingElement } from "./gradingElement";
import { GradingNote } from "./gradingNote";

export interface Subject {
    name: string;
    teacherName: string;
    href: string;
    gradingElements: GradingElement[];
    notes: GradingNote[];
    average: number;
}