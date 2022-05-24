import { Absences, ExamMonth, GradeNote, Schedule, Subject } from ".";

export interface Grade {
    name: string;
    headroomTeacher: string;
    date: string;
    schoolName: string;
    passingGrade: string;
    calculatedGrade: number;
    calculatedGradeBasedOnAverages: number;
    href: string;
    subjects: Subject[];
    notes: GradeNote[];
    exams: ExamMonth[];
    absences: Absences;
    schedule: Schedule;
}