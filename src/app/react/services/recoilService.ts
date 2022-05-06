import { RecoilState, atom } from "recoil";

import { Theme } from "@mui/material";
import { ThemeService } from ".";

export class RecoilService {
    private _currentTheme: RecoilState<Theme>;

    private _themeService: ThemeService;

    constructor(themeService: ThemeService) {
        this._themeService = themeService;

        const atoms = this.createAtoms();
        this._currentTheme = atoms["currentTheme"];
    }

    private createAtoms() {
        return {
            currentTheme: atom({
                key: "currentTheme",
                default: this._themeService.dark,
            }),        
        };
    }

    public get currentTheme() {
        return this._currentTheme;
    }
}
