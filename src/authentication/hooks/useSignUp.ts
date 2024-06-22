import { useMutation } from "@tanstack/react-query";
import { pb } from "src/pocketbase/utils/pocketbaseConfig";

const useSignUp = () => {
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
  }): Promise<void> => {
    const user = await pb
      .collection("users")
      .create({ name, email, password, passwordConfirm, verified: false });

    pb.authStore.save(user.token, user.record);
  };

  const { mutateAsync, isPending, isError } = useMutation({
    mutationKey: ["authentication.signup"],
    mutationFn,
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
