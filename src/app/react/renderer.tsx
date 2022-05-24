import "./assets/css/index.css";

import { App } from "./app";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import RecoilOutside from "recoil-outside";
import { RecoilRoot } from "recoil";
import { ServiceContainer } from "./services";
import moment from "moment";

// adjust rounding in moment.js
moment.relativeTimeRounding(Math.floor);

// create a service container for makeshift dependency injection
const services = new ServiceContainer();
// root element for react
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
