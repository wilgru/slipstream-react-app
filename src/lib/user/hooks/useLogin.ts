import { useMutation } from "@tanstack/react-query";
import { pb } from "src/connection/pocketbase";

const useLogin = () => {
  const mutationFn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<void> => {
    const user = await pb.collection("users").authWithPassword(email, password);

    pb.authStore.save(user.token, user.record);
  };

  const { mutateAsync, isPending, isError } = useMutation({
    mutationKey: ["authentication.login"],
    mutationFn,
    // staleTime: 2 * 60 * 1000,
    // gcTime: 2 * 60 * 1000,
  });

  const logout = () => {
    pb.authStore.clear();
  };

  return {
    login: mutateAsync,
    logout,
    loginLoading: isPending,
    loginError: isError,
  };
};

export { useLogin };
