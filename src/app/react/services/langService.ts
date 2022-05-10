export interface Lang {
    helloWorld: string;
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
            helloWorld: "Bok svijete!"
        }
    }

    private createEn(): Lang {
        return {
            helloWorld: "Hello world"
        }
    }

    public get hr() {
        return this._hr;
    }

    public get en() {
        return this._en;
    }
}