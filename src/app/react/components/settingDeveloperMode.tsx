import { CheckRounded } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ToggleButton } from "@mui/material";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { SettingContainer } from ".";
import { useAppContext } from "../hooks";


export function SettingDeveloperMode() {
    const {
        lang,
        services: { config, recoil: { developerMode } },
    } = useAppContext();

    const [ignore, setIgnore] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const devMode = useRecoilValue(developerMode);


    const handleChange = async (e: any) => {
        if (!devMode) {
            setDialogOpen(true);
        } else {
            await config.set("developerMode", false);
        }
    };

    const handleClose = (e: any) => {
        setDialogOpen(false);
    };

    const handleEnable = async (e: any) => {
        if (ignore) return;
        setIgnore(true);
        await config.set("developerMode", true);
        setIgnore(false);
        setDialogOpen(false);
    };

    return (
        <SettingContainer name={lang.developerMode}>
            <ToggleButton color="primary" value="check" selected={devMode} onChange={handleChange}>
                <CheckRounded />
            </ToggleButton>
            <Dialog open={dialogOpen}>
                <DialogTitle>{lang.enableDeveloperMode}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{lang.enableDeveloperModeExplanation}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={ignore}>
                        {lang.cancel}
                    </Button>
                    <Button onClick={handleEnable} autoFocus disabled={ignore}>
                        {lang.enable}
                    </Button>
                </DialogActions>
            </Dialog>
        </SettingContainer>
    );
}
