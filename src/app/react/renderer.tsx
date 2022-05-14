import "./assets/css/index.css";

import { App } from "./app";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import RecoilOutside from "recoil-outside";
import { RecoilRoot } from "recoil";
import { ServiceContainer } from "./services";

const services = new ServiceContainer();
const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
    <>
        <RecoilRoot>
            <MemoryRouter>
                <RecoilOutside />
                <App services={services} />
            </MemoryRouter>
        </RecoilRoot>
    </>
);
