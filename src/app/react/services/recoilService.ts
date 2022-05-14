import { BootFlags, Config } from "../../ipc";
import { RecoilState, atom } from "recoil";

import { Location } from "react-router-dom";
import { Nullable } from "../../../types/nulllable";

export interface Breadcrumb {
    name: string;
    link: string;
}

export class RecoilService {

    private _displayLocation: RecoilState<Nullable<Location>>;
    private _config: RecoilState<Nullable<Config>>;
    private _bootFlags: RecoilState<BootFlags>;
    private _blur: RecoilState<boolean>;
    private _activeBreadcrumbs: RecoilState<Breadcrumb[]>;

    constructor() {
        const atoms = this.createAtoms();

        this._displayLocation = atoms["displayLocation"];
        this._config = atoms["config"];
        this._bootFlags = atoms["bootFlags"];
        this._blur = atoms["blur"];
        this._activeBreadcrumbs = atoms["activeBreadcrumbs"];
    }

    private createAtoms() {
        return {
            displayLocation: atom({
                key: "displayLocation",
                default: null as Nullable<Location>
            }),
            config: atom({
                key: "config",
                default: null as Nullable<Config>
            }),
            bootFlags: atom({
                key: "bootFlags",
                default: BootFlags.None
            }),
            blur: atom({
                key: "blur",
                default: true
            }),
            activeBreadcrumbs: atom({
                key: "activeBreadcrumbs",
                default: [] as Breadcrumb[]
            })
        };
    }

    public get displayLocation() {
        return this._displayLocation;
    }

    public get config() {
        return this._config;
    }

    public get bootFlags() {
        return this._bootFlags;
    }

    public get blur() {
        return this._blur;
    }

    public get activeBreadcrumbs() {
        return this._activeBreadcrumbs;
    }
}
