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
    carnetExplanation: string;
    carnetEmail: string;
    carnetPassword: string;
    loginAction: string;
    loggingIn: string;
    finalAverage: string;
    wrongDetails: string;
}

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
            carnetIntegration: "CARNet integracija",
            carnetExplanation:
                "Kako bi mogli pristupiti vašem eDnevniku, morate se ulogirati s vašim CARNet podacima.\nPiksel sprema vaše podatke u konfiguracijsku datoteku samo da se može ulogirati umjesto vas. Vaši podaci nikada neće biti zloupotrebljeni.",
            carnetEmail: "CARNet e-pošta",
            carnetPassword: "CARNet lozinka",
            loginAction: "Prijavi se",
            loggingIn: "Prijavljivanje",
            finalAverage: "Završni prosjek",
            wrongDetails: "Pogrešna e-pošta ili lozinka"
        };
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
            carnetIntegration: "CARNet integration",
            carnetExplanation:
                "To access your eDnevnik, you have to log in with your CARNet login details.\nPiksel stores your details in a configuration file so it can log in instead of you. Your details will never be misused.",
            carnetEmail: "CARNet e-mail",
            carnetPassword: "CARNet password",
            loginAction: "Login",
            loggingIn: "Logging in",
            finalAverage: "Final average",
            wrongDetails: "Wrong e-mail or password"
        };
    }

    public get hr() {
        return this._hr;
    }

    public get en() {
        return this._en;
    }
}
