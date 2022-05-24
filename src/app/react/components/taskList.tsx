import { CachedRounded } from "@mui/icons-material";
import { CircularProgress, Grid, Typography, IconButton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { LoadingPhase, Task } from "../../ipc";
import { useAppContext } from "../hooks";
import { TaskPreview } from ".";
import Moment from "react-moment";

export interface TaskItemProps {
    children: React.ReactNode;
}

export function TaskItem(props: TaskItemProps) {
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

export interface TaskListProps {
    tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
    const {
        lang,
        services: { recoil, ipc },
    } = useAppContext();

    const setTaskId = useSetRecoilState(recoil.openTaskId);

    return (
        <>
            {tasks.length > 0 ? (
                tasks.map((task) => (
                    <TaskItem key={task.id}>
                        <TaskPreview task={task} onClick={() => setTaskId(task.id)} />
                    </TaskItem>
                ))
            ) : (
                <Grid item xs={12}>
                    <Typography>{lang.noTasks}</Typography>
                </Grid>
            )}
        </>
    );
}
