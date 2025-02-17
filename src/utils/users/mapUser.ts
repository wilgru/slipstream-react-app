import type { AuthModel } from "pocketbase";
import type { User } from "src/types/User.type";

export const mapUser = (authModel: NonNullable<AuthModel>): User => {
  return {
    id: authModel.id,
    username: authModel.username,
    email: authModel.email,
    name: authModel.name,
  };
};
