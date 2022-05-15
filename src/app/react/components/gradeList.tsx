import { SettingBlur, SettingCarnet, SettingLang, SettingTheme } from ".";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { GradePreview } from "./gradePreview";
import { Grid } from "@mui/material";
import React from "react";
import { useAppContext } from "../hooks";
import { useNavigate } from "react-router-dom";

export interface GradeItemProps {
    children: React.ReactNode;
}

export function GradeItem(props: GradeItemProps) {
    return (
        <Grid item xs={6} md={4} lg={3} xl={2} display="flex" justifyContent="center" alignItems="center">
            {props.children}
        </Grid>
    );
}

export function GradeList() {
    const {
        services: { recoil },
    } = useAppContext();

    const ednevnik = useRecoilValue(recoil.ednevnik);
    const setId = useSetRecoilState(recoil.gradeViewerId);
    const navigator = useNavigate();

    const handleClick = (href: string) => {
        const id = href.split("/").at(-2) ?? "";
        if (id) {
            setId(id);
            navigator("/ednevnik/gradeViewer");
        }
    };

    return (
        <>
            {ednevnik?.grades.map((grade) => (
                <GradeItem key={grade.href}>
                    <GradePreview onClick={() => handleClick(grade.href)} grade={grade} />
                </GradeItem>
            ))}
        </>
    );
}
