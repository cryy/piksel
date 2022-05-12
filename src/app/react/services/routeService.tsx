import { Experimental, Home } from "../routes";
import { HomeRounded, ScienceRounded, SvgIconComponent } from "@mui/icons-material";

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
                flags: RouteFlags.Null,
                icon: HomeRounded,
                component: Home,
                subroutes: []
            },
            {
                name: "experimentalPage",
                path: "/experimental",
                flags: RouteFlags.Null,
                icon: ScienceRounded,
                component: Experimental,
                subroutes: []
            }
        ]
    }

    public get routes() {
        return this._routes;
    }
}
