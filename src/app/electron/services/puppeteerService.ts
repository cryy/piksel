import { BrowserWindow, app } from "electron";
import {
    CarnetLoginDetails,
    Command,
    EDnevnikDetails,
    Grade,
    GradingElement,
    GradingNote,
    LoadingPhase,
    Subject,
} from "../../ipc";

import { IPCService } from ".";
import pie from "puppeteer-in-electron";
import puppeteer from "puppeteer-core";

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
                const result = await this.login(d.username, d.password);
                if (!result) {
                    this._ipc.send({
                        name: "CARNET_LOADING_STATE",
                        data: {
                            state: LoadingPhase.Loaded,
                        },
                    });
                    return false;
                }
                this.fetchInformation(result);
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

    private async login(username: string, password: string) {
        if (!(this._window && this._browser)) return false;
        if (!(username && password)) return false;

        try {
            await this._window.loadURL(`${this._url}/login`);
            const page = await pie.getPage(this._browser, this._window);

            await page.waitForSelector(".cn-logo");

            await page.type("input[name=username]", username, { delay: 15 });
            await page.type("input[name=password]", password, { delay: 15 });

            await Promise.all([page.click("input[type=submit]"), page.waitForNavigation()]);

            if (page.url() === `${this._url}/login`) return false;

            return page;
        } catch (e) {
            return null;
        }
    }

    private async fetchInformation(page: puppeteer.Page) {
        this._ipc.send({
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

            const externalSubjects: Subject[] = [];

            for (let y = 0; y < subjects.length; y++) {
                const subject = subjects[y];
                const detailedSubject = await this.fetchSubject(
                    page,
                    `${this._url}${subject.href}`
                );

                const externalGradingElments: GradingElement[] =
                    detailedSubject.gradingElements.map((x) => ({
                        name: x.name,
                        grades: x.grades,
                        isInclusive: x.isInclusive,
                    }));

                const externalNotes: GradingNote[] = detailedSubject.notes.map((x) => ({
                    details: x.details,
                    grade: x.grade,
                    date: x.date,
                }));

                externalSubjects.push({
                    name: subject.subjectName,
                    teacherName: subject.teacherName,
                    href: subject.href,
                    gradingElements: externalGradingElments,
                    notes: externalNotes,
                });
            }

            externalGrades.push({
                name: grade.name,
                schoolName: grade.schoolName,
                passingGrade: grade.passingGrade,
                date: grade.date,
                href: grade.href,
                subjects: externalSubjects,
            });
        }

        this._ipc.send({
            name: "EDNEVNIK_UPDATE",
            data: {
                studentName: gradesResult[0],
                grades: externalGrades,
            },
        });
        this._ipc.send({
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
            (elements) =>
                elements.map((el) => {
                    const gradeInfo = el.getElementsByClassName("school")[0];

                    const href = gradeInfo.getAttribute("href")!;
                    const gradeInfoChildren = gradeInfo.children;

                    const gradeName = gradeInfoChildren[0].children[0].textContent!.trim();
                    const gradeYear = gradeInfoChildren[0].children[1].textContent!.trim();

                    const schoolName = gradeInfoChildren[1].textContent!.trim();

                    const classMenu = el.getElementsByClassName("class-menu")[0];

                    const passingGradeElement = classMenu.children[1];

                    const passingGrade = passingGradeElement.children[0]
                        .getElementsByTagName("span")[0]
                        .textContent!.trim();

                    return {
                        name: gradeName,
                        date: gradeYear,
                        schoolName: schoolName,
                        passingGrade: passingGrade,
                        href: href,
                    };
                })
        );

        const studentName = await page.$eval(".user-name", (element) =>
            element.textContent!.trim()
        );

        return [studentName, grades];
    }

    private async fetchSubjects(page: puppeteer.Page, url: string): Promise<InternalSubject[]> {
        await page.goto(url);
        await page.waitForSelector(".cn-logo");

        return await page.$$eval(".content-wrapper > .content > .list > li > a", (elements) =>
            elements.map((el) => {
                const href = el.getAttribute("href")!;
                const children = el.children;

                const subjectName = children[0].textContent!.trim();
                const teacherName = children[1].textContent!.trim();

                return {
                    href: href,
                    subjectName: subjectName,
                    teacherName: teacherName,
                };
            })
        );
    }

    private async fetchSubject(
        page: puppeteer.Page,
        url: string
    ): Promise<InternalDetailedSubject> {
        await page.goto(url);
        await page.waitForSelector(".cn-logo");

        const gradingElements: InternalGradingElement[] = await page.$$eval(
            ".content > .grades-table > .flex-table.row",
            (elements) =>
                elements.map((el) => {
                    const children = el.children;

                    if (el.classList.contains("final-grade")) {
                        const firstSemester = children[1].textContent!.trim();
                        const secondSemester = children[2].textContent!.trim();

                        return {
                            name: "Zaključeno",
                            grades: [firstSemester, secondSemester],
                            isInclusive: true,
                        };
                    } else {
                        const gradingElement = children[0].textContent!.trim();
                        const grades: string[] = [];

                        for (let i = 1; i < children.length; i++) {
                            const grade = children[i].textContent!.trim();

                            grades.push(grade);
                        }

                        return {
                            name: gradingElement,
                            grades: grades,
                            isInclusive: false,
                        };
                    }
                })
        );

        const notes: InternalNote[] = await page.$$eval(
            ".content > .notes-table > .flex-table.row",
            (elements) =>
                elements.map((el) => {
                    const children = el.children;

                    const details = children[0].textContent!.trim();
                    const date = children[1].textContent!.trim();
                    const grade = children[2].textContent!.trim();

                    return {
                        details: details,
                        date: date,
                        grade: grade,
                    };
                })
        );

        return {
            gradingElements: gradingElements,
            notes: notes,
        };
    }

    public async start(username: string, password: string) {}
}
