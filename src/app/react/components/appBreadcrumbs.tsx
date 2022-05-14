import { Breadcrumbs, Grid, Link, Typography } from "@mui/material";
import { Link as LinkRouter, useLocation } from "react-router-dom";
import React, { useContext } from "react";
import { Route, RouteFlags } from "../services";

import { NavigateNextRounded } from "@mui/icons-material";
import { useAppContext } from "../hooks";
import { useRecoilValue } from "recoil";

export function AppBreadcrumbs() {
    const {
        lang,
        services: {
            recoil: { activeBreadcrumbs },
        },
    } = useAppContext();
    
    const breadcrumbs = useRecoilValue(activeBreadcrumbs);

    return (
        <>
            {breadcrumbs.length > 0 && (
                <Grid
                    container
                    spacing={0}
                    sx={{
                        margin: "10vh 0",
                    }}
                >
                    <Grid item xs={1} />
                    <Grid item xs={10}>
                        <Breadcrumbs separator={<NavigateNextRounded />}>
                            {breadcrumbs.map((value, index) => {
                                const last = index === breadcrumbs.length - 1;
                                
                                return last ? (
                                    <Typography color="text.primary" variant="h5" key={value.link}>
                                        {value.name}
                                    </Typography>
                                ) : (
                                    <Link
                                        variant="h5"
                                        underline="hover"
                                        component={LinkRouter}
                                        to={value.link}
                                        key={value.link}
                                    >
                                        {value.name}
                                    </Link>
                                );
                            })}
                        </Breadcrumbs>
                    </Grid>
                    <Grid item xs={1} />
                </Grid>
            )}
        </>
    );
}
