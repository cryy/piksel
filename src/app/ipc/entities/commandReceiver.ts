export interface CommandReceiver {
    channel: string;
    remove: () => void;
}