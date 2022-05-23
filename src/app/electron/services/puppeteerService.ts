import { app, BrowserWindow } from "electron";
import puppeteer from "puppeteer-core";
import pie from "puppeteer-in-electron";
import { IPCService } from ".";
import {
    Absences,
    AbsentStatus,
    CarnetLoginDetails,
    CarnetUpdateState,
    Command,
    EDnevnikDetails,
    ExamMonth,
    Grade,
    GradeNote,
    GradingElement,
    GradingNote,
    LoadingPhase,
    SnackbarData,
    Subject,
} from "../../ipc";

export interface InternalSubject {
    href: string;
    subjectName: string;
    teacherName: string;
}

export interface InternalDetailedSubject {
    gradingElements: InternalGradingElement[];
    notes: InternalNote[];
}

export interface InternalGradingElement {
    name: string;
    grades: string[];
    isInclusive: boolean;
}

export interface InternalNote {
    details: string;
    date: string;
    grade: string;
}

export interface InternalGrade {
    name: string;
    date: string;
    schoolName: string;
    passingGrade: string;
    href: string;
}

export interface InternalGradeNote {
    title: string;
    content: string;
}

export interface InternalExamDetails {
    subject: string;
    note: string;
    date: string;
}

export interface InternalExamMonth {
    month: string;
    exams: InternalExamDetails[];
}

export interface InternalAbsenceDetails {
    period: string;
    subject: string;
    status: AbsentStatus;
    reason: string;
}

export interface InternalAbsenceDate {
    date: string;
    details: InternalAbsenceDetails[];
}

export interface InternalAbsences {
    totalJustified: number;
    totalUnjustified: number;
    totalWaiting: number;
    totalOther: number;
    total: number;
    dates: InternalAbsenceDate[];
}

export interface InternalSchedule {
    periods: string[];
    days: string[][];
}

export class PuppeteerService {
    private _ipc: IPCService;

    private _browser: puppeteer.Browser | null;
    private _window: BrowserWindow | null;

    private readonly _url: string;
    private readonly _communicationChannel: string;

    constructor(ipc: IPCService) {
        this._ipc = ipc;

        this._browser = null;
        this._window = null;

        this._url = "https://ocjene.skole.hr";
        this._communicationChannel = "PUPPETEER";

        this.initialize();
        this._ipc.receive<Command, any>(this.ipcHandler.bind(this), this._communicationChannel);
    }

    private async ipcHandler(command: Command) {
        let d;
        switch (command.name) {
            case "CARNET_LOGIN":
                d = command.data as CarnetLoginDetails;
                this.createWindow();
                const result = await this.login(d.username, d.password, true);
                if (!result) {
                    this._ipc.send<CarnetUpdateState>({
                        name: "CARNET_LOADING_STATE",
                        data: {
                            state: LoadingPhase.LoadedWithError,
                        },
                    });
                    this._ipc.send<SnackbarData>({
                        name: "SNACKBAR",
                        data: {
                            message: "wrongDetails",
                            useLang: true,
                            options: {
                                variant: "error",
                            },
                        },
                    });
                    this.destroyWindow();
                    return false;
                }
                this.fetchInformation(result).then(() => {
                    this.destroyWindow();
                });
                return true;
            default:
                break;
        }
    }

    private async initialize() {
        await pie.initialize(app);
        this._browser = await pie.connect(app, puppeteer);
    }

    private createWindow() {
        if (this._window === null) {
            this._window = new BrowserWindow();
        }
    }

    private destroyWindow() {
        this._window?.destroy();
        this._window = null;
    }

