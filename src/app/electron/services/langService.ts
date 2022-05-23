import { ConfigService } from ".";

export interface Lang {
    minimizeToTray: string;
    showPiksel: string;
    exit: string;
    windowNotificationTitle: string;
    windowNotificationBody: string;
}

export class LangService {
    private _config: ConfigService;

    private _en: Lang;
    private _hr: Lang;

    constructor(config: ConfigService) {
        this._config = config;

        this._en = this.createEn();
        this._hr = this.createHr();
    }

    private createEn() {
        return {
            minimizeToTray: "Minimize to tray",
            showPiksel: "Show Piksel",
            exit: "Exit",
            windowNotificationTitle: "Window hidden",
            windowNotificationBody: "The window has been hidden. Exit Piksel from the system tray.",
        };
    }

    private createHr() {
        return {
            minimizeToTray: "Minimiziraj u traku",
            showPiksel: "Pokaži Piksel",
            exit: "Izađi",
            windowNotificationTitle: "Prozor skriven",
            windowNotificationBody: "Prozor je skriven. Izađite iz Piksela putem programske trake.",
        };
    }

    public get en() {
        return this._en;
    }

    public get hr() {
        return this._hr;
    }

    public get current() {
        if (this._config.store.lang === "hr") return this._hr;

        return this._en;
    }
}
