import { useState } from "react";
import { pb } from "src/lib/pocketbase/utils/pocketbaseConfig";
import type { User } from "../types/user.type";
import type { AuthModel } from "pocketbase";

const mapUser = (authStoreModel: NonNullable<AuthModel>): User => {
  return {
    id: authStoreModel.id,
    username: authStoreModel.username,
    email: authStoreModel.email,
    name: authStoreModel.name,
  };
};

const useAuthentication = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(
    pb.authStore.model ? mapUser(pb.authStore.model) : null
  );

  const login = async (email: string, password: string) => {
    await pb.collection("users").authWithPassword(email, password);
  };

  const logout = () => {
    pb.authStore.clear();
  };

  pb.authStore.onChange(() => {
    setCurrentUser(pb.authStore.model ? mapUser(pb.authStore.model) : null);
  });

  return { login, logout, currentUser };
};

export { useAuthentication };
