import { RecoilState, atom } from "recoil";

import { Location } from "react-router-dom";
import { Nullable } from "../../../types/nulllable";

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
