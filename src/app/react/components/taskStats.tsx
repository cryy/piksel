import { Grid, Typography } from "@mui/material";
import React from "react";
import { useRecoilValue } from "recoil";
import { useAppContext } from "../hooks";

export function TaskStats() {
    const {
        services: {
            recoil: { taskStats },
        },
    } = useAppContext();

    const stats = useRecoilValue(taskStats);

    return (
        <Grid container spacing={0} margin="24px 0 48px 0">
            <Grid item xs={4} display="flex" justifyContent="center" alignItems="center">
                <Typography>
                    <b>{stats.total}</b> total
                </Typography>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="center" alignItems="center">
                <Typography>
                    <b>{stats.completed}</b> completed
                </Typography>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="center" alignItems="center">
                <Typography>
                    <b>{stats.incompleted}</b> incompleted
                </Typography>
            </Grid>
        </Grid>
    );
}
