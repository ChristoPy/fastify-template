import { PublicUser } from "../../models/user";

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResult {
  token: string;
  user: PublicUser;
}
