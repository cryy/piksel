import { LangChanger, ThemeChanger } from "../components";

import { Box } from "@mui/material";
import React from "react";
import { useContext } from "../hooks";

export function RoutingContainer() {
    const {
        theme: {
            palette: { mode },
        },
    } = useContext();

    const backgroundColor = mode == "light" ? "#ffffff" : "#101010";

    return (
        <Box
            sx={{
                width: "calc(100% - 76px)",
                height: "100%",
                position: "absolute",
                marginLeft: "76px",
                backgroundColor: { backgroundColor },
                borderBottomRightRadius: "6px",
                borderTopRightRadius: "6px",
            }}
        >
            <ThemeChanger />
            <LangChanger />
        </Box>
    );
}
