import { Box } from "@mui/material";
import React from "react";
import { useContext } from "../hooks";

export function SideBar() {
    const {
        theme: {
            palette: { mode },
        },
    } = useContext();

    const backgroundColor = mode == "light" ? "#ffffff66" : "#10101066";

    return (
        <Box
            sx={{
                width: "76px",
                borderTopLeftRadius: "6px",
                borderBottomLeftRadius: "6px",
                backgroundColor: { backgroundColor },
                "-webkit-app-region": "drag",
            }}
        ></Box>
    );
}
