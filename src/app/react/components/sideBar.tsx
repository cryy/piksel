import { Box } from "@mui/material";
import React from "react";
import { SideBarRouter } from ".";
import { useAppContext } from "../hooks";

export function SideBar() {
    const {
        theme: {
            palette: { mode },
        },
    } = useAppContext();

    const backgroundColor = mode == "light" ? "#ffffffca" : "#25272ec0";

    return (
        <Box
            sx={{
                width: "76px",
                borderTopLeftRadius: "6px",
                borderBottomLeftRadius: "6px",
                backgroundColor: backgroundColor,
                "-webkit-app-region": "drag",
            }}
        >
            <SideBarRouter />
        </Box>
    );
}
