import { RecordModel, UnsubscribeFunc } from "pocketbase";
import { pb, pbDevConsoleLog } from "../lib/pocketbase";
import { generateId } from "../lib/generateId";
import { Slip } from "../types/Slip.type";
import { useEffect, useState } from "react";
import Delta from "quill-delta";

const mapSlip = (slip: RecordModel): Slip => {
  return {
    id: slip.id,
    draft: false,
    title: slip.title,
    content: slip.content ?? new Delta(),
    isPinned: slip.isPinned,
  };
};

export const useSlips = (subscribe: boolean = true) => {
  const [slips, setSlips] = useState<Slip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [unsubscribeFn, setUnsubscribeFn] = useState<
    UnsubscribeFunc | undefined
  >(undefined);

  const getSlips = async (): Promise<void> => {
    const slipsRes = await pb.collection("slips").getFullList();

    // TODO: use mapper
    const mappedSlips = slipsRes.map((slip) => ({
      id: slip.id,
      draft: false,
      title: slip.title,
      content: slip.content,
      isPinned: slip.isPinned,
    }));

    setSlips(mappedSlips);
    setLoading(false);
  };

  const createSlip = (): string => {
    const slipDraft = {
      id: generateId(),
      draft: true,
      title: null,
      content: new Delta(),
      isPinned: false,
    };

    setSlips((current) => [...current, slipDraft]);
    return slipDraft.id;
  };

  const updateSlip = async (
    slipId: string,
    updateSlipData: Slip
  ): Promise<void> => {
    const slipToUpdate = slips.find((slip) => slip.id === slipId);

    if (slipToUpdate) {
      // if slip is a draft then its not actually in the db, so persist it
      if (slipToUpdate.draft) {
        await pb.collection("slips").create(updateSlipData);

        return;
      }

      await pb.collection("slips").update(slipId, updateSlipData);
    }

    return;
  };

  const subscribeToSlips = async (): Promise<void> => {
    // const unsub = await pb
    pb.collection("slips").subscribe("*", ({ action, record }) => {
      switch (action) {
        // TODO: this action gets triggered twice, need to stop all the actions from double triggering
        case "create":
          setSlips((currentSlips) => {
            return currentSlips.map((currentSlip) => {
              return currentSlip.id === record.id
                ? mapSlip(record)
                : currentSlip;
            });
          });
          pbDevConsoleLog("created action triggered");
          break;

        case "update":
          setSlips((prev) =>
            prev.map((slip) => (slip.id === record.id ? mapSlip(record) : slip))
          );
          break;

        default:
          break;
      }
    });

    // setUnsubscribeFn(unsub);
    pbDevConsoleLog(
      "subscribed to 'slips' collection successfully. Listening for CRUD actions..."
    );
  };

  useEffect(() => {
    // may need to define our callbacks within the useEffect?
    //https://dev.to/vinodchauhan7/react-hooks-with-async-await-1n9g
    getSlips();
    subscribe && subscribeToSlips();
  }, []);

  return { slips, createSlip, updateSlip, loading, unsubscribeFn };
};
