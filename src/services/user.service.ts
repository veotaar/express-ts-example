import UserModel from '../models/user.model';

interface UserInput {
  email: string;
  name: string;
  password: string;
}

export async function createUser(input: UserInput) {
  try {
    return await UserModel.create(input);
  } catch (e: any) {
    throw new Error(e);
  }
}
