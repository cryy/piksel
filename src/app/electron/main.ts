import { app } from "electron";
import { ServiceContainer } from "./services";

const lock = app.requestSingleInstanceLock();

if (!lock) app.quit();
else {
    const services = new ServiceContainer();

    services.startup.start();
}
