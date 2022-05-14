import { BootFlags, Config } from "../entities";

export interface Ready {
    config: Config;
    bootFlags: BootFlags;
}