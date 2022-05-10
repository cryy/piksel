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
                width: "100%",
                height: "100%",
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
