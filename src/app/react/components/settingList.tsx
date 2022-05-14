import { SettingBlur, SettingCarnet, SettingLang, SettingTheme } from ".";

import { Grid } from "@mui/material";
import React from "react";

export interface SettingListItemProps {
    children: React.ReactNode;
}

export function SettingListItem(props: SettingListItemProps) {
    return (
        <Grid item xs={6} lg={3} display="flex" justifyContent="center" alignItems="center">
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
        </>
    );
}
