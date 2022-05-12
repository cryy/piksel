import { AppContext, appContext } from "./context";
import { LanguageType, ServiceContainer, ThemeMode } from "./services";
import React, { useEffect, useState } from "react";

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
    const [hour, setHour] = useState(new Date().getHours());

    console.log("re-render");

    useEffect(() => {
        const rootElement = document.querySelector(":root") as HTMLElement;

        if (themeMode === "light") {
            rootElement.style.setProperty("--track-background-color", "rgba(155, 155, 155, 0.33)");
            rootElement.style.setProperty("--thumb-background-color", "rgba(0, 0, 0, 0.45)");
            rootElement.style.setProperty("--thumb-hover-background-color", "rgba(0, 0, 0, 0.75)");
        }
        else {
            rootElement.style.setProperty("--track-background-color", "rgba(0, 0, 0, 0.33)");
            rootElement.style.setProperty("--thumb-background-color", "rgba(155, 155, 155, 0.65)");
            rootElement.style.setProperty("--thumb-hover-background-color", "rgba(155, 155, 155, 0.25)");
        }
    }, [themeMode]);

    const ctx: AppContext = {
        services: props.services,
        lang: languageType == "en" ? services.lang.en : services.lang.hr,
        theme: themeMode == "dark" ? services.theme.dark : services.theme.light,
        setTheme: setThemeMode,
        setLang: setLanguageType,
        hour: hour,
        setHour: setHour,
    };

    return (
        <ThemeProvider theme={ctx.theme}>
            <CssBaseline />
            <appContext.Provider value={ctx}>
                <AppWrapper />
            </appContext.Provider>
        </ThemeProvider>
    );
}
