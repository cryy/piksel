import { Theme, createTheme } from "@mui/material/styles";

export class ThemeService {

    private _dark: Theme;
    private _light: Theme;
    
    
    constructor() {
        this._light = this.createLightTheme();
        this._dark = this.createDarkTheme();
    }

    private createLightTheme(): Theme {
        return createTheme({});
    }

    private createDarkTheme(): Theme {
        return createTheme({});
    }

    public get dark() {
        return this._dark;
    }
    
    public get light() {
        return this._light;
    }
}