import { Location } from "react-router-dom";
import { atom, RecoilState } from "recoil";
import { Nullable } from "../../../types/nulllable";
import { BootFlags, Config, EDnevnikDetails, LoadingPhase } from "../../ipc";


export interface Breadcrumb {
    name: string;
    link: string;
    useLang: boolean;
}

export class RecoilService {

    private _displayLocation: RecoilState<Nullable<Location>>;
    private _config: RecoilState<Nullable<Config>>;
    private _bootFlags: RecoilState<BootFlags>;
    private _blur: RecoilState<boolean>;
    private _activeBreadcrumbs: RecoilState<Breadcrumb[]>;
    private _carnetLoadingPhase: RecoilState<LoadingPhase>;
    private _carnetUsername: RecoilState<string>;
    private _carnetPassword: RecoilState<string>;
    private _ednevnik: RecoilState<Nullable<EDnevnikDetails>>;
    private _gradeViewerId: RecoilState<string>;

    constructor() {
        const atoms = this.createAtoms();

        this._displayLocation = atoms["displayLocation"];
        this._config = atoms["config"];
        this._bootFlags = atoms["bootFlags"];
        this._blur = atoms["blur"];
        this._activeBreadcrumbs = atoms["activeBreadcrumbs"];
        this._carnetLoadingPhase = atoms["carnetLoadingPhase"];
        this._carnetUsername = atoms["carnetUsername"];
        this._carnetPassword = atoms["carnetPassword"];
        this._ednevnik = atoms["ednevnik"];
        this._gradeViewerId = atoms["gradeViewerId"];
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
            }),
            carnetLoadingPhase: atom({
               key: "carnetLoadingPhase",
               default: LoadingPhase.Loaded
            }),
            carnetUsername: atom({
                key: "carnetUsername",
                default: ""
            }),
            carnetPassword: atom({
                key: "carnetPassword",
                default: ""
            }),
            ednevnik: atom({
                key: "ednevnik",
                default: null as Nullable<EDnevnikDetails>
            }),
            gradeViewerId: atom({
                key: "gradeViewerId",
                default: ""
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

    public get carnetLoadingPhase() {
        return this._carnetLoadingPhase;
    }

    public get gradeViewerId() {
        return this._gradeViewerId;
    }

    public get carnetUsername() {
        return this._carnetUsername;
    }

    public get carnetPassword() {
        return this._carnetPassword;
    }

    public get ednevnik() {
        return this._ednevnik;
    }
}
