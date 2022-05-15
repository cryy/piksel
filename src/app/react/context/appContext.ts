import { Lang, ServiceContainer } from "../services";
import { LanguageType, ThemeMode } from "../../ipc";

import React from "react";
import { Theme } from "@mui/material";

export interface AppContext {
    services: ServiceContainer;
    theme: Theme;
    lang: Lang;
    setTheme: (themeMode: ThemeMode) => void;
    setLang: (langType: LanguageType) => void;
}

export const appContext = React.createContext<AppContext | null>(null);
