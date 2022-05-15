import { useRecoilValue, useSetRecoilState } from "recoil";

import React from "react";
import { useAppContext } from "../hooks";

export function Reminders() {

    const {
        services: {
            recoil: { displayLocation, activeBreadcrumbs },
        },
    } = useAppContext();

    const location = useRecoilValue(displayLocation);
    const setBreadcrumbs = useSetRecoilState(activeBreadcrumbs);

    React.useEffect(() => {
        if (location?.pathname === "/reminders") {
            setBreadcrumbs([
                {
                    name: "remindersPage",
                    link: "/reminders",
                    useLang: true
                },
            ]);
        }
    }, [location]);

    return "These are reminders";
}