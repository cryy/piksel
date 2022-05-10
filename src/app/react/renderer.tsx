import { App } from "./app";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { ServiceContainer } from "./services";
import "./assets/css/index.css";

const services = new ServiceContainer();
const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
    <>
        <RecoilRoot>
            <MemoryRouter>
                <App services={services} />
            </MemoryRouter>
        </RecoilRoot>
    </>
);
