import { Box } from "@mui/material";
import React from "react";
import { WindowControls } from ".";

export function TopBar() {
    return (
        <Box
            sx={{
                position: "absolute",
                width: "calc(100% - 76px)",
                height: "30px",
                marginLeft: "76px",
                top: "0",
                zIndex: "9999999",
                pointerEvents: "none",
                display: "flex",
                justifyContent: "flex-end",
                "-webkit-app-region": "drag",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "150px"
                }}
            >
                <WindowControls />
            </Box>
        </Box>
    );
}
