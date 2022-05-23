import React from "react";
import { AppContext, appContext } from "../context";


export function useAppContext() {
    const ctx = React.useContext(appContext) as AppContext;

    return ctx;
}
