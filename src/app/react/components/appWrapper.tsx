import { Box } from "@mui/system";
import React from "react";
import { SideBar, TopBar } from ".";
import { RoutingContainer } from "../routes";


export function AppWrapper() {
    return (
        <Box
            sx={{
                display: "flex",
                width: "100%",
                height: "100%",
                position: "absolute",
            }}
        >
            <SideBar />
            <TopBar />
            <RoutingContainer />
        </Box>
    );
}
