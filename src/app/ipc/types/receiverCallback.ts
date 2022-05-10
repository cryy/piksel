import { BrowserWindow } from "electron";

export type Callback<T = void> = T | PromiseLike<T>;

export type ReceiverCallback<T, T2> = (data: T, browser: BrowserWindow) => Callback<T2>;
export type RenderReceiverCallback<T, T2> = (data: T) => Callback<T2>;
