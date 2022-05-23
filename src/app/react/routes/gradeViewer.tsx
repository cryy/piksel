import { Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { GradeViewerPaper } from "../components";
import { useAppContext } from "../hooks";


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
        <Grid container spacing={0} marginBottom="64px">
            <Grid item xs={1} />
            <Grid item xs={10} display="flex" justifyContent="center" alignItems="center">
                <GradeViewerPaper grade={grade!} />
            </Grid>
            <Grid item xs={1} />
        </Grid>
    );
}
