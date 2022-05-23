import { ipcRenderer } from "electron-better-ipc";
import {
    Callback,
    Command,
    CommandReceiver,
    RenderReceiverCallback
} from "../../ipc";


export class IPCService {
    private readonly _channel = "COMMAND";

    private _channelSubscribers: RenderReceiverCallback<any, any>[];

    constructor() {
        this._channelSubscribers = [];

        ipcRenderer.answerMain<unknown, void>(this._channel, (d) => {
            for (const callback of this._channelSubscribers) callback(d);
        });
    }

    public send<T = any, T2 = undefined>(command: Command<T>): Promise<T2> {
        return ipcRenderer.callMain<Command, T2>(
            command.channel ?? this._channel,
            command
        );
    }

    public receive<T, T2 = void>(
        callback: RenderReceiverCallback<T, T2>,
        channel = this._channel
    ): CommandReceiver {
        if (channel === this._channel) {
            this._channelSubscribers.push(callback);
            const remover = () => {
                this._channelSubscribers.splice(
                    this._channelSubscribers.indexOf(callback),
                    1
                );
            };
            remover.bind(this);

            return {
                channel: channel,
                remove: remover,
            };
        }

        const remover = ipcRenderer.answerMain<T, Callback<T2>>(
            channel,
            callback
        );

        return {
            channel: channel,
            remove: remover,
        };
    }
}
