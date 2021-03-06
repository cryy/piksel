import { Box } from "@mui/material";
import React from "react";
import { useRecoilValue } from "recoil";
import { SideBarRouter } from ".";
import { BootFlags } from "../../ipc";
import { useAppContext } from "../hooks";

export function SideBar() {
    const {
        theme: {
            palette: { mode },
        },
        services: {
            recoil: { bootFlags, blur },
        },
    } = useAppContext();

    const flags = useRecoilValue(bootFlags);
    const useBlur = useRecoilValue(blur);


    let light = "#d9d9d9";
    let dark = "#1e1f25";

    const useBlurValues = (flags & BootFlags.BlurSupported) === BootFlags.BlurSupported && useBlur;

    if (useBlurValues) {
        light = "#ffffff9c";
        dark = "#25272ead";
    }

    const backgroundColor = mode == "light" ? light : dark;

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
