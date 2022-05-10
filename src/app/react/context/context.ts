import { Lang, LanguageType, ServiceContainer, ThemeMode } from "../services";

import React from "react";
import { Theme } from "@mui/material";

export interface Context {
    services: ServiceContainer;
    theme: Theme;
    lang: Lang;
    hour: number;
    setTheme: (themeMode: ThemeMode) => void;
    setLang: (langType: LanguageType) => void;
    setHour: (h: number) => void;
}

export const context = React.createContext<Context | null>(null);
