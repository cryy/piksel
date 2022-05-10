import { Context, context } from "./context";
import { LanguageType, ServiceContainer, ThemeMode } from "./services";
import React, { useState } from "react";

import { AppWrapper } from "./components";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

export interface AppProps {
    services: ServiceContainer;
}

export function App(props: AppProps) {

    const { services } = props;

    const [themeMode, setThemeMode] = useState<ThemeMode>("dark");
    const [languageType, setLanguageType] = useState<LanguageType>("en");

    const ctx: Context = {
        services: props.services,
        lang: languageType == "en" ? services.langService.en : services.langService.hr,
        theme: themeMode == "dark" ? services.themeService.dark : services.themeService.light,
        setTheme: setThemeMode,
        setLang: setLanguageType
    };


    return (
        <ThemeProvider theme={ctx.theme}>
            <CssBaseline />
            <context.Provider value={ctx}>
                <AppWrapper />
            </context.Provider>
        </ThemeProvider>
    );
}
