import { useRecoilValue, useSetRecoilState } from "recoil";

import React from "react";
import { useAppContext } from "../hooks";

export function Reminders() {

    const {
        lang,
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
                    name: lang.remindersPage,
                    link: "/reminders",
                },
            ]);
        }
    }, [location]);

    return "These are reminders";
}