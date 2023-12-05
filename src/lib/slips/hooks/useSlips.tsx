import * as dayjs from "dayjs";
import Delta from "quill-delta";
import { useEffect, useState } from "react";
import { generateId } from "src/lib/pocketbase/utils/generateId";
import { pb, pbDevConsoleLog } from "src/lib/pocketbase/utils/pocketbaseConfig";
import type { RecordModel, UnsubscribeFunc } from "pocketbase";
import type { Slip } from "src/lib/slips/types/Slip.type";

const mapSlip = (slip: RecordModel): Slip => {
  return {
    id: slip.id,
    draft: false,
    title: slip.title,
    content: slip.content ? new Delta(slip.content) : new Delta(), // TODO: make not nullable in pocketbase
    isPinned: slip.isPinned,
    isFlagged: slip.isFlagged,
    deleted: null,
    created: dayjs(slip.created),
    updated: dayjs(slip.updated),
  };
};

export const useSlips = (subscribe: boolean = true) => {
  const [slips, setSlips] = useState<Slip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [unsubscribeFn] = useState<UnsubscribeFunc | undefined>(undefined);

  const getSlips = async (): Promise<void> => {
    const slipsRes = await pb
      .collection("slips")
      .getList(undefined, undefined, { filter: "deleted = null" });
    const mappedSlips = slipsRes.items.map(mapSlip);

    setSlips(mappedSlips);
    setLoading(false);
  };

  const createSlip = (): string => {
    const slipDraft: Slip = {
      id: generateId(),
      draft: true,
      title: null,
      content: new Delta(),
      isPinned: false,
      isFlagged: false,
      deleted: null,
      created: dayjs(),
      updated: dayjs(),
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
          pbDevConsoleLog("created action triggered");

          setSlips((currentSlips) => {
            return currentSlips.map((currentSlip) => {
              return currentSlip.id === record.id
                ? mapSlip(record)
                : currentSlip;
            });
          });
          break;

        case "update":
          if (record.deleted) {
            setSlips((currentSlips) =>
              currentSlips.filter((slip) => slip.id !== record.id)
            );
          } else {
            setSlips((currentSlips) =>
              currentSlips.map((slip) =>
                slip.id === record.id ? mapSlip(record) : slip
              )
            );
          }
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
