import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pb } from "src/connections/pocketbase";
import { useUser } from "src/models/users/hooks/useUser";
import { mapSlip } from "../utils/mapSlip";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";
import type { Slip } from "src/models/slips/Slip.type";

type CreateSlipProps = {
  createSlipData: Omit<Slip, "id" | "created" | "updated">;
};

type UseCreateSlipResponse = {
  createSlip: UseMutateAsyncFunction<
    Slip | undefined,
    Error,
    CreateSlipProps,
    unknown
  >;
};

export const useCreateSlip = (): UseCreateSlipResponse => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const mutationFn = async ({
    createSlipData,
  }: CreateSlipProps): Promise<Slip | undefined> => {
    // if slip is a draft then its not actually in the db, so persist it
    const createdSlip = await pb.collection("slips").create(
      {
        ...createSlipData,
        journals: createSlipData.journals.map((journal) => journal.id),
        user: user?.id,
      },
      { expand: "journals" }
    );

    return mapSlip(createdSlip);
  };

  const onSuccess = (data: Slip | undefined) => {
    if (!data) {
      return;
    }

    queryClient.refetchQueries({
      queryKey: ["slips.list"],
    });
  };

  // TODO: consider time caching for better performance
  const { mutateAsync } = useMutation({
    mutationKey: ["slips.create"],
    mutationFn,
    onSuccess,
    // staleTime: 2 * 60 * 1000,
    // gcTime: 2 * 60 * 1000,
  });

  return { createSlip: mutateAsync };
};
