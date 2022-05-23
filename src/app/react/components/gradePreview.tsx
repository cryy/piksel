import { Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { Grade } from "../../ipc";
import { useAppContext } from "../hooks";


export interface GradePreviewProps {
    grade: Grade;
    onClick?: () => void;
}

export function GradePreview({ grade, onClick }: GradePreviewProps) {

    const { lang, theme } = useAppContext();
    const successColor = theme.palette.mode === "dark" ? theme.palette.success.main : theme.palette.success.dark;
    const passingGradeColor = grade.passingGrade === "-" ? undefined : successColor;

    return (
        <Paper
            sx={{
                width: "256px",
                height: "230px",
                cursor: "pointer",
            }}
            onClick={onClick}
        >
            <Grid
                container
                spacing={0}
                sx={{
                    margin: "24px 0",
                    height: "calc(100% - 24px)",
                }}
            >
                <Grid item xs={1} />
                <Grid
                    item
                    xs={10}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                >
                    <Typography variant="h5">{grade.name}</Typography>
                    <Typography variant="body1">{grade.date}</Typography>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={1} />
                <Grid item xs={10} display="flex" justifyContent="flex-start" alignItems="center">
                    <Typography variant="body1">{grade.schoolName}</Typography>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={12} display="flex" alignItems="center">
                    <Divider
                        sx={{
                            width: "100%",
                        }}
                    />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={10}>
                    <Grid container spacing={0}>
                        <Grid
                            item
                            xs={8}
                            display="flex"
                            justifyContent="flex-start"
                            alignItems="center"
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 600,
                                }}
                            >
                                {lang.finalAverage}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={4}
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="center"
                        >
                            <Typography
                                variant="body1"
                                color={passingGradeColor}
                            >
                                {grade.passingGrade}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={1} />
            </Grid>
        </Paper>
    );
}
