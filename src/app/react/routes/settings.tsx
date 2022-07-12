import { Grid, Typography } from "@mui/material";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { SettingList } from "../components";
import { useAppContext } from "../hooks";

export function Settings() {
    const {
        services: {
            recoil: { displayLocation, activeBreadcrumbs, developerMode },
        },
    } = useAppContext();

    const location = useRecoilValue(displayLocation);
    const devMode = useRecoilValue(developerMode);
    const setBreadcrumbs = useSetRecoilState(activeBreadcrumbs);

    React.useEffect(() => {
        if (location?.pathname === "/settings") {
            setBreadcrumbs([
                {
                    name: "settingsPage",
                    link: "/settings",
                    useLang: true,
                    subroute: false,
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
