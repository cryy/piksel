import React, { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import { SettingContainer } from ".";
import { ThemeMode } from "../../ipc";
import { useAppContext } from "../hooks";

export function SettingTheme() {
    const {
        theme,
        lang,
        services: { config },
    } = useAppContext();

    const [ignore, setIgnore] = useState(false);

    const handleChange = async (e: any, newThemeMode: string) => {
        if (ignore || !newThemeMode || newThemeMode === theme.palette.mode) return;

        setIgnore(true);
        await config.set("theme", newThemeMode);
        setIgnore(false);
    };

    return (
        <SettingContainer name={lang.theme}>
            <ToggleButtonGroup
                color="primary"
                value={theme.palette.mode}
                onChange={handleChange}
                exclusive
            >
                <ToggleButton value="dark">{lang.dark}</ToggleButton>
                <ToggleButton value="light">{lang.light}</ToggleButton>
            </ToggleButtonGroup>
        </SettingContainer>
    );
}
