import { AppContext, appContext } from "./context";
import { AppWrapper, SnackbarListener } from "./components";
import { Command, Config, LanguageType, ThemeMode } from "../ipc";
import React, { useEffect, useState } from "react";

import { CssBaseline } from "@mui/material";
import { ServiceContainer } from "./services";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material/styles";

export interface AppProps {
    services: ServiceContainer;
}

export function App(props: AppProps) {
    const { services } = props;

    const [themeMode, setThemeMode] = useState<ThemeMode>("dark");
    const [languageType, setLanguageType] = useState<LanguageType>("en");

    console.log("re-render");

    const ctx: AppContext = {
        services: props.services,
        lang: languageType == "en" ? services.lang.en : services.lang.hr,
        theme: themeMode == "dark" ? services.theme.dark : services.theme.light,
        setTheme: setThemeMode,
        setLang: setLanguageType,
    };

    ctx.services.config.theme = setThemeMode;
    ctx.services.config.lang = setLanguageType;

    useEffect(() => {
        const rootElement = document.querySelector(":root") as HTMLElement;

        if (themeMode === "light") {
            rootElement.style.setProperty("--track-background-color", "rgba(155, 155, 155, 0.33)");
            rootElement.style.setProperty("--thumb-background-color", "rgba(0, 0, 0, 0.45)");
            rootElement.style.setProperty("--thumb-hover-background-color", "rgba(0, 0, 0, 0.75)");
        } else {
            rootElement.style.setProperty("--track-background-color", "rgba(0, 0, 0, 0.33)");
            rootElement.style.setProperty("--thumb-background-color", "rgba(155, 155, 155, 0.65)");
            rootElement.style.setProperty(
                "--thumb-hover-background-color",
                "rgba(155, 155, 155, 0.25)"
            );
        }
    }, [themeMode]);

    return (
        <ThemeProvider theme={ctx.theme}>
            <CssBaseline />
            <SnackbarProvider
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                maxSnack={3}
                autoHideDuration={3000}
            >
                <appContext.Provider value={ctx}>
                    <SnackbarListener />
                    <AppWrapper />
                </appContext.Provider>
            </SnackbarProvider>
        </ThemeProvider>
    );
}
