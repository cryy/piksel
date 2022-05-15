import { Theme, createTheme, responsiveFontSizes } from "@mui/material/styles";

export class ThemeService {
    private _default: Theme;
    private _dark: Theme;
    private _light: Theme;

    constructor() {
        this._default = createTheme();
        this._light = this.createLightTheme();
        this._dark = this.createDarkTheme();
    }

    private createLightTheme(): Theme {
        return responsiveFontSizes(
            createTheme({
                palette: {
                    mode: "light",
                    primary: {
                        main: "#1990e9",
                    },
                    secondary: {
                        main: "#f55790",
                    },
                    background: {
                        default:
                            "linear-gradient(180deg, rgba(237,240,242,1) 0%, rgba(239,242,244,1) 30%, rgba(236,239,241,1) 55%, rgba(238,240,242,1) 80%, rgba(238,239,242,1) 100%)",
                        paper: "#fdfdfe",
                    },
                },
                typography: {
                    fontFamily: "Source Sans Pro",
                    fontWeightSemiBold: 600,
                    fontWeightExtraBold: 800,
                    h1: {
                        fontFamily: "Montserrat",
                        fontWeight: 800,
                        lineHeight: 78 / 70,
                    },
                    h2: {
                        fontFamily: "Montserrat",
                        fontWeight: 800,
                        lineHeight: 44 / 36,
                    },
                    h3: {
                        fontFamily: "Montserrat",
                        lineHeight: 44 / 36,
                        letterSpacing: 0.2,
                        fontWeight: 800,
                    },
                    h4: {
                        fontFamily: "Montserrat",
                        lineHeight: 42 / 28,
                        letterSpacing: 0.2,
                        fontWeight: 800,
                    },
                    h5: {
                        fontFamily: "Montserrat",
                        lineHeight: 36 / 24,
                        letterSpacing: 0.1,
                        fontWeight: 800,
                    },
                    h6: {
                        lineHeight: 30 / 20,
                    },
                    button: {
                        textTransform: "initial",
                        fontWeight: 700,
                        letterSpacing: 0,
                    },
                    subtitle1: {
                        lineHeight: 24 / 18,
                        letterSpacing: 0,
                        fontWeight: 500,
                    },
                    body1: {
                        lineHeight: 24 / 16,
                        letterSpacing: 0,
                    },
                    body2: {
                        lineHeight: 21 / 14,
                        letterSpacing: 0,
                    },
                    caption: {
                        display: "inline-block",
                        lineHeight: 18 / 12,
                        letterSpacing: 0,
                        fontWeight: 700,
                    },
                },
                components: {
                    MuiCssBaseline: {
                        styleOverrides: {
                            body: {
                                backgroundColor: "transparent",
                            },
                        },
                    },
                    MuiButtonBase: {
                        defaultProps: {
                            disableTouchRipple: true,
                        },
                        styleOverrides: {
                            root: {
                                fontFamily: "'Montserrat' !important",
                            },
                        },
                    },
                    MuiButton: {
                        defaultProps: {
                            disableElevation: true,
                        },
                    },
                    MuiPaper: {
                        defaultProps: {
                            elevation: 0,
                        },
                    },
                },
                shape: {
                    borderRadius: 10,
                },
            })
        );
    }

    private createDarkTheme(): Theme {

        return responsiveFontSizes(
            createTheme({
                palette: {
                    mode: "dark",
                    primary: {
                        main: "#1990e9",
                    },
                    secondary: {
                        main: "#f55790",
                    },
                    background: {
                        default:
                            "linear-gradient(140deg, rgba(37,39,46,1) 0%, rgba(35,39,51,1) 30%, rgba(35,39,53,1) 70%, rgba(35,39,54,1) 100%)",
                        paper: "#2e323d",
                    },
                },
                typography: {
                    fontFamily: "Source Sans Pro",
                    fontWeightSemiBold: 600,
                    fontWeightExtraBold: 800,
                    h1: {
                        fontFamily: "Montserrat",
                        fontWeight: 800,
                        lineHeight: 78 / 70,
                    },
                    h2: {
                        fontFamily: "Montserrat",
                        fontWeight: 800,
                        lineHeight: 44 / 36,
                    },
                    h3: {
                        fontFamily: "Montserrat",
                        lineHeight: 44 / 36,
                        letterSpacing: 0.2,
                        fontWeight: 800,
                    },
                    h4: {
                        fontFamily: "Montserrat",
                        lineHeight: 42 / 28,
                        letterSpacing: 0.2,
                        fontWeight: 800,
                    },
                    h5: {
                        fontFamily: "Montserrat",
                        lineHeight: 36 / 24,
                        letterSpacing: 0.1,
                        fontWeight: 800,
                    },
                    h6: {
                        lineHeight: 30 / 20,
                    },
                    button: {
                        textTransform: "initial",
                        fontWeight: 700,
                        letterSpacing: 0,
                    },
                    subtitle1: {
                        lineHeight: 24 / 18,
                        letterSpacing: 0,
                        fontWeight: 500,
                    },
                    body1: {
                        lineHeight: 24 / 16,
                        letterSpacing: 0,
                    },
                    body2: {
                        lineHeight: 21 / 14,
                        letterSpacing: 0,
                    },
                    caption: {
                        display: "inline-block",
                        lineHeight: 18 / 12,
                        letterSpacing: 0,
                        fontWeight: 700,
                    },
                },
                components: {
                    MuiCssBaseline: {
                        styleOverrides: {
                            body: {
                                backgroundColor: "transparent",
                            },
                        },
                    },
                    MuiButtonBase: {
                        defaultProps: {
                            disableTouchRipple: true,
                        },
                        styleOverrides: {
                            root: {
                                fontFamily: "'Montserrat' !important",
                            },
                        },
                    },
                    MuiButton: {
                        defaultProps: {
                            disableElevation: true,
                        },
                    },
                    MuiPaper: {
                        defaultProps: {
                            elevation: 0,
                        },
                        styleOverrides: {
                            root: {
                                backgroundColor: "unset",
                                background: paperColor,
                            },
                        },
                    },
                },
                shape: {
                    borderRadius: 10,
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
