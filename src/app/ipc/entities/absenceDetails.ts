import { AbsentStatus } from ".";

export interface AbsenceDetails {
    period: string;
    subject: string;
    status: AbsentStatus;
    reason: string;
}