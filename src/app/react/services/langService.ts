export interface Lang {
    [key: string]: string;
    type: string;
    goodMorning: string;
    goodAfternoon: string;
    goodEvening: string;
    homePage: string;
    tasksPage: string;
    remindersPage: string;
    ednevnikPage: string;
    settingsPage: string;
    language: string;
    theme: string;
    dark: string;
    light: string;
    blur: string;
    carnetIntegration: string;
};

export class LangService {

    private _hr: Lang;
    private _en: Lang;

    constructor() {
        this._hr = this.createHr();
        this._en = this.createEn();
    }

    private createHr(): Lang {
        return {
            type: "hr",
            goodMorning: "Dobro jutro!",
            goodAfternoon: "Dobar dan!",
            goodEvening: "Dobra večer!",
            homePage: "Početna",
            tasksPage: "Zadaci",
            remindersPage: "Podsjetnici",
            ednevnikPage: "eDnevnik",
            settingsPage: "Postavke",
            language: "Jezik",
            theme: "Tema",
            dark: "Tamna",
            light: "Svijetla",
            blur: "Zamućivanje prozora",
            carnetIntegration: "CARNet integracija"
        }
    }

    private createEn(): Lang {
        return {
            type: "en",
            goodMorning: "Good morning!",
            goodAfternoon: "Good afternoon!",
            goodEvening: "Good evening!",
            homePage: "Home",
            tasksPage: "Tasks",
            remindersPage: "Reminders",
            ednevnikPage: "eDnevnik",
            settingsPage: "Settings",
            language: "Language",
            theme: "Theme",
            dark: "Dark",
            light: "Light",
            blur: "Window blur",
            carnetIntegration: "CARNet integration"
        }
    }

    public get hr() {
        return this._hr;
    }

    public get en() {
        return this._en;
    }
}