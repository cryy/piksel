import { Box, Grid } from "@mui/material";
import React from "react";
import { Greeting } from "../components";

export function Home() {
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
