import { Grid } from "@mui/material";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CarnetIntegrationInput, TaskCreatorInput } from "../components";
import { useAppContext } from "../hooks";


export function TaskCreator() {
    const {
        services: {
            recoil: { displayLocation, activeBreadcrumbs },
        },
    } = useAppContext();

    const location = useRecoilValue(displayLocation);
    const setBreadcrumbs = useSetRecoilState(activeBreadcrumbs);

    React.useEffect(() => {
        if (location?.pathname === "/tasks/create") {
            setBreadcrumbs((breadcrumbs) => [
                ...breadcrumbs,
                {
                    name: "createTask",
                    link: "/tasks/create",
                    useLang: true,
                    subroute: true
                },
            ]);
        }
    }, [location]);

    return (
        <Grid container spacing={0} marginBottom="64px">
            <Grid item xs={1} />
            <Grid item xs={10} display="flex" justifyContent="center" alignItems="center">
                <TaskCreatorInput />
            </Grid>
            <Grid item xs={1} />
        </Grid>
    );
}
