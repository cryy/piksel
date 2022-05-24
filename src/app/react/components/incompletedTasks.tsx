import { Grid, Typography } from "@mui/material";
import React from "react";
import { useRecoilValue } from "recoil";
import { useAppContext } from "../hooks";
import { TaskList } from "./taskList";

export function IncompletedTasks() {
    const {
        services: { recoil },
        lang
    } = useAppContext();

    const tasks = useRecoilValue(recoil.tasks);

    const filteredTasks = tasks
        .filter((x) => !x.done)
        .sort((a, b) => {
            if (a.priority < b.priority) return 1;
            else if (a.priority > b.priority) return -1;
            else return 0;
        });

    return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <Typography variant="h5">{lang.incompleted}</Typography>
            </Grid>
            <Grid item xs={12} marginTop="16px">
                <Grid container spacing={2}>
                    <TaskList tasks={filteredTasks} />
                </Grid>
            </Grid>
        </Grid>
    );
}
