import * as dayjs from "dayjs";
import Delta from "quill-delta";
import { useEffect, useState } from "react";
import { useAuthentication } from "src/authentication/hooks/useAuthentication";
import { generateId } from "src/pocketbase/utils/generateId";
import { pb } from "src/pocketbase/utils/pocketbaseConfig";
import { useTopics } from "src/topics/hooks/useTopics";
import type { RecordModel, UnsubscribeFunc } from "pocketbase";
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

  const [slips, setSlips] = useState<Slip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [unsubscribeFn] = useState<UnsubscribeFunc | undefined>(undefined);

  const getSlips = async (): Promise<void> => {
    const slipsRes = await pb
      .collection("slips")
      .getList(undefined, undefined, {
        filter: "deleted = null",
        expand: "topics",
      });
    const mappedSlips = slipsRes.items.map(mapSlip);

    setSlips(mappedSlips);
    setLoading(false);
  };

  const createSlip = (): string => {
    let slipId = generateId();

    setSlips((currentSlips) => {
      const existingDraftSlip = currentSlips.find((slip) => slip.draft);

      if (existingDraftSlip) {
        slipId = existingDraftSlip.id;
        return currentSlips;
      }

      const slipDraft: Slip = {
        id: slipId,
        draft: true,
        title: null,
        content: new Delta(),
        isPinned: false,
        isFlagged: false,
        topics: [],
        deleted: null,
        created: dayjs(),
        updated: dayjs(),
      };

      return [...currentSlips, slipDraft];
    });

    return slipId; // TODO: return whole slip instead?
  };

  const deleteSlip = async (slipId: string, hardDelete: boolean = false) => {
    const slipToDelete = slips.find((slip) => slip.id === slipId);

    if (!slipToDelete) {
      return;
    }

    // instead of delete from db, again because its not in the db just remove it from the slips array state
    if (slipToDelete.draft) {
      setSlips((currentSlips) => currentSlips.filter((slip) => !slip.draft));
      return;
    }

    if (hardDelete) {
      const deletedSlip = await pb.collection("slips").delete(slipId);

      deletedSlip &&
        setSlips((currentSlips) =>
          currentSlips.filter((slip) => slip.id !== slipToDelete.id)
        );
    } else {
      const deletedSlip = await pb
        .collection("slips")
        .update(slipId, { ...slipToDelete, deleted: dayjs() });

      setSlips((currentSlips) =>
        currentSlips.filter((slip) => slip.id !== deletedSlip.id)
      );
      return;
    }
  };

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
      const createdSlip = await pb.collection("slips").create({
        ...updateSlipData,
        topics: mappedTopics,
        user: currentUser?.id,
      });

      setSlips((currentSlips) => {
        return currentSlips.map((slip) =>
          slip.id === createdSlip.id ? mapSlip(createdSlip) : slip
        );
      });
    } else {
      const updatedSlip = await pb
        .collection("slips")
        .update(slipId, { ...updateSlipData, topics: mappedTopics });

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

  useEffect(() => {
    // may need to define our callbacks within the useEffect?
    //https://dev.to/vinodchauhan7/react-hooks-with-async-await-1n9g
    currentUser && getSlips();
  }, [currentUser]);

  return { slips, createSlip, updateSlip, deleteSlip, loading, unsubscribeFn };
};
