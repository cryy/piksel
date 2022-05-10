import { Theme, createTheme, responsiveFontSizes } from "@mui/material/styles";

export class ThemeService {
    private _dark: Theme;
    private _light: Theme;

    constructor() {
        this._light = this.createLightTheme();
        this._dark = this.createDarkTheme();
    }

    private createLightTheme(): Theme {
        return responsiveFontSizes(
            createTheme({
                palette: {
                    mode: "light",
                },
                components: {
                    MuiCssBaseline: {
                        styleOverrides: {
                            body: {
                                backgroundColor: "transparent",
                            },
                        },
                    },
                },
            })
        );
    }

    private createDarkTheme(): Theme {
        return responsiveFontSizes(
            createTheme({
                palette: {
                    mode: "dark",
                },
                components: {
                    MuiCssBaseline: {
                        styleOverrides: {
                            body: {
                                backgroundColor: "transparent",
                            },
                        },
                    },
                },
            })
        );
    }

    public get dark() {
        return this._dark;
    }

    public get light() {
        return this._light;
    }
}
