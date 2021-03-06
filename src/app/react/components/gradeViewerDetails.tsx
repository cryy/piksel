import {
    Divider, Typography
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Grade } from "../../ipc";
import { useAppContext } from "../hooks";


export interface GradeViewerDetailsProps {
    grade: Grade;
}

export function GradeViewerDetails({ grade }: GradeViewerDetailsProps) {

    const { lang } = useAppContext();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                margin: "32px 0",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Typography variant="h5">{grade.name}</Typography>
                <Typography variant="body1">{grade.date}</Typography>
            </Box>
            <Divider
                orientation="vertical"
                flexItem
                sx={{
                    margin: "0 24px",
                }}
            />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Typography variant="h6">{grade.schoolName}</Typography>
                <Typography variant="body1">{lang.headroomTeacher}: {grade.headroomTeacher}</Typography>
            </Box>
        </Box>
    );
}
