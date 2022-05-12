import { Button } from "@mui/material";
import React from "react";
import { useAppContext } from "../hooks";
import { useSetRecoilState } from "recoil";

export function LangChanger() {
    const { setLang } = useAppContext();

    const light = (e: any) => {
        setLang("en");
    };

    const dark = (e: any) => {
        setLang("hr");
    };

    return (
        <div style={{ display: "flex" }}>
            <Button variant="contained" onClick={light}>EN</Button>
            <Button variant="contained" onClick={dark}>HR</Button>
        </div>
    );
}