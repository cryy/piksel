import { useRecoilValue, useSetRecoilState } from "recoil";

import React from "react";
import { useAppContext } from "../hooks";

export function Tasks() {
    const {
        services: {
            recoil: { displayLocation, activeBreadcrumbs },
        },
    } = useAppContext();

    const location = useRecoilValue(displayLocation);
    const setBreadcrumbs = useSetRecoilState(activeBreadcrumbs);

    React.useEffect(() => {
        if (location?.pathname === "/tasks") {
            setBreadcrumbs([
                {
                    name: "tasksPage",
                    link: "/tasks",
                    useLang: true
                },
            ]);
        }
    }, [location]);

    return "These are tasks";
}
