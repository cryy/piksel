import { Location } from "react-router-dom";
import { atom, RecoilState, RecoilValueReadOnly, selector } from "recoil";
import { Nullable } from "../../../types/nulllable";
import { BootFlags, Config, EDnevnikDetails, LoadingPhase, StoreTasks, Task } from "../../ipc";
import { IPCService } from ".";

export interface Breadcrumb {
    name: string;
    link: string;
    useLang: boolean;
    subroute: boolean;
}

export interface TaskStats {
    total: number;
    completed: number;
    incompleted: number;
}

export class RecoilService {
    private _ipc: IPCService;

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
    private _tasks: RecoilState<Task[]>;
    private _openTaskId: RecoilState<Nullable<number>>;
    private _developerMode: RecoilState<boolean>;

    private _taskStats: RecoilValueReadOnly<TaskStats>;

    constructor(ipc: IPCService) {
        this._ipc = ipc;

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
        this._tasks = atoms["tasks"];
        this._openTaskId = atoms["openTaskId"];
        this._developerMode = atoms["developerMode"];

        const selectors = this.createSelectors();

        this._taskStats = selectors["taskStats"];

    }

    private createAtoms() {
        return {
            displayLocation: atom({
                key: "displayLocation",
                default: null as Nullable<Location>,
            }),
            config: atom({
                key: "config",
                default: null as Nullable<Config>,
            }),
            bootFlags: atom({
                key: "bootFlags",
                default: BootFlags.None,
            }),
            blur: atom({
                key: "blur",
                default: true,
            }),
            activeBreadcrumbs: atom({
                key: "activeBreadcrumbs",
                default: [] as Breadcrumb[],
            }),
            carnetLoadingPhase: atom({
                key: "carnetLoadingPhase",
                default: LoadingPhase.Loaded,
            }),
            carnetUsername: atom({
                key: "carnetUsername",
                default: "",
            }),
            carnetPassword: atom({
                key: "carnetPassword",
                default: "",
            }),
            ednevnik: atom({
                key: "ednevnik",
                default: null as Nullable<EDnevnikDetails>,
            }),
            gradeViewerId: atom({
                key: "gradeViewerId",
                default: "",
            }),
            tasks: atom({
                key: "tasks",
                default: [] as Task[],
                effects: [
                    ({ onSet }) => {
                        onSet((newTasks) => {
                            this._ipc.send<StoreTasks>({
                                name: "STORE_TASKS",
                                data: {
                                    tasks: newTasks,
                                },
                            });
                        });
                    },
                ],
            }),
            openTaskId: atom({
                key: "openTaskId",
                default: null as Nullable<number>
            }),
            developerMode: atom({
                key: "developerMode",
                default: false
            })
        };
    }

    private createSelectors() {
        return {
            taskStats: selector({
                key: "tasksStats",
                get: ({ get }) => {
                    const tasks = get(this._tasks);
                    const total = tasks.length;
                    const completed = tasks.filter(x => x.done).length;
            
                    return {
                        total: total,
                        completed: completed,
                        incompleted: total - completed
                    };
                }
            })
        }
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

    public get tasks() {
        return this._tasks;
    }

    public get taskStats() {
        return this._taskStats;
    }

    public get openTaskId() {
        return this._openTaskId;
    }

    public get developerMode() {
        return this._developerMode;
    }
}
