import React from "react";
import { ServiceContainer } from "./services";
import { ThemeProvider } from "@mui/material/styles";

export interface AppProps {
    services: ServiceContainer;
}

export function App(props: AppProps) {
    return <ThemeProvider theme={props.services.recoilService.currentTheme}>
        Hello world!
    </ThemeProvider>;
}
