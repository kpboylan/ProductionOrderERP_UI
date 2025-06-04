
export class LoginModel {
    constructor(
      public LoginUsername: string,
      public LoginPassword: string,
      public SubmittedPassword: string,
      public HashedPassword: string
    ) {}
  }
  