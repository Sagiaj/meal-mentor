import { UserCredentials } from './user-credentials';
export var UserRoles;
(function (UserRoles) {
    UserRoles["Admin"] = "Admin";
    UserRoles["Mentor"] = "Mentor";
    UserRoles["Mentee"] = "Mentee";
    UserRoles["Guest"] = "Guest";
})(UserRoles || (UserRoles = {}));
;
export class UserData {
    constructor(data) {
        this.credentials = new UserCredentials();
        this.userRole = UserRoles.Guest;
        if (data) {
            this.credentials = new UserCredentials(data);
            this.userRole = data.userRole;
        }
    }
    getCredentials() {
        return this.credentials;
    }
}
//# sourceMappingURL=user-data.js.map