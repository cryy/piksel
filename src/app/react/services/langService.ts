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
    headroomTeacher: string;
    grades: string;
    notes: string;
    exams: string;
    absences: string;
    schedule: string;
    finalGrade: string;
    note: string;
    date: string;
    grade: string;
    noDataEntered: string;
    subject: string;
    justified: string;
    unjustified: string;
    waiting: string;
    total: string;
    other: string;
    period: string;
    status: string;
    reason: string;
    morning: string;
    afternoon: string;
    mondayShort: string;
    tuesdayShort: string;
    wednesdayShort: string;
    thursdayShort: string;
    fridayShort: string;
    saturdayShort: string;
    gradeAverage: string;
    calculatedAverage: string;
    calculatedAverageOnAverages: string;
    calculatedAverageOnAveragesTooltip: string;
    signOutOfCarnet: string;
    signOutOfCarnetExplanation: string;
    cancel: string;
    disable: string;
    requiresCarnetIntegration: string;
    nextRefresh: string;
    refreshing: string;
    createTask: string;
    completed: string;
    incompleted: string;
    noTasks: string;
    highPriority: string;
    normalPriority: string;
    lowPriority: string;
    priority: string;
    taskName: string;
    taskDescription: string;
    create: string;
    developerMode: string;
    enable: string;
    enableDeveloperMode: string;
    enableDeveloperModeExplanation: string;
    appVersion: string;
    createNewTask: string;
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
            wrongDetails: "Pogrešna e-pošta ili lozinka",
            headroomTeacher: "Razrednik/ica",
            grades: "Ocjene",
            notes: "Bilješke",
            exams: "Ispiti",
            absences: "Izostanci",
            schedule: "Raspored",
            finalGrade: "Zaključeno",
            note: "Bilješka",
            date: "Datum",
            grade: "Ocjena",
            noDataEntered: "Nema unesenih podataka.",
            subject: "Predmet",
            justified: "Opravdano",
            unjustified: "Neopravdano",
            waiting: "Čeka odluku",
            total: "Ukupno",
            other: "Ostalo",
            period: "Sat",
            status: "Status",
            reason: "Razlog",
            morning: "Ujutro",
            afternoon: "Popodne",
            mondayShort: "Pon",
            tuesdayShort: "Uto",
            wednesdayShort: "Sri",
            thursdayShort: "Čet",
            fridayShort: "Pet",
            saturdayShort: "Sub",
            gradeAverage: "Prosjek ocjena",
            calculatedAverage: "Izračunati prosjek",
            calculatedAverageOnAverages: "Izračunati prosjek (R)",
            calculatedAverageOnAveragesTooltip: "R označava \"Raw\". Ovaj prosjek je izračunat koristeći samo prosjeke predmeta, bez zaključenih ocjena.",
            signOutOfCarnet: "Isključiti CARNet integraciju?",
            signOutOfCarnetExplanation: "Isključivanje CARNet integracije će vas odjaviti iz CARNet sistema i nećete moći pristupiti eDnevnik usluzi u piksel aplikaciji.",
            cancel: "Odustani",
            disable: "Isključi",
            requiresCarnetIntegration: "Kako bi ste koristili ovu uslugu, potrebno je uključiti CARNet integraciju u postavkama.",
            nextRefresh: "Osvježavanje podataka",
            refreshing: "Osvježavanje...",
            createTask: "Novi zadatak",
            completed: "Završeno",
            incompleted: "Nezavršeno",
            noTasks: "Ovdje nema zadataka.",
            highPriority: "Visoka",
            normalPriority: "Normalna",
            lowPriority: "Niska",
            priority: "Važnost",
            taskName: "Ime zadatka",
            taskDescription: "Opis zadatka",
            create: "Kreiraj",
            developerMode: "Način rada za programere",
            enable: "Uključi",
            enableDeveloperMode: "Uključiti način rada za programere?",
            enableDeveloperModeExplanation: "Uključite ovaj način rada samo ako znate što radite, možete prekinuti rad aplikacije u protivnom.",
            appVersion: "Verzija",
            createNewTask: "Dodaj novi zadatak"
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
            wrongDetails: "Wrong e-mail or password",
            headroomTeacher: "Headroom teacher",
            grades: "Grades",
            notes: "Notes",
            exams: "Exams",
            absences: "Absences",
            schedule: "Schedule",
            finalGrade: "Final grade",
            note: "Note",
            date: "Date",
            grade: "Grade",
            noDataEntered: "No data entered.",
            subject: "Subject",
            justified: "Justified",
            unjustified: "Unjustified",
            waiting: "Waiting decision",
            total: "Total",
            other: "Other",
            period: "Period",
            status: "Status",
            reason: "Reason",
            morning: "Morning",
            afternoon: "Afternoon",
            mondayShort: "Mon",
            tuesdayShort: "Tue",
            wednesdayShort: "Wed",
            thursdayShort: "Thu",
            fridayShort: "Fri",
            saturdayShort: "Sat",
            gradeAverage: "Average grade",
            calculatedAverage: "Calculated average",
            calculatedAverageOnAverages: "Calculated average (R)",
            calculatedAverageOnAveragesTooltip: "R denotes \"Raw\". This average is calculated using only averages of your subjects, without using your final grade.",
            signOutOfCarnet: "Disable CARNet integration?",
            signOutOfCarnetExplanation: "Turning off CARNet integration will sign you out of the CARNet system. You won't be able to access eDnevnik in the piksel app.",
            cancel: "Cancel",
            disable: "Disable",
            requiresCarnetIntegration: "To use this service, you have to enable CARNet integration in the settings.",
            nextRefresh: "Refreshing data",
            refreshing: "Refreshing...",
            createTask: "New task",
            completed: "Completed",
            incompleted: "Incompleted",
            noTasks: "No tasks here.",
            highPriority: "High",
            normalPriority: "Normal",
            lowPriority: "Low",
            priority: "Priority",
            taskName: "Task name",
            taskDescription: "Task description",
            create: "Create",
            developerMode: "Developer mode",
            enable: "Enable",
            enableDeveloperMode: "Enable developer mode?",
            enableDeveloperModeExplanation: "Turn on this mode only if you know what you're doing, you can break the application otherwise.",
            appVersion: "Version",
            createNewTask: "Create new task"
        };
    }

    public get hr() {
        return this._hr;
    }

    public get en() {
        return this._en;
    }
}
