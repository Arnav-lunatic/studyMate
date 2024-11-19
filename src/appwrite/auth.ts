import { Client, Account, ID } from "appwrite";
import constants from "../conf/constants";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(constants.appWriteUrl)
            .setProject(constants.appWriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name } : {[key: string]: string}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                this.login({email, password})
            } else {
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }

    async login({ email, password }: { [key: string]: string }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}