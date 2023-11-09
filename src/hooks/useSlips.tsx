import { RecordModel, UnsubscribeFunc } from "pocketbase";
import { pb, pbDevConsoleLog } from "../lib/pocketbase";
import { Slip } from "../types/Slip.type";
import { useEffect, useState } from "react";

const mapSlip = (slip: RecordModel): Slip => {
  return {
    id: slip.id,
    title: slip.title,
    content: slip.content,
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

    const mappedSlips = slipsRes.map((slip) => ({
      id: slip.id,
      title: slip.title,
      content: slip.content,
      isPinned: slip.isPinned,
    }));

    setSlips(mappedSlips);
    setLoading(false);
  };

  const subscribeToSlips = async (): Promise<void> => {
    // const unsub = await pb
    pb.collection("slips").subscribe("*", ({ action, record }) => {
      switch (action) {
        case "create":
          setSlips((prev) => [...prev, mapSlip(record)]);
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

  return { slips, loading, unsubscribeFn };
};
