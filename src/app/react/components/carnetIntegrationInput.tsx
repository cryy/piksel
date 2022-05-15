import { Box, Button, CircularProgress, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { LoadingPhase } from "../../ipc";
import { useAppContext } from "../hooks";
import { useRecoilState } from "recoil";

export function CarnetIntegrationInput() {
    const {
        lang,
        services: { recoil, ipc },
    } = useAppContext();

    const location = useLocation();
    const navigator = useNavigate();

    const [email, setEmail] = useRecoilState(recoil.carnetUsername);
    const [password, setPassword] = useRecoilState(recoil.carnetPassword);
    const [loading, setLoading] = useRecoilState(recoil.carnetLoadingPhase);

    const buttonDisabled = !(email && password) || loading !== LoadingPhase.Loaded;

    const handleClick = (e: any) => {
        if (buttonDisabled) return;
        setLoading(LoadingPhase.LoggingIn);
        ipc.send<boolean>({
            name: "CARNET_LOGIN",
            data: {
                username: email,
                password: password,
            },
            channel: "PUPPETEER",
        });
    };

    useEffect(() => {
        const shouldRedirectBasedOnLoading =
            (loading === LoadingPhase.Loaded || loading === LoadingPhase.Loading) &&
            email &&
            password;

        if (location.pathname === "/settings/carnet" && shouldRedirectBasedOnLoading) {
            navigator("/settings");
        }
    }, [location, loading]);

    return (
        <Paper
            sx={{
                maxWidth: "clamp(686px, 70vh, 986px)",
            }}
        >
            <Grid container spacing={0}>
                <Grid item xs={1} />
                <Grid item xs={10}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            margin: "5vh 0",
                            "& > .MuiTextField-root": {
                                width: "300px",
                            },
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                marginBottom: "28px",
                            }}
                        >
                            {lang.carnetExplanation}
                        </Typography>
                        <TextField
                            label={lang.carnetEmail}
                            variant="outlined"
                            sx={{
                                marginBottom: "16px",
                            }}
                            value={email}
                            onChange={(e) => setEmail(e.currentTarget.value)}
                        />
                        <TextField
                            label={lang.carnetPassword}
                            variant="outlined"
                            type="password"
                            sx={{
                                marginBottom: "28px",
                            }}
                            value={password}
                            onChange={(e) => setPassword(e.currentTarget.value)}
                        />
                        <Button variant="contained" disabled={buttonDisabled} onClick={handleClick}>
                            {loading === LoadingPhase.LoggingIn ? (
                                <span>
                                    <CircularProgress
                                        size={20}
                                        sx={{
                                            verticalAlign: "middle",
                                            marginRight: "12px",
                                        }}
                                    />
                                    {lang.loggingIn}
                                </span>
                            ) : (
                                lang.loginAction
                            )}
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={1} />
            </Grid>
        </Paper>
    );
}
