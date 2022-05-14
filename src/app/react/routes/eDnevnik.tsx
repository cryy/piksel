import { useRecoilValue, useSetRecoilState } from "recoil";

import React from "react";
import { useAppContext } from "../hooks";

export function EDnevnik() {
    const {
        lang,
        services: {
            recoil: { displayLocation, activeBreadcrumbs },
        },
    } = useAppContext();

    const location = useRecoilValue(displayLocation);
    const setBreadcrumbs = useSetRecoilState(activeBreadcrumbs);

    React.useEffect(() => {
        if (location?.pathname === "/ednevnik") {
            setBreadcrumbs([
                {
                    name: lang.ednevnikPage,
                    link: "/ednevnik",
                },
            ]);
        }
    }, [location]);

    return "eDnevnik";
}
