import { RecoilState, atom } from "recoil";

export type ThemeMode = "dark" | "light";
export type LanguageType = "en" | "hr";

export class RecoilService {

    private _currentRoute: RecoilState<string>;

    constructor() {
        const atoms = this.createAtoms();

        this._currentRoute = atoms["currentRoute"];
    }

    private createAtoms() {
        return {
            currentRoute: atom({
                key: "currentRoute",
                default: "/"
            })
        };
    }

    public get currentRoute() {
        return this._currentRoute;
    }
}
