import { CheckRounded } from "@mui/icons-material";
import {
    CircularProgress,
    ToggleButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
    Button,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { SettingContainer } from ".";
import { LoadingPhase } from "../../ipc";
import { useAppContext } from "../hooks";

export function SettingCarnet() {
    const {
        lang,
        services: {
            config,
            ipc,
            recoil: { carnetLoadingPhase, carnetUsername, carnetPassword },
        },
    } = useAppContext();

    const navigate = useNavigate();

    const [ignore, setIgnore] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const loadingPhase = useRecoilValue(carnetLoadingPhase);
    const username = useRecoilValue(carnetUsername);
    const password = useRecoilValue(carnetPassword);

    const isLoading = loadingPhase === LoadingPhase.Loading;
    const isSelected = Boolean(username && password);

    const handleChange = (e: any) => {
        if (isSelected) {
            setDialogOpen(true);
        } else {
            navigate("/settings/carnet");
        }
    };

    const handleClose = (e: any) => {
        setDialogOpen(false);
    };

    const handleDisable = async (e: any) => {
        if (ignore) return;
        setIgnore(true);
        await ipc.send({
            name: "CARNET_LOGOUT",
            channel: "PUPPETEER",
        });
        setIgnore(false);
        setDialogOpen(false);
    };

    return (
        <SettingContainer name={lang.carnetIntegration}>
            <ToggleButton
                color="primary"
                value="check"
                selected={isSelected}
                onChange={handleChange}
                disabled={isLoading}
            >
                {isLoading ? <CircularProgress size={24} /> : <CheckRounded />}
            </ToggleButton>
            <Dialog open={dialogOpen}>
                <DialogTitle>{lang.signOutOfCarnet}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{lang.signOutOfCarnetExplanation}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={ignore}>
                        {lang.cancel}
                    </Button>
                    <Button onClick={handleDisable} autoFocus disabled={ignore}>
                        {lang.disable}
                    </Button>
                </DialogActions>
            </Dialog>
        </SettingContainer>
    );
}
