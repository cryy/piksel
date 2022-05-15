import { Divider, Grid, Paper, Typography } from "@mui/material";

import { Grade } from "../../ipc";
import React from "react";

export interface GradePreviewProps {
    grade: Grade;
    onClick?: () => void;
}

export function GradePreview({ grade, onClick }: GradePreviewProps) {
    return (
        <Paper
            sx={{
                width: "256px",
                height: "196px",
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
                <Grid item xs={10} display="flex" justifyContent="center" alignItems="center">
                    <Typography variant="h5">{grade.name}</Typography>
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
                            xs={6}
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
                                Završni prosjek
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="center"
                        >
                            <Typography
                                variant="body1"
                                color={
                                    grade.passingGrade === "-" ? undefined : "success.dark"
                                }
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
