import { useMutation } from "@tanstack/react-query";
import { pb } from "src/pocketbase/utils/pocketbaseConfig";
import { mapUser } from "../utils/mapUser";
import { useUser } from "./useUser";
import type { User } from "src/authentication/types/User.type";

const useSignUp = () => {
  const { setCurrentUser } = useUser();

  const mutationFn = async ({
    name,
    email,
    password,
    passwordConfirm,
  }: {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }): Promise<User> => {
    const rawUser = await pb
      .collection("users")
      .create({ name, email, password, passwordConfirm, verified: false });

    return mapUser(rawUser);
  };

  const onSuccess = (data: User) => {
    setCurrentUser(data);
  };

  const { mutateAsync, isPending, isError } = useMutation({
    mutationKey: ["authentication.signup"],
    mutationFn,
    onSuccess,
    // staleTime: 2 * 60 * 1000,
    // gcTime: 2 * 60 * 1000,
  });

  return {
    signUp: mutateAsync,
    signUpLoading: isPending,
    signUpError: isError,
  };
};

export { useSignUp };