    private async login(username: string, password: string, calledFromReact: boolean) {
        if (!(this._window && this._browser)) return false;
        if (!(username && password)) return false;

        try {
            await this._window.loadURL(`${this._url}/login`);
            const page = await pie.getPage(this._browser, this._window);

            await page.waitForSelector(".cn-logo");

            await page.type("input[name=username]", username, { delay: 5 });
            await page.type("input[name=password]", password, { delay: 5 });

            await Promise.all([page.click("input[type=submit]"), page.waitForNavigation()]);

            if (page.url() === `${this._url}/login`) return false;

            return page;
        } catch (e) {
            return null;
        }
    }

    private async fetchInformation(page: puppeteer.Page) {
        this._ipc.send<CarnetUpdateState>({
            name: "CARNET_LOADING_STATE",
            data: {
                state: LoadingPhase.Loading,
            },
        });
        const gradesResult = await this.fetchGrades(page);
        const grades = gradesResult[1];

        const externalGrades: Grade[] = [];

        for (let x = 0; x < grades.length; x++) {
            const grade = grades[x];
            const subjects = await this.fetchSubjects(page, `${this._url}${grade.href}`);
            const headroomTeacher = await this.fetchHeadroomTeacher(page);

            const externalSubjects: Subject[] = [];

            for (let y = 0; y < subjects.length; y++) {
                const subject = subjects[y];
                const detailedSubject = await this.fetchSubject(
                    page,
                    `${this._url}${subject.href}`
                );

                externalSubjects.push({
                    name: subject.subjectName,
                    teacherName: subject.teacherName,
                    href: subject.href,
                    gradingElements: detailedSubject.gradingElements,
                    notes: detailedSubject.notes,
                });
            }

            const notes = await this.fetchGradeNotes(page);
            const exams = await this.fetchGradeExams(page);
            const absences = await this.fetchGradeAbsents(page);
            const schedules = await this.fetchGradeSchedule(page);

            externalGrades.push({
                name: grade.name,
                headroomTeacher: headroomTeacher,
                schoolName: grade.schoolName,
                passingGrade: grade.passingGrade,
                date: grade.date,
                href: grade.href,
                subjects: externalSubjects,
                notes: notes,
                exams: exams,
                absences: absences,
                schedule: {
                    morning: schedules[0],
                    afternoon: schedules[1],
                },
            });
        }

        this._ipc.send<EDnevnikDetails>({
            name: "EDNEVNIK_UPDATE",
            data: {
                studentName: gradesResult[0],
                grades: externalGrades,
            },
        });
        this._ipc.send<CarnetUpdateState>({
            name: "CARNET_LOADING_STATE",
            data: {
                state: LoadingPhase.Loaded,
            },
        });
    }

    private async fetchGrades(page: puppeteer.Page): Promise<[string, InternalGrade[]]> {
        await page.goto(`${this._url}/class`);
        await page.waitForSelector(".cn-logo");

        const grades = await page.$$eval(
            ".student-list > .classes > .class-menu-vertical > .class-info",
            (elements) => {
                const normalize = (str: string) => {
                    return str.trim().replace(/\t/g, "");
                };

                return elements.map((el) => {
                    const gradeInfo = el.getElementsByClassName("school")[0];

                    const href = gradeInfo.getAttribute("href")!;
                    const gradeInfoChildren = gradeInfo.children;

                    const gradeName = normalize(gradeInfoChildren[0].children[0].textContent!);
                    const gradeYear = normalize(gradeInfoChildren[0].children[1].textContent!);

                    const schoolName = normalize(gradeInfoChildren[1].textContent!);

                    const classMenu = el.getElementsByClassName("class-menu")[0];

                    const passingGradeElement = classMenu.children[1];

                    const passingGrade = normalize(
                        passingGradeElement.children[0].getElementsByTagName("span")[0].textContent!
                    );

                    return {
                        name: gradeName,
                        date: gradeYear,
                        schoolName: schoolName,
                        passingGrade: passingGrade,
                        href: href,
                    };
                });
            }
        );

        const studentName = await page.$eval(".user-name", (element) => {
            const normalize = (str: string) => {
                return str.trim().replace(/\t/g, "");
            };

            return normalize(element.textContent!);
        });

        return [studentName, grades];
    }

