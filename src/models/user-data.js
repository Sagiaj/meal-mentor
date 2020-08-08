import { UserCredentials } from './user-credentials';
export class UserData {
    constructor(data) {
        this.credentials = new UserCredentials();
        if (data) {
            this.credentials = new UserCredentials(data);
        }
    }
    getCredentials() {
        return this.credentials;
    }
}
//# sourceMappingURL=user-data.js.map