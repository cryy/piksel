import { Grid, Typography } from "@mui/material";
import React from "react";

export function IncompletedTasks() {
    return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <Typography variant="h5">
                    Incompleted
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>None to show here!</Typography>
            </Grid>
        </Grid>
    );
}
