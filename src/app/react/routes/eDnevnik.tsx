import { Grid } from "@mui/material";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { GradeList } from "../components";
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
                    name: "ednevnikPage",
                    link: "/ednevnik",
                    useLang: true,
                    subroute: false
                },
            ]);
        }
    }, [location]);

    return (
        <Grid container spacing={0} marginBottom="64px">
            <Grid item xs={1} />
            <Grid item xs={10}>
                <Grid container spacing={2}>
                    <GradeList />
                </Grid>
            </Grid>
            <Grid item xs={1} />
        </Grid>
    );
}
