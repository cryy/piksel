import { Checkbox, Divider, Grid, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import React from "react";
import { Grade, Task, TaskPriority } from "../../ipc";
import { useAppContext } from "../hooks";
import { CloseRounded, WarningRounded } from "@mui/icons-material";
import { useRecoilState } from "recoil";
import { Lang } from "../services";

export function getPriorityString(priority: TaskPriority, lang: Lang) {
    switch (priority) {
        case TaskPriority.High:
            return `${lang.highPriority} ${lang.priority.toLowerCase()}`;
        case TaskPriority.Normal:
            return `${lang.normalPriority} ${lang.priority.toLowerCase()}`;
        default:
            return `${lang.highPriority} ${lang.priority.toLowerCase()}`;
    }
}

export function getPriorityStyling(priority: TaskPriority) {
    switch (priority) {
        case TaskPriority.High:
            return "rgba(234, 23, 23, 0.64)";
        case TaskPriority.Normal:
            return "rgba(42, 181, 51, 0.64)";
        default:
            return "rgba(94, 94, 94, 0.44)";
    }
}

export interface TaskPreviewProps {
    task: Task;
    onClick?: () => void;
}

export function TaskPreview({ task, onClick }: TaskPreviewProps) {
    const {
        lang,
        theme,
        services: { recoil },
    } = useAppContext();

    const [tasks, setTasks] = useRecoilState(recoil.tasks);
    const taskIndex = tasks.findIndex((t) => t.id === task.id);

    const deleteTask = (e: any) => {
        e.stopPropagation();
        setTasks([...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)]);
    };

    const checkTask = (e: any) => {
        e.stopPropagation();
        setTasks([
            ...tasks.slice(0, taskIndex),
            { ...task, done: !task.done },
            ...tasks.slice(taskIndex + 1),
        ]);
    };

    return (
        <Paper
            sx={{
                width: "246px",
                height: "220px",
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
                    height="128px"
                >
                    <Typography
                        variant="body1"
                        sx={task.done ? { textDecoration: "line-through" } : undefined}
                    >
                        {task.name}
                    </Typography>
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
                            xs={4}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Tooltip title={`${getPriorityString(task.priority, lang)}`}>
                                <WarningRounded sx={{ color: getPriorityStyling(task.priority) }} />
                            </Tooltip>
                        </Grid>
                        <Grid
                            item
                            xs={4}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Checkbox color="primary" checked={task.done} onClick={checkTask} />
                        </Grid>
                        <Grid
                            item
                            xs={4}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <IconButton onClick={deleteTask}>
                                <CloseRounded />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={1} />
            </Grid>
        </Paper>
    );
}
