import { useRecoilValue, useSetRecoilState } from "recoil";

import React from "react";
import { useAppContext } from "../hooks";

export function Tasks() {
    const {
        lang,
        services: {
            recoil: { displayLocation, activeBreadcrumbs },
        },
    } = useAppContext();

    const location = useRecoilValue(displayLocation);
    const setBreadcrumbs = useSetRecoilState(activeBreadcrumbs);

    React.useEffect(() => {
        console.log("entry");
        if (location?.pathname === "/tasks") {
            setBreadcrumbs([
                {
                    name: lang.tasksPage,
                    link: "/tasks",
                },
            ]);
        }
    }, [location]);

    return "These are tasks";
}
