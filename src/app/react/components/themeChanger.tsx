import { Button, Link } from "@mui/material";

import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import { useAppContext } from "../hooks";
import { useSetRecoilState } from "recoil";

export function ThemeChanger() {
    const { setTheme } = useAppContext();

    const light = (e: any) => {
        setTheme("light");
    };

    const dark = (e: any) => {
        setTheme("dark");
    };

    return (
        <div style={{ display: "flex" }}>
            <Button variant="contained" onClick={light}>Light</Button>
            <Button variant="contained" onClick={dark}>Dark</Button>
            <div>
                <Link component={RouterLink} to="/">
                    Home
                </Link>
                <Link component={RouterLink} to="/experimental">
                    Experimental
                </Link>
            </div>
        </div>
    );
}
