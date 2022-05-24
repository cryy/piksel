import { CachedRounded } from "@mui/icons-material";
import { CircularProgress, Grid, Typography, IconButton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { LoadingPhase } from "../../ipc";
import { useAppContext } from "../hooks";
import { GradePreview } from "./gradePreview";
import Moment from "react-moment";

export interface GradeItemProps {
    children: React.ReactNode;
}

export function GradeItem(props: GradeItemProps) {
    return (
        <Grid
            item
            xs={6}
            md={4}
            lg={3}
            xl={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            {props.children}
        </Grid>
    );
}

export function GradeList() {
    const {
        lang,
        services: { recoil, ipc },
    } = useAppContext();

    const ednevnik = useRecoilValue(recoil.ednevnik);
    const username = useRecoilValue(recoil.carnetUsername);
    const password = useRecoilValue(recoil.carnetPassword);
    const loadingState = useRecoilValue(recoil.carnetLoadingPhase);
    const setId = useSetRecoilState(recoil.gradeViewerId);
    const navigator = useNavigate();

    const refresh = (e: any) => {
        ipc.send({
            name: "REFRESH",
            channel: "PUPPETEER",
        });
    };

    let component = null;

    if (loadingState === LoadingPhase.Loading || loadingState === LoadingPhase.LoggingIn) {
        component = (
            <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                <CircularProgress color="primary" />
            </Grid>
        );
    } else if (ednevnik && username && password) {
        component = (
            <>
                <Grid
                    item
                    xs={12}
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    gap="12px"
                >
                    {loadingState === LoadingPhase.Refreshing ? (
                        <>
                            <CircularProgress size="24px" color="primary" />
                            <Typography variant="body1">{lang.refreshing}</Typography>
                        </>
                    ) : (
                        <>
                            <IconButton onClick={refresh}>
                                <CachedRounded />
                            </IconButton>
                            <Typography variant="body1">
                                {lang.nextRefresh}{" "}
                                <Moment fromNow date={ednevnik.refresh} locale={lang.type} />
                            </Typography>
                        </>
                    )}
                </Grid>
                {ednevnik.grades.map((grade) => (
                    <GradeItem key={grade.href}>
                        <GradePreview onClick={() => handleClick(grade.href)} grade={grade} />
                    </GradeItem>
                ))}
                ;
            </>
        );
    } else {
        component = (
            <Grid item xs={12}>
                <Typography variant="body1">{lang.requiresCarnetIntegration}</Typography>
            </Grid>
        );
    }

    const handleClick = (href: string) => {
        const id = href.split("/").at(-2) ?? "";
        if (id) {
            setId(id);
            navigator("/ednevnik/gradeViewer");
        }
    };

    return component;
}
