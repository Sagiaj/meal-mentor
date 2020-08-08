import { UserCredentials } from "./user-credentials";

export class Organization {
  id: string = "";
  name: string = "";
  org_admin_credentials = new UserCredentials();

  constructor(org?: Organization) {
    if (org) {
      this.id = org.id;
      this.name = org.name;
      this.org_admin_credentials = new UserCredentials(
        org.org_admin_credentials
      );
    }
  }
}
