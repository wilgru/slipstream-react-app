import { useState } from "react";
import { pb } from "src/pocketbase/utils/pocketbaseConfig";
import { mapUser } from "../utils/mapUser";
import type { User } from "src/authentication/types/User.type";

const useAuthentication = () => {
  const [logInLoading, setLogInLoading] = useState<boolean>(false);
  const [logInError, setLogInError] = useState<unknown | undefined>(undefined);
  const [currentUser, setCurrentUser] = useState<User | null>(
    pb.authStore.model ? mapUser(pb.authStore.model) : null
  );

  const login = async (email: string, password: string) => {
    try {
      setLogInLoading(true);
      await pb.collection("users").authWithPassword(email, password);
      setLogInError(false);
      setLogInLoading(false);
    } catch (error) {
      setLogInLoading(false);
      setLogInError(error);
    }
  };

  const logout = () => {
    pb.authStore.clear();
  };

  pb.authStore.onChange(() => {
    setCurrentUser(pb.authStore.model ? mapUser(pb.authStore.model) : null);
  });

  return { login, logInLoading, logInError, logout, currentUser };
};

export { useAuthentication };
