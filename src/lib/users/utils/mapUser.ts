import type { User } from "../User.type";
import type { AuthModel } from "pocketbase";

export const mapUser = (authModel: NonNullable<AuthModel>): User => {
  return {
    id: authModel.id,
    username: authModel.username,
    email: authModel.email,
    name: authModel.name,
  };
};
