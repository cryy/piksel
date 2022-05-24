import {
    Tab,
    Tabs
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { GradeViewerAbsences, GradeViewerExams, GradeViewerNotes, GradeViewerSchedule } from ".";
import { Grade } from "../../ipc";
import { useAppContext } from "../hooks";
import { GradeViewerSubjects } from "./gradeViewerSubjects";


export interface GradeViewerTabsProps {
    grade: Grade;
}

function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            sx={{
                overflow: "auto",
                width: "100%",
            }}
            {...other}
        >
            {value === index && (
                <Box
                    sx={{
                        margin: "32px 0",
                    }}
                >
                    {children}
                </Box>
            )}
        </Box>
    );
}

export function GradeViewerTabs({ grade }: GradeViewerTabsProps) {

    const { lang } = useAppContext();

    const [value, setValue] = useState(0);

    const handleChange = (e: any, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                sx={{
                    borderRight: 1,
                    borderColor: "divider",
                    height: "100%",
                    "& > .MuiTabs-scroller > .MuiTabs-flexContainer": {
                        height: "100%",
                        justifyContent: "center",
                    },
                }}
            >
                <Tab label={lang.grades} id="vertical-tab-0" />
                <Tab label={lang.notes} id="vertical-tab-1" />
                <Tab label={lang.exams} id="vertical-tab-2" />
                <Tab label={lang.absences} id="vertical-tab-3" />
                <Tab label={lang.schedule} id="vertical-tab-4" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <GradeViewerSubjects grade={grade} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <GradeViewerNotes grade={grade} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <GradeViewerExams grade={grade} />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <GradeViewerAbsences grade={grade} />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <GradeViewerSchedule grade={grade} />
            </TabPanel>
        </>
    );
}
