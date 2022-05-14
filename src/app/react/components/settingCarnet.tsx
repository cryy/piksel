import React, { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import { CheckRounded } from "@mui/icons-material";
import { SettingContainer } from ".";
import { useAppContext } from "../hooks";

export function SettingCarnet() {
    const {
        lang,
        services: { config },
    } = useAppContext();

    const condition = (config.config.carnetPassword && config.config.carnetUsername) ? true : false;
    const [carnet, setCarnet] = useState(condition);

    const handleChange = (e: any) => {
        
    };

    return (
        <SettingContainer name={lang.carnetIntegration}>
            <ToggleButton color="primary" value="check" selected={carnet} onChange={handleChange}>
                <CheckRounded />
            </ToggleButton>
        </SettingContainer>
    );
}
