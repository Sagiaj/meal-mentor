import { UserCredentials } from "./user-credentials";
export class Organization {
    constructor(org) {
        this.id = "";
        this.name = "";
        this.org_admin_credentials = new UserCredentials();
        if (org) {
            this.id = org.id;
            this.name = org.name;
            this.org_admin_credentials = new UserCredentials(org.org_admin_credentials);
        }
    }
}
//# sourceMappingURL=organization.js.map