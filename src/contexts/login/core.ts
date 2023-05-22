import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken'
import { UserModel } from "../../models/user";
import { LoginInput, LoginResult } from "./types";
import { Result } from '../../models/result';

export async function login(data: LoginInput): Promise<Result<LoginResult>> {
  const user = await UserModel.findOne({ email: data.email });
  if (!user) {
    return { error: 'E-mail or password is incorrect' }
  }

  const match = compareSync(data.password, user.password);
  if (!match) {
    return { error: 'E-mail or password is incorrect' }
  }

  const token = sign({ _id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });

  return {
    data: {
      token,
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
      }
    },
  }
}
