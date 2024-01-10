import dotenv from 'dotenv';
dotenv.config();

export const config = {
    baseURL: process.env.BASE_URL,
    password: process.env.PASSWORD??'Qwerty098@',
    userName: process.env.USERNAME??'default_user',
    firstName: process.env.FIRSTNAME??'Default name',
    lastName: process.env.LASTNAME??'Default name',
}