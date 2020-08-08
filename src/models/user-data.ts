import { UserCredentials } from './user-credentials';

export enum UserRoles {
    Admin = "Admin",
    Mentor = "Mentor",
    Mentee = "Mentee",
    Guest = "Guest"
};

export type UserRole = keyof typeof UserRoles;

export class UserData {
    private credentials = new UserCredentials();
    private userRole: UserRole = UserRoles.Guest;

    constructor(data?: any) {
        if (data) {
            this.credentials = new UserCredentials(data);
            this.userRole = data.userRole;
        }
    }

    getCredentials(): UserCredentials {
        return this.credentials;
    }
}
