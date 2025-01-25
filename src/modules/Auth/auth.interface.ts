export type TLoginUser = {
    email: string;
    password: string;
  };
  export type TPasswordChang = {
    oldPassword: string;
    newPassword: string;
  };
  export type TResetPass = { email: string; newPassword: string };