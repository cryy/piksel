import {
    AssignmentRounded,
    HomeRounded,
    NotificationsRounded,
    SchoolRounded,
    SettingsApplicationsRounded,
    SvgIconComponent,
} from "@mui/icons-material";
import {
    CarnetIntegration,
    EDnevnik,
    GradeViewer,
    Home,
    Reminders,
    Settings,
    TaskCreator,
    Tasks,
} from "../routes";

export interface Route {
    name: string;
    path: string;
    flags: RouteFlags;
    icon: SvgIconComponent;
    component: () => React.ReactNode;
}

export enum RouteFlags {
    Null = 0,
    Subroute = 1 << 0,
    NoBreadcrum = 1 << 1,
}

export class RouteService {
    private _routes: Route[];

    constructor() {
        this._routes = this.createRoutes();
    }

    private createRoutes(): Route[] {
        return [
            {
                name: "homePage",
                path: "/",
                flags: RouteFlags.NoBreadcrum,
                icon: HomeRounded,
                component: Home,
            },
            {
                name: "tasksPage",
                path: "/tasks",
                flags: RouteFlags.Null,
                icon: AssignmentRounded,
                component: Tasks,
            },
            {
                name: "ednevnikPage",
                path: "/ednevnik",
                flags: RouteFlags.Null,
                icon: SchoolRounded,
                component: EDnevnik,
            },
            {
                name: "settingsPage",
                path: "/settings",
                flags: RouteFlags.Null,
                icon: SettingsApplicationsRounded,
                component: Settings,
            },
            {
                name: "carnetIntegration",
                path: "/settings/carnet",
                flags: RouteFlags.Subroute,
                icon: SettingsApplicationsRounded,
                component: CarnetIntegration,
            },
            {
                name: "gradeViewer",
                path: "/ednevnik/gradeViewer",
                flags: RouteFlags.Subroute,
                icon: SchoolRounded,
                component: GradeViewer,
            },
            {
                name: "createTask",
                path: "/tasks/create",
                flags: RouteFlags.Subroute,
                icon: AssignmentRounded,
                component: TaskCreator,
            },
        ];
    }

    public get routes() {
        return this._routes;
    }
}
