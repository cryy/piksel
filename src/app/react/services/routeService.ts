import { AssignmentRounded, HomeRounded, NotificationsRounded, SchoolRounded, SettingsApplicationsRounded, SvgIconComponent } from "@mui/icons-material";
import { EDnevnik, Home, Reminders, Settings, Tasks } from "../routes";

export interface Route {
    name: string;
    path: string;
    flags: RouteFlags;
    subroutes: Route[];
    icon: SvgIconComponent;
    component: () => React.ReactNode;
}

export enum RouteFlags {
    Null = 0,
    Subroute = 1 << 0,
    NoBreadcrum = 1 << 1,
    NoSidebar = 1 << 2
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
                subroutes: []
            },
            {
                name: "tasksPage",
                path: "/tasks",
                flags: RouteFlags.Null,
                icon: AssignmentRounded,
                component: Tasks,
                subroutes: []
            },
            {
                name: "remindersPage",
                path: "/reminders",
                flags: RouteFlags.Null,
                icon: NotificationsRounded,
                component: Reminders,
                subroutes: []
            },            {
                name: "ednevnikPage",
                path: "/ednevnik",
                flags: RouteFlags.Null,
                icon: SchoolRounded,
                component: EDnevnik,
                subroutes: []
            },            {
                name: "settingsPage",
                path: "/settings",
                flags: RouteFlags.Null,
                icon: SettingsApplicationsRounded,
                component: Settings,
                subroutes: []
            },
        ]
    }

    public get routes() {
        return this._routes;
    }
}
