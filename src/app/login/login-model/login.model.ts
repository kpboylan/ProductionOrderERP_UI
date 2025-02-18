
export class LoginModel {
    constructor(
      public Username: string,
      public Password: string,
      public SubmittedPassword: string,
      public HashedPassword: string
    ) {}
  }
  