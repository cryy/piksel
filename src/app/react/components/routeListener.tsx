import React, { useEffect } from "react";

import { useAppContext } from "../hooks";
import { useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";

export function RouteListener() {
    const {
        services: {
            recoil: { currentRoute },
        },
    } = useAppContext();
    const location = useLocation();
    const setCurrentRoute = useSetRecoilState(currentRoute);


    useEffect(() => {
        setCurrentRoute(location.pathname);
    }, [location]);

    return <React.Fragment />
}
