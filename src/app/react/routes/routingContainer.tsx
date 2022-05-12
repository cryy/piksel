import { HourChanger, LangChanger, ThemeChanger } from "../components";
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { Box } from "@mui/material";
import { keyframes } from "@mui/system";
import { useAppContext } from "../hooks";

const fadeInStyling = {
    opacity: 1,
    transform: "translate(0px, 0px)",
};

const fadeOutStyling = {
    opacity: 0,
    transform: "translate(-20px, 0)",
};

const fadeIn = keyframes({
    from: fadeOutStyling,
    to: fadeInStyling,
});

const fadeOut = keyframes({
    from: fadeInStyling,
    to: fadeOutStyling,
});

export function RoutingContainer() {
    const {
        theme: {
            palette: { background },
        },
        services: {
            routes: { routes },
        },
    } = useAppContext();

    const location = useLocation();

    const [displayLocation, setDisplayLocation] = useState(location);
    const [stage, setStage] = useState("fadeIn");

    useEffect(() => {
        if (location !== displayLocation) setStage("fadeOut");
    }, [location, displayLocation]);

    const animationEnd = () => {
        if (stage === "fadeOut") {
            setStage("fadeIn");
            setDisplayLocation(location);
        }
    };

    const containerStyling =
        stage === "fadeIn"
            ? {
                  ...fadeInStyling,
                  animation: `${fadeIn} 250ms ease`,
              }
            : {
                  ...fadeOutStyling,
                  animation: `${fadeOut} 250ms ease-in-out`,
              };

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
                overflow: "auto",
            }}
        >
            <Box sx={containerStyling} onAnimationEnd={animationEnd}>
                <Routes location={displayLocation}>
                    {routes.map((route) => (
                        <Route key={route.path} path={route.path} element={route.component()} />
                    ))}
                </Routes>
                <Box sx={{ marginTop: "100px" }}>
                    Debug tools
                    <LangChanger />
                    <ThemeChanger />
                    <HourChanger />
                </Box>
            </Box>
        </Box>
    );
}
