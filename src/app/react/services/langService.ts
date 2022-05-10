export interface Lang {
    helloWorld: string;
    goodMorning: string;
    goodAfternoon: string;
    goodEvening: string;
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
            helloWorld: "Bok svijete!",
            goodMorning: "Dobro jutro!",
            goodAfternoon: "Dobar dan!",
            goodEvening: "Dobra večer!"
        }
    }

    private createEn(): Lang {
        return {
            helloWorld: "Hello world",
            goodMorning: "Good morning!",
            goodAfternoon: "Good afternoon!",
            goodEvening: "Good evening!"
        }
    }

    public get hr() {
        return this._hr;
    }

    public get en() {
        return this._en;
    }
}