    private async fetchSubjects(page: puppeteer.Page, url: string): Promise<InternalSubject[]> {
        await page.goto(url);
        await page.waitForSelector(".cn-logo");

        return await page.$$eval(".content-wrapper > .content > .list > li > a", (elements) => {
            const normalize = (str: string) => {
                return str.trim().replace(/\t/g, "");
            };

            return elements.map((el) => {

                const href = el.getAttribute("href")!;
                const children = el.children;

                const subjectName = normalize(children[0].textContent!);
                const teacherName = normalize(children[1].textContent!);

                return {
                    href: href,
                    subjectName: subjectName,
                    teacherName: teacherName,
                };
            });
        });
    }

    private async fetchHeadroomTeacher(page: puppeteer.Page) {
        return await page.$eval(".school-name > .schoolyear > .black", (el) => {
            const normalize = (str: string) => {
                return str.trim().replace(/\t/g, "");
            };
            return normalize(el.textContent!);
        });
    }

    private async fetchSubject(
        page: puppeteer.Page,
        url: string
    ): Promise<InternalDetailedSubject> {
        await page.goto(url);
        await page.waitForSelector(".cn-logo");

        const gradingElements: InternalGradingElement[] = await page.$$eval(
            ".content > .grades-table > .flex-table.row",
            (elements) => {
                const normalize = (str: string) => {
                    return str.trim().replace(/\t/g, "");              
                };
            
                return elements.map((el) => {

                    const children = el.children;

                    if (el.classList.contains("final-grade")) {
                        const firstSemester = normalize(children[1].textContent!);
                        const secondSemester = normalize(children[2].textContent!);

                        return {
                            name: "Zaključeno",
                            grades: [firstSemester, secondSemester],
                            isInclusive: true,
                        };
                    } else {
                        const gradingElement = normalize(children[0].textContent!);
                        const grades: string[] = [];

                        for (let i = 1; i < children.length; i++) {
                            const grade = normalize(children[i].textContent!);

                            grades.push(grade);
                        }

                        return {
                            name: gradingElement,
                            grades: grades,
                            isInclusive: false,
                        };
                    }
                })
            }
        );

        const notes: InternalNote[] = await page.$$eval(
            ".content > .notes-table > .flex-table.row",
            (elements) => {
                const normalize = (str: string) => {
                    return str.trim().replace(/\t/g, "");
                };

                return elements.map((el) => {
                    const children = el.children;

                    const details = normalize(children[0].textContent!);
                    const date = normalize(children[1].textContent!);
                    const grade = normalize(children[2].textContent!);

                    return {
                        details: details,
                        date: date,
                        grade: grade,
                    };
                });
            }
        );

        return {
            gradingElements: gradingElements,
            notes: notes,
        };
    }

    private async fetchGradeNotes(page: puppeteer.Page) {
        await page.goto(`${this._url}/notes`);
        await page.waitForSelector(".cn-logo");

        const notes: InternalGradeNote[] = await page.$eval(".content", (element) => {
            const normalize = (str: string) => {
                return str.trim().replace(/\t/g, "");
            };

            const children = element.children;

            const gradeNotes: InternalGradeNote[] = [];

            for (let i = 0; i < children.length; i += 2) {
                const title = normalize(children[i].textContent!);
                const content = normalize(children[i + 1].textContent!);

                gradeNotes.push({
                    title: title,
                    content: content,
                });
            }

            return gradeNotes;
        });

        return notes;
    }

