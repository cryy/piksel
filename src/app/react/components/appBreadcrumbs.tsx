import { NavigateNextRounded } from "@mui/icons-material";
import { Breadcrumbs, Grid, Link, Typography } from "@mui/material";
import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useAppContext } from "../hooks";


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
                                        {value.useLang ? lang[value.name] : value.name}
                                    </Typography>
                                ) : (
                                    <Link
                                        variant="h5"
                                        underline="hover"
                                        component={LinkRouter}
                                        to={value.link}
                                        key={value.link}
                                    >
                                       {value.useLang ? lang[value.name] : value.name}
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
