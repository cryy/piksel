import { useRecoilValue, useSetRecoilState } from "recoil";

import { CarnetIntegrationInput } from "../components";
import { Grid } from "@mui/material";
import React from "react";
import { useAppContext } from "../hooks";

export function CarnetIntegration() {
    const {
        services: {
            recoil: { displayLocation, activeBreadcrumbs },
        },
    } = useAppContext();

    const location = useRecoilValue(displayLocation);
    const setBreadcrumbs = useSetRecoilState(activeBreadcrumbs);

    React.useEffect(() => {
        if (location?.pathname === "/settings/carnet") {
            setBreadcrumbs((breadcrumbs) => [
                ...breadcrumbs,
                {
                    name: "carnetIntegration",
                    link: "/settings/carnet",
                    useLang: true
                },
            ]);
        }
    }, [location]);

    return (
        <Grid container spacing={0} marginBottom="24px">
            <Grid item xs={1} />
            <Grid item xs={10} display="flex" justifyContent="center" alignItems="center">
                <CarnetIntegrationInput />
            </Grid>
            <Grid item xs={1} />
        </Grid>
    );
}
