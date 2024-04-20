import * as dayjs from "dayjs";
import { useAtom } from "jotai";
import Delta from "quill-delta";
import { useAuthentication } from "src/authentication/hooks/useAuthentication";
import { pb } from "src/pocketbase/utils/pocketbaseConfig";
import { useTopics } from "src/topics/hooks/useTopics";
import { slipsAtom } from "../atoms/slipsAtom";
import type { RecordModel } from "pocketbase";
import type { Slip } from "src/slips/types/Slip.type";

const mapSlip = (slip: RecordModel): Slip => {
  return {
    id: slip.id,
    draft: false,
    title: slip.title,
    content: slip.content ? new Delta(slip.content) : new Delta(), // TODO: make not nullable in pocketbase
    isPinned: slip.isPinned,
    isFlagged: slip.isFlagged,
    topics: slip?.expand?.topics ?? [],
    deleted: null,
    created: dayjs(slip.created),
    updated: dayjs(slip.updated),
  };
};

export const useSlips = () => {
  const { currentUser } = useAuthentication();
  const { getTopics } = useTopics();

  const [slips, setSlips] = useAtom(slipsAtom);

  const updateSlip = async (
    slipId: string,
    updateSlipData: Slip
  ): Promise<void> => {
    const slipToUpdate = slips.find((slip) => slip.id === slipId);

    if (!slipToUpdate) {
      return;
    }

    const mappedTopics = updateSlipData.topics.map((topic) => topic.id);

    // if slip is a draft then its not actually in the db, so persist it
    if (slipToUpdate.draft) {
      const createdSlip = await pb.collection("slips").create(
        {
          ...updateSlipData,
          topics: mappedTopics,
          user: currentUser?.id,
        },
        { expand: "topics" }
      );

      setSlips((currentSlips) => {
        return currentSlips.map((slip) =>
          slip.id === createdSlip.id ? mapSlip(createdSlip) : slip
        );
      });
    } else {
      const updatedSlip = await pb
        .collection("slips")
        .update(
          slipId,
          { ...updateSlipData, topics: mappedTopics },
          { expand: "topics" }
        );

      setSlips((currentSlips) => {
        return currentSlips.map((slip) =>
          slip.id === updatedSlip.id ? mapSlip(updatedSlip) : slip
        );
      });
    }

    // TODO check this works after adding state context manager
    if (updateSlipData.topics.length !== slipToUpdate?.topics.length) {
      getTopics();
    }

    return;
  };

  const findSlip = (slipId: string): Slip | undefined => {
    const foundSlip = slips.find((slip) => slip.id === slipId);

    return foundSlip;
  };

  return {
    slips,
    updateSlip,
    findSlip,
  };
};
