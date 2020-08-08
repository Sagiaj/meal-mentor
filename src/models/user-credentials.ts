export class UserCredentials {
  email: string = "";
  password: string = "";
  username: string = "";

  constructor(credentials?: any) {
    if (credentials) {
      this.email = credentials.email;
      this.password = credentials.password;
      this.username = credentials.username;
    }
  }
}
