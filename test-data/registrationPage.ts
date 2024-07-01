import { config } from "../config/config";
import { ICredentials } from "../utils/credentials.interface";

export const creds: ICredentials = {
    password:config.password,
    userName:config.userName,
    firstName:config.firstName,
    lastName:config.lastName,
}