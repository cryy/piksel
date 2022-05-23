import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useState } from "react";
import { SettingContainer } from ".";
import { useAppContext } from "../hooks";


export function SettingLang() {
    const {
        lang,
        services: { config },
    } = useAppContext();

    const [ignore, setIgnore] = useState(false);

    const handleChange = async (e: any, newLanguage: string) => {
        if (ignore || !newLanguage || newLanguage === lang.type) return;

        setIgnore(true);
        await config.set("lang", newLanguage);
        setIgnore(false);
    };

    return (
        <SettingContainer name={lang.language}>
            <ToggleButtonGroup color="primary" value={lang.type} onChange={handleChange} exclusive>
                <ToggleButton value="en">English</ToggleButton>
                <ToggleButton value="hr">Hrvatski</ToggleButton>
            </ToggleButtonGroup>
        </SettingContainer>
    );
}
