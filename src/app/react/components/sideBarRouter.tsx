import { Box, IconButton, IconButtonProps, Link, Palette, Typography, styled } from "@mui/material";
import { Link as RouteLink, useLocation } from "react-router-dom";

import { Typography as CreateTypography } from "@mui/material/styles/createTypography";
import React from "react";
import { RouteFlags } from "../services";
import { keyframes } from "@mui/system";
import { useAppContext } from "../hooks";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const iconUnactiveStyles = (palette: Palette) => ({
    width: "1.1em",
    height: "1.1em",
    marginTop: "0",
    color: palette.action.active,
});

const iconActiveStyles = (palette: Palette) => ({
    width: "1.35em",
    height: "1.35em",
    marginTop: "23px",
    color: palette.primary.main,
});

const routeTransitionSelect = (palette: Palette) =>
    keyframes({
        from: iconUnactiveStyles(palette),
        to: iconActiveStyles(palette),
    });

const routeTransitionDeselect = (palette: Palette) =>
    keyframes({
        from: iconActiveStyles(palette),
        to: iconUnactiveStyles(palette),
    });

export const SideBarButton = styled(IconButton)(({ theme: { palette } }) => ({
    borderRadius: "4px",
    width: "60px",
    height: "60px",
    flexDirection: "column",
    opacity: 0.75,
    "& > svg": {
        ...iconUnactiveStyles(palette),
        animation: `${routeTransitionDeselect(palette)} 250ms ease-in-out`,
    },
    "& > p": {
        opacity: palette.mode === "dark" ? 0.75 : 1,
    },
    "&:hover": {
        opacity: 1,
        "& > p": {
            opacity: 1,
        },
    },
}));

export const ActiveSideBarButton = styled(SideBarButton)(({ theme: { palette } }) => {
    const background = palette.mode === "dark" ? palette.action.selected : palette.background.paper;

    return {
        opacity: 1,
        backgroundColor: background,
        "& > svg": {
            ...iconActiveStyles(palette),
            animation: `${routeTransitionSelect(palette)} 250ms ease`,
        },
        "& > p": {
            opacity: 0,
        },
        "&:hover": {
            backgroundColor: background,
            "& > p": {
                opacity: 0,
            },
        },
    };
});

export function SideBarRouter() {
    const {
        services: {
            routes: { routes },
        },
        lang,
    } = useAppContext();
    const navigator = useNavigate();
    const location = useLocation();

    const sideBarRoutes = routes.filter(r => (r.flags & RouteFlags.NoSidebar) !== RouteFlags.NoSidebar);

    return (
        <Box
            sx={{
                margin: "10vh 0",
                height: "80vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "5vh",
            }}
        >
            {sideBarRoutes.map((r) =>
                location.pathname === r.path ? (
                    <ActiveSideBarButton key={r.path} onClick={() => navigator(r.path)}>
                        {React.createElement(r.icon as any)}
                        <Typography variant="body2">{lang[r.name]}</Typography>
                    </ActiveSideBarButton>
                ) : (
                    <SideBarButton key={r.path} onClick={() => navigator(r.path)}>
                        {React.createElement(r.icon as any)}
                        <Typography variant="body2">{lang[r.name]}</Typography>
                    </SideBarButton>
                )
            )}
        </Box>
    );
}
