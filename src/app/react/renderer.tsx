import { MemoryRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
    <>
        <MemoryRouter>Hello world!</MemoryRouter>
    </>
);
