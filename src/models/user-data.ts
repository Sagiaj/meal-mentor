import { UserCredentials } from './user-credentials';

export class UserData {
    private credentials = new UserCredentials();

    constructor(data?: any) {
        if (data) {
            this.credentials = new UserCredentials(data);
        }
    }

    getCredentials(): UserCredentials {
        return this.credentials;
    }
}
