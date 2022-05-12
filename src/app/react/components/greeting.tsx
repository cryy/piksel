import { Box, Grid, Typography } from "@mui/material";

import Afternoon from "../assets/images/afternoon.svg";
import Morning from "../assets/images/morning.svg";
import Night from "../assets/images/night.svg";
import React from "react";
import { useAppContext } from "../hooks";

export function Greeting() {
    const { lang, hour } = useAppContext();
    const hours = hour;
    const resources = (() => {
        if (hours >= 6 && hours <= 11)
            return {
                text: lang.goodMorning,
                src: Morning,
            };
        else if (hours >= 12 && hours <= 18)
            return {
                text: lang.goodAfternoon,
                src: Afternoon,
            };
        else
            return {
                text: lang.goodEvening,
                src: Night,
            };
    })();

    return (
        <Grid container spacing={0}>
            <Grid item xs={5} display="flex" alignItems="center" justifyContent="center">
                <Typography variant="h3">{resources.text}</Typography>
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={6} display="flex" alignItems="center" justifyContent="center">
                <img
                    src={resources.src}
                    style={{
                        width: "clamp(200px, 40vw, 500px)",
                    }}
                />
            </Grid>
        </Grid>
    );
}
