import { OptionsObject } from "../../notistack";

export interface SnackbarData {
    message: string;
    useLang: boolean;
    options?: OptionsObject;
}