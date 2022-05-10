import { Button } from "@mui/material";
import React from "react";
import { useContext } from "../hooks";
import { useSetRecoilState } from "recoil";

export function ThemeChanger() {
    const { setTheme } = useContext();

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
        </div>
    );
}
