import "./assets/css/index.css";

import { App } from "./app";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import RecoilOutside from "recoil-outside";
import { RecoilRoot } from "recoil";
import { ServiceContainer } from "./services";
import { SnackbarProvider } from "notistack";

const services = new ServiceContainer();
const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
    <>
        <RecoilRoot>
            <MemoryRouter>
                <RecoilOutside />
                <SnackbarProvider maxSnack={3}>
                    <App services={services} />
                </SnackbarProvider>
            </MemoryRouter>
        </RecoilRoot>
    </>
);
