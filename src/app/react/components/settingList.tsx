import { Grid } from "@mui/material";
import React from "react";
import { SettingBlur, SettingCarnet, SettingDeveloperMode, SettingLang, SettingTheme } from ".";


export interface SettingListItemProps {
    children: React.ReactNode;
}

export function SettingListItem(props: SettingListItemProps) {
    return (
        <Grid item xs={6} md={4} lg={3} xl={2} display="flex" justifyContent="center" alignItems="center">
            {props.children}
        </Grid>
    );
}

export function SettingList() {
    return (
        <>
            <SettingListItem>
                <SettingLang />
            </SettingListItem>
            <SettingListItem>
                <SettingTheme />
            </SettingListItem>
            <SettingListItem>
                <SettingBlur />
            </SettingListItem>
            <SettingListItem>
                <SettingCarnet />
            </SettingListItem>
            <SettingListItem>
                <SettingDeveloperMode />
            </SettingListItem>
        </>
    );
}
