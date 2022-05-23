import { Box } from "@mui/material";
import { keyframes } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { AppBreadcrumbs } from "../components";
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
            recoil,
        },
    } = useAppContext();

    const location = useLocation();

    const [displayLocation, setDisplayLocation] = useRecoilState(recoil.displayLocation);
    const [stage, setStage] = useState("fadeIn");

    useEffect(() => {
        if (location.pathname !== displayLocation?.pathname) setStage("fadeOut");
    }, [location, displayLocation]);

    useEffect(() => {
        setDisplayLocation(location);
    }, []);

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
                  animation: `${fadeIn} 125ms ease`,
              }
            : {
                  ...fadeOutStyling,
                  animation: `${fadeOut} 125ms ease-in-out`,
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
            <AppBreadcrumbs />
            <Box sx={containerStyling} onAnimationEnd={animationEnd}>
                <Routes location={displayLocation ?? undefined}>
                    {routes.map((route) => (
                        <Route key={route.path} path={route.path} element={route.component()} />
                    ))}
                </Routes>
            </Box>
        </Box>
    );
}
