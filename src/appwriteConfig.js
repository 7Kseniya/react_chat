import { Client, Databases, Account } from 'appwrite';

export const PROJECT_ID = import.meta.env.VITE_PROJECT_ID_ENV
export const DATABASE_ID = import.meta.env.VITE_DATABASE_ID_ENV
export const COLLECTION_MESSAGES_ID = import.meta.env.VITE_COLLECTION_MESSAGES_ID_ENV
const client = new Client();


client
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject(import.meta.env.VITE_PROJECT_ID_ENV);


export const databases = new Databases(client);
export const account = new Account(client);

export default client;