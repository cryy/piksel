import { Box } from "@mui/system";
import React from "react";
import { RoutingContainer } from "../routes";
import { SideBar } from ".";

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
            <RoutingContainer />
        </Box>
    );
}
