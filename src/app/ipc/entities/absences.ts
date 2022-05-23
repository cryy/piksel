import { AbsenceDate } from ".";

export interface Absences {
    totalJustified: number;
    totalUnjustified: number;
    totalWaiting: number;
    totalOther: number;
    total: number;
    dates: AbsenceDate[];
}