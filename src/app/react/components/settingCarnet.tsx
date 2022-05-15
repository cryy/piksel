import { CircularProgress, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useState } from "react";

import { CheckRounded } from "@mui/icons-material";
import { LoadingPhase } from "../../ipc";
import { SettingContainer } from ".";
import { useAppContext } from "../hooks";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

export function SettingCarnet() {
    const {
        lang,
        services: {
            config,
            recoil: { carnetLoadingPhase },
        },
    } = useAppContext();

    const navigate = useNavigate();

    const condition = config.config.carnetPassword && config.config.carnetUsername ? true : false;
    const [carnet, setCarnet] = useState(condition);
    const loadingPhase = useRecoilValue(carnetLoadingPhase);
    const isLoading = loadingPhase === LoadingPhase.Loading;

    const handleChange = (e: any) => {
        navigate("/settings/carnet");
    };

    return (
        <SettingContainer name={lang.carnetIntegration}>
            <ToggleButton
                color="primary"
                value="check"
                selected={carnet}
                onChange={handleChange}
                disabled={isLoading}
            >
                {isLoading ? <CircularProgress size={24} /> : <CheckRounded />}
            </ToggleButton>
        </SettingContainer>
    );
}
