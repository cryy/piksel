import { CheckRounded } from "@mui/icons-material";
import { ToggleButton } from "@mui/material";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { SettingContainer } from ".";
import { useAppContext } from "../hooks";


export function SettingBlur() {
    const {
        lang,
        services: { config, recoil: { blur } },
    } = useAppContext();

    const [ignore, setIgnore] = useState(false);
    const appBlur = useRecoilValue(blur);

    const handleChange = async (e: any) => {
        if(ignore) return;

        setIgnore(true);
        await config.set("blur", !appBlur);
        setIgnore(false);
    };

    return (
        <SettingContainer name={lang.blur}>
            <ToggleButton color="primary" value="check" selected={appBlur} onChange={handleChange}>
                <CheckRounded />
            </ToggleButton>
        </SettingContainer>
    );
}
