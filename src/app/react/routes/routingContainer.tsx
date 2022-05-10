import { HourChanger, LangChanger, ThemeChanger } from "../components";
import { Route, Routes } from "react-router-dom";

import { Box } from "@mui/material";
import { Home } from ".";
import React from "react";
import { useContext } from "../hooks";

export function RoutingContainer() {
    const {
        theme: {
            palette: { background },
        },
    } = useContext();

    return (
        <Box
            sx={{
                width: "calc(100% - 76px)",
                height: "100%",
                position: "absolute",
                marginLeft: "76px",
                background: background.default,
                borderBottomRightRadius: "6px",
                borderTopRightRadius: "6px",
                overflow: "auto"
            }}
        >
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/experimental" element={"This is an experimental page"} />
            </Routes>
            <Box sx={{ marginTop: "100px" }}>
                Debug tools
                <LangChanger />
                <ThemeChanger />
                <HourChanger />
            </Box>
        </Box>
    );
}