    private async fetchGradeExams(page: puppeteer.Page) {
        await page.goto(`${this._url}/exam`);
        await page.waitForSelector(".cn-logo");

        const internalExams: InternalExamMonth[] = await page.$$eval(
            ".content > .table-container",
            (elements) => {
                const normalize = (str: string) => {
                    return str.trim().replace(/\t/g, "");
                };

                return elements.map((el) => {
                    const children = el.children;

                    const month = normalize(children[0].textContent!);

                    const details: InternalExamDetails[] = [];

                    for (let i = 2; i < children.length; i++) {
                        const examElement = children[i];
                        const examElementChildren = examElement.children;

                        const subject = normalize(examElementChildren[0].textContent!);
                        const note = normalize(examElementChildren[1].textContent!);
                        const date = normalize(examElementChildren[2].textContent!);

                        details.push({
                            subject: subject,
                            note: note,
                            date: date,
                        });
                    }

                    return {
                        month: month,
                        exams: details,
                    };
                });
            }
        );

        return internalExams;
    }

    private async fetchGradeAbsents(page: puppeteer.Page): Promise<InternalAbsences> {
        await page.goto(`${this._url}/absent`);
        await page.waitForSelector(".cn-logo");

        const absentAmounts = await page.$$eval(
            ".content > .absent-legend-table > .flex-table > .flex-row",
            (elements) => {
                const normalize = (str: string) => {
                    return str.trim().replace(/\t/g, "");
                };

                return elements.map((element) =>
                    Number(normalize(element.textContent!).split(":")[1])
                );
            }
        );

        const internalAbsents: InternalAbsenceDate[] = await page.$$eval(
            ".content > .absent-table",
            (elements) => {
                const normalize = (str: string) => {
                    return str.trim().replace(/\t/g, "");
                };

                return elements.map((el) => {
                    const children = el.children;

                    const date = normalize(children[0].textContent!);

                    const details: InternalAbsenceDetails[] = [];

                    for (let i = 2; i < children.length; i++) {
                        const absentElement = children[i];
                        const absentElementChildren = absentElement.children;

                        const period = normalize(absentElementChildren[0].textContent!);
                        const subject = normalize(absentElementChildren[1].textContent!);

                        const statusElementClasses = absentElementChildren[2].children[0].classList;
                        const status = (() => {
                            if (statusElementClasses.contains("black")) return 2;
                            else if (statusElementClasses.contains("green")) return 0;
                            else if (statusElementClasses.contains("red")) return 1;
                            else return 3;
                        })();

                        const reason = normalize(absentElementChildren[3].textContent!);

                        details.push({
                            period: period,
                            subject: subject,
                            status: status,
                            reason: reason,
                        });
                    }

                    return {
                        date: date,
                        details: details,
                    };
                });
            }
        );

        return {
            totalJustified: absentAmounts[0],
            totalUnjustified: absentAmounts[1],
            totalWaiting: absentAmounts[2],
            total: absentAmounts[3],
            totalOther: absentAmounts[4],
            dates: internalAbsents,
        };
    }

    private async fetchGradeSchedule(page: puppeteer.Page) {
        await page.goto(`${this._url}/schedule`);
        await page.waitForSelector(".cn-logo");

        const internalSchedules: InternalSchedule[] = await page.$$eval(
            ".content > .schedule-table",
            (elements) => {
                const normalize = (str: string) => {
                    return str.trim().replace(/\t/g, "");
                };

                return elements.map((el) => {
                    const children = el.children;

                    const periodElements = children[0].children[1].children;
                    const periods: string[] = [];

                    for (let i = 0; i < periodElements.length; i++) {
                        periods.push(normalize(periodElements[i].textContent!));
                    }

                    const days: string[][] = [];

                    for (let y = 1; y < children.length; y++) {
                        const dayChildren = children[y].children;
                        const subjects: string[] = [];

                        for (let z = 1; z < dayChildren.length; z++) {
                            const subject = normalize(dayChildren[z].children[1].textContent!);
                            subjects.push(subject);
                        }

                        days.push(subjects);
                    }

                    return {
                        periods: periods,
                        days: days,
                    };
                });
            }
        );

        return internalSchedules;
    }

    public async start(username: string, password: string) {}
}
