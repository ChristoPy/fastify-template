import { compareSync } from 'bcrypt';
import { PublicUser, UserModel } from "../../models/user";
import { LoginInput } from "./types";
import { Result } from '../../models/result';

export async function login(data: LoginInput): Promise<Result<PublicUser>> {
  const user = await UserModel.findOne({ email: data.email });
  if (!user) {
    return { error: 'E-mail or password is incorrect' }
  }

  const match = compareSync(data.password, user.password);
  if (!match) {
    return { error: 'E-mail or password is incorrect' }
  }

  return {
    data: {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
    },
  }
}
