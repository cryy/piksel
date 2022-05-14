import { useRecoilValue, useSetRecoilState } from "recoil";

import { Grid } from "@mui/material";
import React from "react";
import { SettingList } from "../components";
import { useAppContext } from "../hooks";

export function Settings() {

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
        if (location?.pathname === "/settings") {
            setBreadcrumbs([
                {
                    name: lang.settingsPage,
                    link: "/settings",
                },
            ]);
        }
    }, [location]);
    
    return (
        <Grid container spacing={0}>
            <Grid item xs={1} />
            <Grid item xs={10}>
                <Grid container spacing={2}>
                    <SettingList />
                </Grid>
            </Grid>
            <Grid item xs={1} />
        </Grid>
    );
}
