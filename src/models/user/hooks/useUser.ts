import { useQuery } from "@tanstack/react-query";
import { pb } from "src/config/pocketbase";
import { mapUser } from "../utils/mapUser";
import type { User } from "../types/User.type";

export const useUser = () => {
  const queryFn = async (): Promise<User | null> => {
    if (pb.authStore?.record) {
      return mapUser(pb.authStore.record);
    }

    return null;
  };

  const { data, isPending, isError } = useQuery({
    queryKey: ["authentication.user"],
    queryFn,
    // staleTime: 2 * 60 * 1000,
    // gcTime: 2 * 60 * 1000,
  });

  return {
    user: data ?? null,
    userLoading: isPending,
    userError: isError,
  };
};
