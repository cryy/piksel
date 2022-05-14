import { ServiceContainer } from "./services";
import { app } from "electron";

const lock = app.requestSingleInstanceLock();

if (!lock) app.quit();
else {
    const services = new ServiceContainer();

    services.startup.start();
}
