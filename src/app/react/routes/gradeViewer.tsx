import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { GradeList } from "../components";
import { Grid } from "@mui/material";
import React from "react";
import { useAppContext } from "../hooks";
import { useNavigate } from "react-router-dom";

export function GradeViewer() {
    const {
        lang,
        services: {
            recoil: { displayLocation, activeBreadcrumbs, ednevnik, gradeViewerId },
        },
    } = useAppContext();

    const navigator = useNavigate();
    const location = useRecoilValue(displayLocation);
    const ednevnikDetails = useRecoilValue(ednevnik);
    const setBreadcrumbs = useSetRecoilState(activeBreadcrumbs);
    const [id, setId] = useRecoilState(gradeViewerId);

    const grade = ednevnikDetails?.grades.find((x) => x.href.split("/").at(-2) === id);

    React.useEffect(() => {
        if (location?.pathname === `/ednevnik/gradeViewer`) {
            if (!grade) {
                navigator("/ednevnik");
                setId("");
                return;
            }
            
            setBreadcrumbs((breadcrumbs) => [
                ...breadcrumbs,
                {
                    name: grade.name,
                    link: `/ednevnik/gradeViewer`,
                    useLang: false,
                },
            ]);
        }
    }, [location, id, ednevnikDetails]);

    return (
        <Grid container spacing={0} marginBottom="24px">
            <Grid item xs={1} />
            <Grid item xs={10}>
                Hello {grade?.name}!
            </Grid>
            <Grid item xs={1} />
        </Grid>
    );
}
