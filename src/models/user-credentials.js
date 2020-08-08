export class UserCredentials {
    constructor(credentials) {
        this.email = "";
        this.password = "";
        this.username = "";
        if (credentials) {
            this.email = credentials.email;
            this.password = credentials.password;
            this.username = credentials.username;
        }
    }
}
//# sourceMappingURL=user-credentials.js.map