import { AppContext, appContext } from "../context";

import React from "react";

export function useAppContext() {
    const ctx = React.useContext(appContext) as AppContext;

    return ctx;
}
