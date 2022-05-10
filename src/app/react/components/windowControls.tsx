import { Box, Grid, IconButton, styled } from "@mui/material";
import { CloseRounded, CropSquareRounded, MinimizeRounded } from "@mui/icons-material";

import React from "react";
import { useContext } from "../hooks";

export const ControlButton = styled(IconButton)({
    width: "100%",
    height: "26px",
    borderRadius: "6px",
    "& .MuiSvgIcon-root": {
        width: "19px",
        height: "19px",
    },
});

export function WindowControls() {
    const {
        services: { ipc },
    } = useContext();

    return (
        <Box
            sx={{
                width: "140px",
                height: "26px",
                pointerEvents: "auto",
            }}
        >
            <Grid container spacing={0}>
                <Grid item xs={4}>
                    <ControlButton onClick={() => ipc.send({ name: "WIN_MIN" })}>
                        <MinimizeRounded />
                    </ControlButton>
                </Grid>
                <Grid item xs={4}>
                    <ControlButton onClick={() => ipc.send({ name: "WIN_MAX" })}>
                        <CropSquareRounded />
                    </ControlButton>
                </Grid>
                <Grid item xs={4}>
                    <ControlButton onClick={() => ipc.send({ name: "WIN_CLS" })}>
                        <CloseRounded />
                    </ControlButton>
                </Grid>
            </Grid>
        </Box>
    );
}
