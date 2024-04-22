import type { User } from "../types/User.type";
import type { AuthModel } from "pocketbase";

export const mapUser = (authStoreModel: NonNullable<AuthModel>): User => {
  return {
    id: authStoreModel.id,
    username: authStoreModel.username,
    email: authStoreModel.email,
    name: authStoreModel.name,
  };
};
