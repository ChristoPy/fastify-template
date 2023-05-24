import { hashSync } from 'bcrypt';
import { PublicUser, UserModel } from "../../models/user";
import { RegisterInput } from "./types";
import { Result } from '../../models/result';

export async function register(data: RegisterInput): Promise<Result<PublicUser>> {
  const user = await UserModel.findOne({ email: data.email });
  if (user) {
    return { error: 'E-mail alrady in use' }
  }

  const hash = hashSync(data.password, 30);
  const newUser = await UserModel.create({
    name: data.name,
    email: data.email,
    password: hash,
  });
  await newUser.save();

  return {
    data: {
      _id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
    },
  }
}
