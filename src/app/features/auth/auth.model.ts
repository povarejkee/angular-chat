export interface ISigninCredentials {
  email: string;
  password: string;
}

export interface ISignupCredentials extends ISigninCredentials {
  displayName: string;
}
