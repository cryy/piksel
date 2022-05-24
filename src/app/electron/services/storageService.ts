import { app } from "electron";
import path from "path";
import fs from "fs";
import { EDnevnikDetails, Task } from "../../ipc";

export class StorageService {
    private _userData: string;

    private _ednevnik: string;
    private _tasks: string;

    constructor() {
        this._userData = app.getPath("userData");

        this._ednevnik = path.join(this._userData, "./eDnevnik.json");
        this._tasks = path.join(this._userData, "./tasks.json");
    }

    public getEDnevnik() {
        try {
            const contents = fs.readFileSync(this._ednevnik, "utf-8");

            return JSON.parse(contents) as EDnevnikDetails;
        } catch {
            return null;
        }
    }

    public storeEDnevnik(details: EDnevnikDetails) {
        fs.writeFileSync(this._ednevnik, JSON.stringify(details));
    }

    public deleteEDnevnik() {
        try {
            fs.rmSync(this._ednevnik);
        } catch {}
    }

    public getTasks() {
        try {
            const contents = fs.readFileSync(this._tasks, "utf-8");

            return JSON.parse(contents) as Task[];
        } catch {
            return [];
        }
    }

    public storeTasks(tasks: Task[]) {
        fs.writeFileSync(this._tasks, JSON.stringify(tasks));
    }
}
