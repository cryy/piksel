import { Context, context } from "../context";

import React from "react";

export function useContext() {
    const ctx = React.useContext(context) as Context;

    return ctx;
}
