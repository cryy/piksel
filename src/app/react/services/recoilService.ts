import { RecoilState, atom } from "recoil";

export type ThemeMode = "dark" | "light";
export type LanguageType = "en" | "hr";

export class RecoilService {

    constructor() {
        const atoms = this.createAtoms();
    }

    private createAtoms() {
        return {
        };
    }
}
