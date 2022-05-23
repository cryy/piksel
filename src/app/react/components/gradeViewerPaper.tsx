import {
    Divider,
    Grid,
    Paper
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { GradeViewerDetails, GradeViewerTabs } from ".";
import { Grade } from "../../ipc";


export interface GradeViewerPaperProps {
    grade: Grade;
}

export function GradeViewerPaper({ grade }: GradeViewerPaperProps) {
    return (
        <Paper
            sx={{
                width: "clamp(786px, 90vw, 986px)",
                height: "clamp(424px, 80vh, 764px)"
            }}
        >
            <Grid container spacing={0}>
                <Grid item xs={1} />
                <Grid item xs={11}>
                    <GradeViewerDetails grade={grade} />
                </Grid>
            </Grid>
            <Divider />
            <Box sx={{
                display: "flex",
                flexGrow: 1,
                height: "calc(100% - 125px)"
            }}>
                <GradeViewerTabs grade={grade} />
            </Box>
        </Paper>
    );
}
