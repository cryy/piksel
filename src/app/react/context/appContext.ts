import { Theme } from "@mui/material";
import React from "react";
import { LanguageType, ThemeMode } from "../../ipc";
import { Lang, ServiceContainer } from "../services";


export interface AppContext {
    services: ServiceContainer;
    theme: Theme;
    lang: Lang;
    setTheme: (themeMode: ThemeMode) => void;
    setLang: (langType: LanguageType) => void;
}

export const appContext = React.createContext<AppContext | null>(null);
