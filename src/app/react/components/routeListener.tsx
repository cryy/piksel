import { Context, context } from "../context";
import React, { useEffect } from "react";

import { useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";

export function RouteListener() {
    const {
        services: {
            recoilService: { currentRoute },
        },
    } = React.useContext(context) as Context;
    const location = useLocation();
    const setCurrentRoute = useSetRecoilState(currentRoute);


    useEffect(() => {
        setCurrentRoute(location.pathname);
    }, [location]);

    return <React.Fragment />
}
