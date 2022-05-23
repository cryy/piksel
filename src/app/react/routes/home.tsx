import { Box, Grid } from "@mui/material";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Greeting } from "../components";
import { useAppContext } from "../hooks";


export function Home() {
    const {
        lang,
        services: {
            recoil: { displayLocation, activeBreadcrumbs },
        },
    } = useAppContext();

    const location = useRecoilValue(displayLocation);
    const setBreadcrumbs = useSetRecoilState(activeBreadcrumbs);

    React.useEffect(() => {
        if (location?.pathname === "/") {
            setBreadcrumbs([]);
        }
    }, [location]);
    
    return (
        <Box>
            <Box
                sx={{
                    marginTop: "20vh",
                }}
            >
                <Grid container spacing={0}>
                    <Grid item xs={1} />
                    <Grid item xs={10}>
                        <Greeting />
                    </Grid>
                    <Grid item xs={1} />
                </Grid>
            </Box>
        </Box>
    );
}
