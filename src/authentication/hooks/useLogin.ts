import { useMutation } from "@tanstack/react-query";
import { pb } from "src/pocketbase/utils/pocketbaseConfig";
import { mapUser } from "../utils/mapUser";
import { useUser } from "./useUser";
import type { User } from "src/authentication/types/User.type";

const useLogin = () => {
  const { setCurrentUser } = useUser();

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<User> => {
    const rawUser = await pb
      .collection("users")
      .authWithPassword(email, password);

    return mapUser(rawUser.record);
  };

  const logout = () => {
    pb.authStore.clear();

    setCurrentUser(undefined);
  };

  const { mutateAsync, isPending, isError } = useMutation({
    mutationKey: ["authentication.login"],
    mutationFn: login,
    onSuccess: (data) => {
      setCurrentUser(data);
    },
    // staleTime: 2 * 60 * 1000,
    // gcTime: 2 * 60 * 1000,
  });

  return {
    login: mutateAsync,
    logout,
    loginLoading: isPending,
    loginError: isError,
  };
};

export { useLogin };
