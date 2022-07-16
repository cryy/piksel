import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React, { useState } from "react";
import { SettingContainer } from ".";
import { useAppContext } from "../hooks";


export function SettingAppVersion() {
    const {
        lang,
    } = useAppContext();


    return (
        <SettingContainer name={lang.appVersion}>
            <Typography variant="body1">v1.1.0</Typography>
        </SettingContainer>
    );
}
