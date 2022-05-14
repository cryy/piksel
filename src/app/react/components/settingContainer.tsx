import { Grid, Paper, Typography } from "@mui/material";

import React from "react";

export interface SettingContainerProps {
    name: string;
    children: React.ReactNode;
}

export function SettingContainer(props: SettingContainerProps) {
    return (
        <Paper
            sx={{
                width: "256px",
                height: "148px"
            }}
        >
            <Grid container spacing={0}>
                <Grid item xs={1} />
                <Grid item xs={10}>
                    <Typography variant="h6" fontWeight="600" margin="12px 0">
                        {props.name}
                    </Typography>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={1} />
                <Grid item xs={10} display="flex" justifyContent="center" alignItems="center">
                    {props.children}
                </Grid>
                <Grid item xs={1} />
            </Grid>
        </Paper>
    );
}
